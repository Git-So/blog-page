<template>
  <section class="page-about">
    <!-- 关于 -->
    <h3>关于</h3>
    <el-card
      v-loading="loading"
      class="about markdown-body"
      v-html="dataMe.Bio"
    >
    </el-card>

    <!-- 联系我 -->
    <el-card v-loading="loading" class="contact-me">
      <div>
        <i class="fab fa-github"></i>
        <span>
          <a :href="dataMe.Github" target="view_window">
            {{ dataMe.Github }}
          </a>
        </span>
      </div>
      <div>
        <i class="far fa-envelope-open"></i>
        <span>{{ dataMe.Email }}</span>
      </div>
    </el-card>
  </section>
</template>
<script>
export default {
  name: 'PageAbout',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    dataMe() {
      return this.$store.state.Me
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/markdown.scss';

section.page-about {
  div.el-card.about,
  div.el-card.contact-me {
    min-height: 8rem;
    margin-bottom: 1.24rem;
  }
  div.el-card.about {
    padding: 1rem;
  }

  div.el-card.contact-me {
    $contact-me-icon-height: 1.56rem;

    div {
      margin-bottom: 1.24rem;
      margin-left: 0.4rem;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      i.far,
      i.fab {
        font-size: $contact-me-icon-height;
        line-height: $contact-me-icon-height;
      }

      span {
        margin-left: 0.5rem;
        display: inline-block;
        font-weight: 600;
        // font-size: $acontact-me-icon-height / 2;
        line-height: $contact-me-icon-height;
      }
    }
  }
}
</style>
<style>
@import url(https://cdn.bootcss.com/font-awesome/5.8.1/css/fontawesome.min.css);
@import url(https://cdn.bootcss.com/font-awesome/5.8.1/css/brands.min.css);
@import url(https://cdn.bootcss.com/font-awesome/5.8.1/css/regular.min.css);
</style>
<style
  link="@import url(https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css);"
  scoped
/>
