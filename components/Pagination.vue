<template>
  <section class="view-pagination" :hidden="loading || count <= pageSize">
    <el-pagination
      :background="background"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="count"
      :current-page="pageNum"
      @current-change="onPageChange"
    />
  </section>
</template>
<script>
export default {
  name: 'ViewPagination',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 0
    },
    pageNum: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    pageClass: {
      type: String,
      default: 'page'
    }
  },
  methods: {
    onPageChange(pageNum) {
      this.$router.push(
        `/${this.pageClass}/list/${pageNum}${window.location.search}`
      )
    }
  }
}
</script>
<style lang="scss">
section.view-pagination {
  margin: 1.24rem 0;
}
</style>
