<script setup lang="ts" >
import { ref } from 'vue';
import { showToast } from 'vant';
import {useRouter} from "vue-router";


const router = useRouter()
const onClickLeft = () => {
router.back()
};
const onClickRight = () =>{
  router.push('/search')
};


const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);


</script>

<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    </van-nav-bar>


<div id = "content">
<router-view/>



</div>



  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name = "index" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name ="team" to="/Team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name = "user" to="/User">个人</van-tabbar-item>
  </van-tabbar>


</template>

<style scoped>

</style>