<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import thisAxious from "../plugins/myAxious.ts";
import {showFailToast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";


const router = useRouter();
const active = ref('public')
const searchText = ref('')

const toAddTeamPage = () => {
  router.push({
    path: "/team/add"
  })
}


onMounted(async () => {
  const userListData = await thisAxious.get('/team/list', {})
})

const teamList = ref([])

const listTeam = async (val = "", status = 0) => {
  const res = await thisAxious.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    }
  });
  if (res?.data.code === 200) {
    teamList.value = res.data.data
  } else {
    showFailToast("加载队伍失败，请刷新重试")
  }
}

// 页面加载时只触发一次
onMounted(() => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val)
};

</script>

<template>
  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
  <van-button type="primary" @click="toAddTeamPage">创建队伍</van-button>
  <van-empty v-if="!teamList || teamList.length < 1" description="数据为空"/>
  <team-card-list :team-list="teamList"/>
</template>

<style scoped>

</style>