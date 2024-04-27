<script setup lang="ts">

import {onMounted, ref} from "vue";
import thisAxious from "../plugins/myAxious.ts";
import {showFailToast} from "vant";
import MyCreatedTeams from "../components/MyCreatedTeams.vue";
import MyJoinedTeams from "../components/MyJoinedTeams.vue";

const myCreatedTeamList = ref([]);

const listMyCreatedTeams = async () =>{
  const res = await thisAxious.get('/team/my/createdTeams',{})
  if (res?.data.code === 200){
    myCreatedTeamList.value = res.data.data
  }else {
    showFailToast('加载创建队伍失败')
  }
}

const myJoinedTeamList = ref([]);
const listMyJoinedTeams = async () =>{
  const res = await thisAxious.get('/team/my/joinedTeams',{})
  if (res?.data.code === 200){
    myJoinedTeamList.value = res.data.data
  }else {
    showFailToast('加载加入队伍失败')
  }
}

onMounted(() => {
  listMyJoinedTeams();
  listMyCreatedTeams()
})


</script>

<template>
  <van-tabs>
    <van-tab title="我创建的队伍">
      <van-empty v-if="!myCreatedTeamList || myCreatedTeamList.length < 1" description="还未创建队伍"/>
      <my-created-teams :team-list="myCreatedTeamList"/>
    </van-tab>
    <van-tab title="我加入的队伍">    <van-empty v-if="!myJoinedTeamList || myJoinedTeamList.length < 1" description="还未加入队伍"/>
      <my-joined-teams :team-list="myJoinedTeamList"/></van-tab>

  </van-tabs>
</template>

<style scoped>

</style>