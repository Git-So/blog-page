<template>
  <section class="page-link-list">
    <!-- 列表 -->
    <h3>友链列表</h3>
    <div v-loading="loading" class="block-list">
      <div>
        <view-link-item v-for="item in list" :key="item.ID" :link="item" />
      </div>
      <div v-if="loading || !count" class="nil-data">
        暂时还没有友链哦!
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
import { GetPageNum, GetList } from '~/assets/javascript/mixin.js'
import ViewLinkItem from '~/components/LinkItem.vue'
import ViewPagination from '~/components/Pagination.vue'

export default {
  name: 'PageLinkList',
  components: {
    'view-link-item': ViewLinkItem,
    'view-pagination': ViewPagination
  },
  mixins: [GetPageNum, GetList],
  data() {
    return {
      pageClass: 'link'
    }
  },
  destroyed() {
    this.$store.commit('setIsHideAside', false)
  },
  methods: {
    onInit() {
      this.$store.commit('setIsHideAside', true)
    }
  }
}
</script>
<style lang="scss">
section.page-link-list {
  @media (max-width: 765px) {
    div.block-list {
      div {
        section.view-link-item {
          color: red;
          &:nth-child(odd) {
            margin-left: 0;
          }
        }
      }
    }
  }

  h3 {
    margin-bottom: 0.9rem;
  }
}
</style>
