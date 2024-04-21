<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import thisAxious from "../plugins/myAxious.ts";
import {Toast} from "vant";

const username = ref('');


//编辑user信息
const router = useRouter();
const route = useRoute()
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})



const onSubmit = async () => {
  const res = await thisAxious.post('user/update',{
    id: 1,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  if (res.code === 0 && res.data > 0){
    Toast.success('修改成功')
    router.back();
  }else {
    Toast.fail('修改错误')
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          :v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>