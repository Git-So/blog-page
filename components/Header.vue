<template>
  <section class="view-header">
    <div class="search hidden-md-and-up">
      <view-search v-model="search" @keyup.enter.native="Search" />
    </div>
    <el-row :gutter="40">
      <el-col :span="14" class="header-title hidden-sm-and-down">
        <div class="grid-content ">
          <router-link to="/" class="title">{{ dataSiteName }}</router-link>
        </div>
      </el-col>
      <el-col :span="10" class="header-menu">
        <div class="grid-content ">
          <div class="menu-active"></div>
          <el-menu mode="horizontal" :default-active="dataActiveIndex">
            <el-menu-item
              v-for="item in dataList"
              :key="item.index"
              :index="item.index"
              :path="item.path"
              @click="onChangeTab"
            >
              {{ item.title }}
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { Search } from '~/assets/javascript/mixin.js'
import ViewSearch from '~/components/Search.vue'

export default {
  name: 'ViewHeader',
  components: {
    'view-search': ViewSearch
  },
  mixins: [Search],
  computed: {
    dataSiteName() {
      return this.$store.state.SiteName
    },
    dataList() {
      return this.$store.state.MenuList
    },
    dataActiveIndex: {
      get() {
        return this.$store.state.MenuActiveIndex
      },
      set(value) {
        this.$store.commit('setMenuActiveIndex', value)
      }
    }
  },
  watch: {
    $route() {
      this.onInit()
    }
  },
  methods: {
    onInit() {
      // 确定当前tab
      this.setActiveIndex()
    },
    onChangeTab(e) {
      // 切换Tab
      this.$router.push(e.$attrs.path)
    },
    setActiveIndex() {
      let routePath = this.$route.path.substr(1)

      // 二级目录只取根目录名
      const end = routePath.indexOf('/')
      if (end > 0) routePath = routePath.substring(0, end)

      this.dataActiveIndex = routePath

      // 记录tab历史
      const prefix = location.protocol + '//' + location.host
      const history = location.href.substr(prefix.length)
      this.$store.commit('setCurrentMenuPath', history)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/_var.scss';

section.view-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: $--color-background;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);

  .header-title.el-col {
    a {
      text-decoration: none;
      color: $--color-text;
      padding-left: 2rem;
      font-size: 2.4rem;
      height: $--height-header;
      line-height: $--height-header;
    }
  }

  .header-menu.el-col {
    ul.el-menu {
      border-bottom: none;

      li.el-menu-item.is-active {
        color: $--color-title;
      }
    }
  }
}
</style>
