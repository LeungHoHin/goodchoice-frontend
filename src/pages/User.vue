<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 123,
  username: "良好选",
  userAccount: "2123221",
  avatarUrl: "https://ts1.cn.mm.bing.net/th/id/R-C.aba3fe575f7238ce7cd472b7b0061de0?rik=GKCMSHx%2bM0Aj6A&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-10-28_653cedac82f9a.jpeg&ehk=VQ1lQfCn6FI3pAgXwtDDrBZrc5r4gaqvJnKiN%2boPJt0%3d&risl=&pid=ImgRaw&r=0",
  gender: "male",
  phone: 13922304068,
  email: "leunghohin@163.com",
  tags: "java",
  createTime: new Date(),
}



//将修改的信息通过路由传输
const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>


<template>
  <van-cell title="头像" is-link to="/user/edit">
    <img :src="user.avatarUrl" height="56px">
  </van-cell>
  <van-cell title="用户名" is-link :value="user.username"  @click = "toEdit('username','用户名',user.gender)"/>
    <van-cell title="性别" is-link :value="user.gender" @click = "toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link :value="user.phone" @click = "toEdit('phone','电话',user.gender)"/>
    <van-cell title="邮箱" is-link :value="user.email" @click = "toEdit('email','邮箱',user.gender)"/>
    <van-cell title="标签" is-link :value="user.tags"/>
    <van-cell title="用户创建时间" is-link :value="user.createTime.toDateString()"/>
</template>
<style scoped>

</style>