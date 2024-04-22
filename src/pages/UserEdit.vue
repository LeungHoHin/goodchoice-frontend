<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import thisAxious from "../plugins/myAxious.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

const username = ref('');


//编辑user信息
const router = useRouter();
const route = useRoute()
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const originalValue = route.query.currentValue

// console.log( route.query.editKey,route.query.currentValue,route.query.editName)

const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser == null){
    showFailToast("用户未登录");
    return
  }

  const res = await thisAxious.post('user/update',{
    'userId': currentUser.userId,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  if (res.data.code === 200 && res.data){
    showSuccessToast('修改成功')
    router.back();
  }else {
    showFailToast('修改错误')
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
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