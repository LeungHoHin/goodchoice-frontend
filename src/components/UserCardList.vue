<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps {
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  //@ts-ignore
  UserList: [] as UserType
})


</script>

<template>
  <van-card
      v-for="user in userList"
      :title="user.userName"
      :desc="user.userProfile"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.userTags" style="margin: 6px; margin-top: 6px">{{
          tag
        }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="normal">查看详细</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>