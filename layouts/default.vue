<template>
  <div class="page-default">
    <el-container>
      <el-header>
        <view-header />
      </el-header>

      <el-container>
        <el-row class="container">
          <el-col :xs="24" :lg="isHideAide ? 24 : 15" class="main">
            <!-- 路由渲染 -->
            <nuxt />
          </el-col>
          <el-col
            :xs="0"
            :lg="isHideAide ? 0 : 9"
            class="aside hidden-md-and-down"
          >
            <view-aside />
          </el-col>
        </el-row>
      </el-container>

      <el-footer>
        <view-footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import ViewHeader from '~/components/Header.vue'
import ViewAside from '~/components/Aside.vue'
import ViewFooter from '~/components/Footer.vue'

export default {
  name: 'Default',
  components: {
    'view-header': ViewHeader,
    'view-aside': ViewAside,
    'view-footer': ViewFooter
  },
  computed: {
    isHideAide() {
      return this.$store.state.IsHideAide
    }
  }
}
</script>
<style lang="scss">
div.page-default {
  .el-container {
    header.el-header,
    footer.el-footer {
      padding: 0;
    }
  }
}
</style>

<style lang="scss">
@import '~/assets/style/global.scss';
</style>
