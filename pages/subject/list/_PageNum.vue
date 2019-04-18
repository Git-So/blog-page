<template>
  <section class="page-subject-list">
    <!-- 搜索 -->
    <h3>专题搜索</h3>
    <div class="block-search">
      <view-search v-model="search" @keyup.enter.native="onSearch" />
    </div>

    <!-- 列表 -->
    <h3>最新专题</h3>
    <div v-loading="loading" class="block-list">
      <view-subject-item v-for="item in list" :key="item.ID" :subject="item" />
      <div v-if="loading || !count" class="nil-data">
        暂时还没有专题哦!
      </div>
    </div>

    <!-- 翻页 -->
    <view-pagination
      background
      :loading="loading"
      :page-size="pageSize"
      :page-num="pageNum"
      :count="count"
      :page-class="pageClass"
    />
  </section>
</template>
<script>
import { Search, GetPageNum, GetList } from '~/assets/javascript/mixin.js'

import ViewSearch from '~/components/Search.vue'
import ViewSubjectItem from '~/components/SubjectItem.vue'
import ViewPagination from '~/components/Pagination.vue'

export default {
  name: 'PageSubjectList',
  components: {
    'view-search': ViewSearch,
    'view-subject-item': ViewSubjectItem,
    'view-pagination': ViewPagination
  },
  mixins: [Search, GetPageNum, GetList],
  data() {
    return {
      pageClass: 'subject'
    }
  },
  methods: {
    onInit() {}
  }
}
</script>
