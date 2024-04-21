<script setup lang="ts">


import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import thisAxious from "../plugins/myAxious.ts"
import qs from "qs";


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
const url = '/user/search/tags'


//在加载完成时获得后端传过来的数据
onMounted(async () => {
  const userListData = await thisAxious.get(url, {
    params: {
      tagsList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags success', response);
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error', error);
      })
  if (userListData){
    userListData.forEach(user => {
      if (user.userTags){
        user.userTags = JSON.parse(user.userTags)
      }
    })
    userList.value = userListData
  }
})

</script>

<template>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
  <van-card
      v-for="user in userList"
      :title="user.userName"
      :desc="user.userProfile"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.userTags" style="margin: 6px; margin-top: 6px">{{ tag }}</van-tag>
    </template>
    <template #footer>
      <van-button size="normal">查看详细</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>