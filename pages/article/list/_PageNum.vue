<template>
  <section class="page-article-list">
    <!-- 搜索 -->
    <h3 class="hidden-sm-and-down hidden-lg-and-up">文章搜索</h3>
    <div class="block-search hidden-sm-and-down hidden-lg-and-up">
      <view-search v-model="search" @keyup.enter.native="onSearch" />
    </div>

    <!-- 列表 -->
    <h3>最新文章</h3>
    <div v-loading="loading" class="block-list">
      <view-article-item v-for="item in list" :key="item.ID" :article="item" />
      <div v-if="loading || !count" class="nil-data">
        暂时还没有文章哦!
      </div>
    </div>

    <!-- 翻页 -->
    <view-pagination
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
import ViewArticleItem from '~/components/ArticleItem.vue'
import ViewPagination from '~/components/Pagination.vue'

export default {
  name: 'PageArticleList',
  components: {
    'view-search': ViewSearch,
    'view-article-item': ViewArticleItem,
    'view-pagination': ViewPagination
  },
  mixins: [Search, GetPageNum, GetList],
  data() {
    return {
      pageClass: 'article'
    }
  },
  methods: {
    onInit() {
      // console.log(this.list)
    }
  }
}
</script>
