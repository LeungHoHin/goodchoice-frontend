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

const password = ref('');
const joinTeamId = ref(0);
const currentUser = ref();
const router = useRouter();
const showPasswordDialog = ref(false);


onMounted(async () => {
  currentUser.value = await getCurrentUser()
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.teamId;
  if (team.teamStatus === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}


const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await thisAxious.post("/team/join", {
    password: password.value,
    teamId: joinTeamId.value,
  })
  if (res?.data.code === 200) {
    showSuccessToast("加入队伍成功")
    doJoinCancel();
  } else {
    showFailToast(res?.data.description)
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
          {{ '过期时间: ' +team.teamExpireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary"  plain
                    @click="preJoinTeam(team)">
          加入队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
                @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>
</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>