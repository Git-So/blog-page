<template>
  <div
    class="page-default"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <el-container>
      <el-header>
        <view-header />
      </el-header>

      <el-container>
        <el-row class="container">
          <el-col :xs="24" :lg="dataIsHideAide ? 24 : 15" class="main">
            <!-- 路由渲染 -->
            <nuxt />
          </el-col>
          <el-col
            :xs="0"
            :lg="dataIsHideAide ? 0 : 9"
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
  data() {
    return {
      srceenWidth: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      countX: 0,
      headTop: 0,
      maginTop: 0
    }
  },
  computed: {
    dataIsHideAide() {
      return this.$store.state.IsHideAide
    },
    dataMenuList() {
      return this.$store.state.MenuList
    },
    dataMenuActiveIndexKey() {
      let indexKey = 0
      for (const key in this.dataMenuList) {
        if (
          this.dataMenuList[key].index === this.$store.state.MenuActiveIndex
        ) {
          indexKey = key
          break
        }
      }
      return indexKey
    }
  },
  methods: {
    onInit() {
      this.srceenWidth = window.screen.width

      if (this.srceenWidth < 992) {
        this.headTop = this.headTop
        this.maginTop = 115 + this.headTop
      }
    },
    onTouchStart(even) {
      this.startX = event.changedTouches[0].screenX
      this.startY = event.changedTouches[0].screenY
    },
    onTouchMove(even) {
      this.countX++
    },
    onTouchEnd(even) {
      // 屏幕大小
      if (this.srceenWidth > 995) {
        return
      }

      // 未滑动
      if (this.countX < 10) return
      console.log(this.countX)
      this.countX = 0

      // 上下滑动
      const moveXNum = event.changedTouches[0].screenX - this.startX
      const moveYNum = event.changedTouches[0].screenY - this.startY
      if (Math.abs(moveYNum) > Math.abs(moveXNum)) {
        return
      }
      console.log('左右滑动')

      let key = this.dataMenuActiveIndexKey

      // 移动距离比
      const touchNum = moveXNum / this.srceenWidth
      if (Math.abs(touchNum) > 0.3) {
        key = touchNum < 0 ? ++key : --key
        // minKey
        const minKey = 0
        key = key < minKey ? minKey : key

        // maxKey
        const maxKey = this.dataMenuList.length - 1
        key = key > maxKey ? maxKey : key
        console.log(key)

        // 切换key
        this.$store.commit('setMenuActiveIndexKey', key)
        this.$router.push(this.dataMenuList[key].path)
      }
    }
  }
}
</script>
<style lang="scss">
div.page-default {
  touch-action: pan-y;

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
