<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../contants/team.ts";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import thisAxious from "../plugins/myAxious.ts";
import {showFailToast, showSuccessToast} from "vant";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  TeamList: [] as TeamType
})


const currentUser = ref();
const router = useRouter();


onMounted(async () => {
  currentUser.value = await getCurrentUser();
})


const deleteTeam = async (teamId: number) => {
  const res = await thisAxious.post('/team/delete', {
    teamId: teamId,
  })
  if (res?.data.code === 200) {
    showSuccessToast("成功解散队伍")
  } else {
    showFailToast("解散队伍失败")
  }
}

const quitTeam = async (teamId: number) => {
  const res = await thisAxious.post('/team/delete', {
    teamId: teamId,
  })
  if (res?.data.code === 200) {
    showSuccessToast("成功退出队伍")
  } else {
    showFailToast("解散退出失败")
  }
}


</script>

<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        thumb='https://img.ixintu.com/download/jpg/202001/45c3a35e562d15a2d314063ebd45329a.jpg!ys'
        :desc="team.teamDescription"
        :title="`${team.teamName}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.teamStatus]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.teamNum}/${team.teamMaxNum}` }}
        </div>
        <div v-if="team.teamExpireTime">
          {{ '过期时间: ' + team.teamExpireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" plain
                    @click="deleteTeam(team.teamId)">
          解散队伍
        </van-button>
        <van-button size="small" type="primary" plain
                    @click="quitTeam(team.teamId)">
          退出队伍
        </van-button>
      </template>
    </van-card>
  </div>
</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>