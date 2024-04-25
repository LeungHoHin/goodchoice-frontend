<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter();

const toAddTeamPage = () => {
  router.push({
    path: "/team/add"
  })
}


</script>

<template>
  <van-button type="primary" @click="toAddTeamPage">加入队伍</van-button>
</template>

<style scoped>

</style>