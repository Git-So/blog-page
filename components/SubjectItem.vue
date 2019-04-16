<template>
  <section class="view-subject-item" @click="onOpenArticleList(subject.ID)">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ subject.Title || title }}</span>
      </div>
      <div class="footer">
        <el-row>
          <el-col :span="8" :xs="0">
            <div class="grid-content bg-purple">
              <i class="far fa-edit"></i>
              <span>
                {{ subject.ArticleLastUpdatedAt | toArticleLastUpdatedAt }}
              </span>
            </div>
          </el-col>
          <el-col :span="8" :xs="12">
            <div class="grid-content bg-purple-light">
              <i class="far fa-compass"></i>
              <span>
                {{ subject.State | toState }}
              </span>
            </div>
          </el-col>
          <el-col :span="8" :xs="12">
            <div class="grid-content bg-purple">
              <i class="far fa-file-alt"></i>
              <span> 当前{{ subject.ArticleNum || 0 }}篇文章 </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </section>
</template>
<script>
import Helper from '~/assets/javascript/helper.js'

export default {
  name: 'ViewSubjectItem',
  filters: {
    toArticleLastUpdatedAt(value) {
      return `最后${Helper.Date(value)}添加`
    },
    toState(value) {
      switch (Number(value)) {
        case 0:
          return '更新中'
        case 1:
          return '已完成'
        default:
          return '无文章'
      }
    }
  },
  props: {
    subject: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      title: '这是测试文字'
    }
  },
  methods: {
    onOpenArticleList: function(id) {
      // 复制文字不跳转
      if (window.getSelection().toString().length > 1) return false
      this.$router.push(`/article/list/1?subject_id=${id}`)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/_var.scss';

section.view-subject-item {
  .el-card {
    margin-bottom: 1.2rem;
    color: $--color-text;

    &:nth-child(1) {
      margin-top: 0.4rem;
    }
  }

  .footer {
    color: $--color-text-second;
    font-size: 0.9rem;

    i.far {
      color: $--color-primary;
    }
  }
}
</style>
<style>
@import url(https://cdn.bootcss.com/font-awesome/5.8.1/css/fontawesome.min.css);
@import url(https://cdn.bootcss.com/font-awesome/5.8.1/css/regular.min.css);
</style>
