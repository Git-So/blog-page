<template>
  <section class="view-tag-item">
    <el-tag :key="tag.ID" @click="onOpenArticleList(tag.ID)">
      {{ tag.Name || '测试文字' }}
    </el-tag>
  </section>
</template>
<script>
export default {
  name: 'ViewTagItem',
  props: {
    tag: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onOpenArticleList(id) {
      if (window.getSelection().toString().length > 1) return false
      this.$router.push(`/article/list/1?tag_id=${id}`)
    }
  }
}
</script>
<style lang="scss">
.view-tag-item {
  display: inline-block;
  margin: 0.4rem;
}
</style>
