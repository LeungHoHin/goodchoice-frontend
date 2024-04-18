<script setup lang="ts">
import {ref} from 'vue';

const searchText = ref('');


const activeIds = ref([]);
const activeIndex = ref(0);
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'}
    ],
  },
  {
    text: '方向',
    children: [
      {text: 'Java', id: 'Java'},
      {text: 'C++', id: 'C++'},
      {text: 'python', id: 'python'},
      {text: 'Go', id: 'go'},
      {text: 'C#', id: 'C#'},
      {text: 'C', id: 'C'},
    ],
  },
];

let tagList = ref(originTagList)

const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tampChildren = [...parentTag.children]
    const tempParentTag = {...parentTag}
    tempParentTag.children = tampChildren.filter(item => item.text.includes(searchText.value))
    return tempParentTag;
  })
};
const onCancel = () => {
  searchText.value = ''
  tagList.value = originTagList
};


const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider>已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row :gutter="[8,8]">
    <van-col v-for="tag in activeIds" span='6'>
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider>选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

</template>

<style scoped>

</style>