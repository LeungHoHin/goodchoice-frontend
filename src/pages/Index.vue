<script setup lang="ts">


import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import thisAxious from "../plugins/myAxious.ts"
import UserCardList from "../components/UserCardList.vue";


const route = useRoute();
const {tags} = route.query


// const mockUser1 = {
//   id: 123,
//   username: "良好选",
//   userAccount: "2123221",
//   avatarUrl: "https://ts1.cn.mm.bing.net/th/id/R-C.aba3fe575f7238ce7cd472b7b0061de0?rik=GKCMSHx%2bM0Aj6A&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-10-28_653cedac82f9a.jpeg&ehk=VQ1lQfCn6FI3pAgXwtDDrBZrc5r4gaqvJnKiN%2boPJt0%3d&risl=&pid=ImgRaw&r=0",
//   gender: "male",
//   userProfile: "啊挖点矿哈萨克和防空飞弹噶肯定是跟发货上的卡号付款记录啥的尽快立法金克拉撒旦喀什的付款计划是否健康大概好久克劳福德。",
//   phone: 13922304068,
//   email: "leunghohin@163.com",
//   tags: ['java', 'emo', 'C++', '男大', '学习中'],
//   createTime: new Date(),
// }
//

const userList = ref([])


//后端接口


//在加载完成时获得后端传过来的数据
onMounted(async () => {
  const userListData = await thisAxious.get('/user/recommend', {
    params: {
      pageSize: 8,
      pageNum: 1,
    },
  })
      .then(function (response) {
        return response.data?.data?.records;
      })
      .catch(function (error) {
        console.log('/user/recommend', error);
      })
  if (userListData) {
    userListData.forEach(user => {
      if (user.userTags) {
        user.userTags = JSON.parse(user.userTags)
      }
    })
    userList.value = userListData
  }
})

</script>

<template>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
  <user-card-list :user-list="userList"/>
</template>

<style scoped>

</style>