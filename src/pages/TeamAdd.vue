<script setup lang="ts">

import {ref} from "vue";
import thisAxious from "../plugins/myAxious.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const minDate = new Date;
const maxDate = new Date(2100, 12, 12);


const initFormData = {
  "teamDescription": "",
  "teamExpireTime": null,
  "teamMaxNum": 1,
  "teamName": "",
  "teamPassword": null,
  "teamStatus": 0,
}


const submitFormData = ref({...initFormData})


// 展示日期选择器
const showCalendar = ref(false);
let showExpireTime = null;
const onConfirm = (date) => {
  showExpireTime = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  submitFormData.value.teamExpireTime = `${date.getFullYear() as string}-${(date.getMonth() + 1) as string >= '10' ? (date.getMonth() + 1) as string : '0' + (date.getMonth() + 1) as string}-${(date.getDate() + 1) as string >= '10' ? (date.getDate() + 1) as string : '0' + (date.getDate() + 1) as string}T00:00:00.000Z`
  showCalendar.value = false;
};

const router = useRouter()
const onSubmit = async () => {
  const postData = {
    ...submitFormData.value,
    teamStatus: Number(submitFormData.value.teamStatus)
  }
  //参数校验
  const res = await thisAxious.post("/team/add", postData);
  if (res.data.code === 200 && res.data) {
    showSuccessToast("队伍添加成功")
    router.push({
      path: '/team',
      replace: true,
    })
  }else {
    showFailToast("添加失败")
  }
}

</script>

<template>
  <div id="teamAdd">
    <van-form @submit="onSubmit()">
      <van-cell-group inset>
        <van-field
            v-model="submitFormData.teamName"
            name="teamName"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名称' }]"
        />
        <van-field name="teamMaxNum" label="队伍最大人数">
          <template #input>
            <van-stepper v-model="submitFormData.teamMaxNum" min="1" max="20"/>
          </template>
        </van-field>
        <van-cell-group inset>
          <van-field
              v-model="submitFormData.teamDescription"
              rows="2"
              autosize
              label="队伍描述"
              type="textarea"
              maxlength="500"
              placeholder="请输入队伍描述"
              show-word-limit
          />
        </van-cell-group>
        <van-field
            v-model="showExpireTime"
            is-link
            readonly
            name="teamExpireTime"
            label="队伍过期时间"
            :placeholder="showExpireTime ?? '请选择队伍过期时间'"
            @click="showCalendar = true"
        />
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate"/>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="submitFormData.teamStatus" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(submitFormData.teamStatus) === 2"
            v-model="submitFormData.teamPassword"
            type="password"
            name="teamPassword"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

  {{ submitFormData }}
</template>

<style scoped>

</style>