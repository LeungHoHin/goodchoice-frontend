<script setup lang="ts">
import { ref } from 'vue'
import {useRoute, useRouter} from "vue-router";
import thisAxious from "../plugins/myAxious.ts";
import {showFailToast, showSuccessToast} from "vant";

const userAccount = ref('');
const userPassword = ref('');

const router = useRouter();
const route = useRoute();

const onSubmit = async () => {
  const res = await thisAxious.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,

  })

  if ( res.data.code === 200 && res.data) {
    showSuccessToast('登录成功');
    // 跳转到之前的页面
    router.replace('/')
  } else {
    showFailToast('登录失败');
  }
};


</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
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