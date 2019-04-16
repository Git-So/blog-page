<template>
  <section class="view-footer">
    <el-row>
      <el-col>
        <div>© {{ dataYear }} {{ dataICP }} {{ dataHost }}</div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  name: 'ViewFooter',
  computed: {
    dataYear() {
      return new Date().getFullYear()
    },
    dataICP() {
      return this.$store.state.ICP
    },
    dataHost() {
      return window.location.host
    }
  }
}
</script>
<style lang="scss">
$height: 60px;
.view-footer {
  border-top: 1px solid #e6e6e6;
  text-align: center;
  line-height: $height;
  font-size: 0.9rem;
}
</style>
