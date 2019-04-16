<template>
  <section class="page-tag-list">
    <!-- 搜索 -->
    <h3>标签搜索</h3>
    <div class="block-search">
      <view-search v-model="search" @keyup.enter.native="onSearch" />
    </div>

    <!-- 列表 -->
    <h3>全部标签</h3>
    <div v-loading="loading" class="block-list">
      <el-card class="list" shadow="hover">
        <view-tag-item v-for="item in list" :key="item.ID" :tag="item" />
      </el-card>
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
import ViewTagItem from '~/components/TagItem.vue'
import ViewPagination from '~/components/Pagination.vue'

export default {
  name: 'PageTagList',
  components: {
    'view-search': ViewSearch,
    'view-tag-item': ViewTagItem,
    'view-pagination': ViewPagination
  },
  mixins: [Search, GetPageNum, GetList],
  data() {
    return {
      pageClass: 'tag'
    }
  }
}
</script>
