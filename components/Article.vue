<template>
  <section v-loading="article.loading" class="view-article">
    <!-- 过期警告 -->
    <el-alert
      v-if="doExpire(article.UpdatedAt)"
      title="该文章发表于两年以前，文章内容可能已经过期"
      type="warning"
    >
    </el-alert>

    <article ref="article" class="markdown-body" v-html="article.Content" />
    <section :hidden="article.loading" class="block-time" data-lang="信息">
      <div>
        <span>版权声明：</span>
        <a
          href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh"
          target="view_window"
        >
          自由转载-署名-非商用-禁止演绎 3.0
        </a>
      </div>
      <div>
        发表日期：<time
          pubdate="pubdate"
          :datatime="article.CreatedAt | toDate"
        >
          {{ article.CreatedAt | toDate }}
        </time>
      </div>
      <div v-if="article.CreatedAt !== article.UpdatedAt">
        <span>最后编辑：</span>
        <time :datatime="article.UpdatedAt | toDate">
          {{ article.UpdatedAt | toDate }}
        </time>
      </div>
    </section>
  </section>
</template>
<script>
import Helper from '~/assets/javascript/helper.js'

export default {
  name: 'ViewArticle',
  filters: {
    toDate(value) {
      return Helper.Datetime('Y年m月d日', value)
    }
  },
  props: {
    article: {
      type: Object,
      default: () => ({
        loading: false
      })
    }
  },
  updated() {
    this.onMenuNav()
  },
  methods: {
    onInit() {
      // 清空数据
      this.$store.commit('setArticleNav', '')
      this.$store.commit('setArticleActiveNav', '')
    },
    onNavActive() {},
    doExpire(time) {
      const towYears = 2 * 365.25 * 24 * 60 * 60 * 1000
      const expir = Number(Helper.Timestamp(time)) + towYears
      return expir < Number(Helper.Timestamp())
    },
    onMenuNav() {
      // 获取瞄点(仅h2,h3)
      const els = this.$refs.article.querySelectorAll('h2,h3')
      const navList = []
      for (const el of els) {
        const nav = {
          type: `nav-${el.tagName.toLowerCase()}`,
          name: el.innerText,
          index: `#${el.querySelector('a').id}`
        }
        navList.push(nav)
      }
      this.$store.commit('setArticleNav', navList)

      // 设置默认锚点
      if (location.hash) {
        location.href = location.hash
        this.$store.commit('setArticleActiveNav', location.hash)
      }

      // 滑动切换标签
      document.body.onscroll = e => {
        let nowEl = els[0]
        for (const el of els) {
          if (el.getBoundingClientRect().top > 90) {
            break
          }
          nowEl = el
        }
        this.$store.commit(
          'setArticleActiveNav',
          `#${nowEl.querySelector('a').id}`
        )
      }
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/_var.scss';
@import '~/assets/style/markdown.scss';
section.view-article {
  min-height: 10rem;
  margin: 2rem 0 1.5rem 0;

  .el-alert {
    margin: 1.24rem 0;
    padding: 1rem 0.5rem;
  }

  article.markdown-body {
    a:target {
      display: inline-block;
      // min-height: 90px;
      width: 0;
      height: 1;
      padding-top: 90px;
      margin-top: -90px;
    }
  }

  section.block-time {
    background-color: $--color-code-background;
    position: relative;
    margin: 0.8rem 0;
    padding: 1.5rem 0;
    padding-bottom: 1rem;
    font-size: 0.9rem;

    div {
      min-height: 2rem;
      line-height: 2rem;
      margin-left: 3rem;

      a {
        font-weight: 600;
      }
    }

    &:after {
      color: $--color-lang-mark-background;
      content: attr(data-lang);
      font-size: 0.6rem;
      font-weight: 600;
      height: 15px;
      line-height: 15px;
      padding: 13px 35px 0;
      position: absolute;
      right: 0;
      text-align: right;
      top: 0;
    }
  }
}
</style>
<style>
@import url(https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css);
@import url(https://cdn.bootcss.com/highlight.js/9.15.6/styles/atom-one-light.min.css);
</style>
