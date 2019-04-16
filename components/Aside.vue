<template>
  <section class="view-aside">
    <!-- 文章导航 -->
    <div class="nav" :class="dataAside.isHideNav ? 'hide' : ''">
      <div>目录</div>
      <nav>
        <ul>
          <li
            v-for="nav in dataAside.navList"
            :key="nav.index"
            :class="nav.type"
          >
            <a
              :href="nav.index"
              :title="nav.name"
              :class="dataAside.activeNav === nav.index ? 'active-index' : ''"
              >{{ nav.name }}</a
            >
          </li>
        </ul>
      </nav>
    </div>

    <!-- 联系方式 -->
    <el-card :class="dataAside.isHideEmail ? 'hide' : ''">
      <div slot="header" class="clearfix">
        <span class="color-title">联系方式</span>
      </div>
      <div class="email">
        <p>Email</p>
        <p>{{ dataMe.Email || '暂未设置' }}</p>
      </div>
    </el-card>

    <!-- 搜索 -->
    <el-card :class="dataAside.isHideSearch ? 'hide' : ''">
      <el-input
        v-model="search"
        placeholder="请输入内容,回车搜索"
        @keyup.enter.native="onSearch"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-card>

    <!-- 热门文章 -->
    <el-card :class="dataAside.isHideHot ? 'hide' : ''">
      <div slot="header" class="clearfix">
        <span class="color-title">热门文章</span>
      </div>
      <div v-loading="hotArticleList.loading" class="hot">
        <div v-if="hotArticleList.list.length < 1">
          暂无相关文章
        </div>
        <ol v-else>
          <li
            v-for="item in hotArticleList.list"
            :key="item.ID"
            class="title"
            @click="onOpenArticleInfo(item.ID)"
          >
            {{ item.Title }}
          </li>
        </ol>
      </div>
    </el-card>
  </section>
</template>
<script>
import Helper from '~/assets/javascript/helper.js'
import { Search } from '~/assets/javascript/mixin.js'

export default {
  name: 'ViewAside',
  mixins: [Search],
  data() {
    return {
      hotArticleList: {
        list: [],
        loading: false
      }
    }
  },
  computed: {
    dataAside() {
      return this.$store.state.Aside
    },
    dataMe() {
      return this.$store.state.Me
    }
  },
  methods: {
    onInit() {
      this.getHotArticleList()
      this.UserInfo()
    },
    onOpenArticleInfo(id) {
      if (Number(id) < 1) return
      this.$router.push(`/article/info/${id}`)
    },
    async getHotArticleList() {
      const url = `article/hot/1`
      let JsonData = {}
      if (!this.$store.state.ApiCache[Helper.GetKey(url)]) {
        // fetch
        this.hotArticleList.loading = true
        JsonData = await this.$axios.$get(url)

        // setApiCache
        this.$store.commit('setApiCache', {
          key: Helper.GetKey(url),
          value: JsonData
        })
      }

      // cache
      JsonData = this.$store.state.ApiCache[Helper.GetKey(url)]

      // data
      this.hotArticleList.list = JsonData.data.hotArticleList
      this.hotArticleList.loading = false
    },
    async UserInfo() {
      const url = `config/list/me`
      let JsonData = {}
      if (!this.$store.state.ApiCache[Helper.GetKey(url)]) {
        // fetch
        JsonData = await this.$axios.$get(url)

        // setApiCache
        this.$store.commit('setApiCache', {
          key: Helper.GetKey(url),
          value: JsonData
        })
      }

      // cache
      JsonData = this.$store.state.ApiCache[Helper.GetKey(url)]

      // data
      JsonData.data.configList.forEach(e => {
        this.$store.commit('setMeData', { index: e.Key, value: e.Value })
      })
      console.log(this.dataMe)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/_var.scss';

section.view-aside {
  padding-top: 1.2rem;
  margin: 1.45rem;

  .hide {
    opacity: 0;
    transition: 0.3s;
  }

  & > div.el-card {
    margin-top: 1.2rem;
  }

  .nav {
    margin-left: 4.65rem;
    z-index: 100;
    position: fixed;

    & > div {
      font-size: 1.24rem;
      font-weight: 600;
      color: $--color-text;
    }

    nav {
      ul {
        list-style: none;
        padding: 0.5rem 1rem;

        li {
          margin-top: 0.1rem;

          &.nav-h2 {
            margin-top: 0.8rem;
            font-size: 1.1rem;
            font-weight: 600;

            & + *[class^='nav-h'] {
              margin-top: 0.1rem;
            }
          }

          &.nav-h3 {
            margin-top: 0.5rem;
            margin-left: 0.65rem;
            font-size: 0.95rem;
          }

          &:nth-child(1) {
            margin-top: 0rem;
          }

          a {
            text-decoration: none;
          }

          a.active-index {
            color: $--color-title;
          }
        }
      }
    }
  }

  .email {
    text-align: center;
    font-size: 1.6rem;
  }

  .hot {
    font-size: 0.9rem;
    color: #909399;

    & > ol {
      padding-left: 1rem;

      & > li {
        padding: 0.5rem;
      }
    }
  }
}
</style>
