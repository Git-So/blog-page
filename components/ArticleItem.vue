<template>
  <section class="view-article-item" @click="onOpenArticle(article.ID)">
    <el-card shadow="hover">
      <h3>{{ article.Title || title }}</h3>
      <p>{{ article.Description || description }}</p>
      <el-row :gutter="20" class="footer">
        <el-col :span="6" :xs="8">
          <div>
            <i class="far fa-clock"></i>
            <span>
              {{ article.CreatedAt | toDate }}
            </span>
          </div>
        </el-col>
        <el-col :span="6" :xs="0">
          <div>
            <i class="far fa-bookmark"></i>
            <span>
              <nobr>
                {{ article.Tags | toTagStr }}
              </nobr>
            </span>
          </div>
        </el-col>
        <el-col :span="6" :xs="8">
          <div>
            <i class="far fa-eye"></i>
            <span>
              {{ article.ViewNum || 0 }}
            </span>
          </div>
        </el-col>
        <el-col :span="6" :xs="8">
          <div>
            <i class="far fa-comment-alt"></i>
            <span>
              {{ article.CommentNum || 0 }}
            </span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </section>
</template>
<script>
import Helper from '~/assets/javascript/helper.js'

export default {
  name: 'ViewArticleItem',
  filters: {
    toDate(value) {
      return Helper.Date(value)
    },
    toTagStr(value) {
      // 不存在数据
      if (value == null) return '测试, Test'

      // 不存在标签
      if (value.length < 1) return ''

      // 获取 TagString
      let tagStr = ''
      for (const tag of value) {
        // 为了显示标签好看，不显示过多标签
        if (tagStr.length + tag.Name.length > 9) {
          break
        }
        tagStr += tag.Name + ','
      }
      return tagStr.slice(0, -1)
    }
  },
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      title: '这是一个测试标题',
      description:
        '这是测试简介，就是这些内容了呀，没有其他了，就是这样，哈哈，白日依山尽，黄河入海流，在来一些文字就差不多够了',
      tags: ['测试', 'Test']
    }
  },
  methods: {
    onOpenArticle: function(id) {
      // 复制文字不跳转
      if (window.getSelection().toString().length > 1) return false
      this.$router.push(`/article/info/${id}`)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/_var.scss';

section.view-article-item {
  div.el-card {
    margin-bottom: 1.2rem;

    &:nth-child(1) {
      margin-top: 0.4rem;
    }

    h2 {
      margin-left: 0.2rem;
    }

    p {
      text-indent: 1.5rem;
      letter-spacing: 0.1rem;
      line-height: 1.5rem;
      font-size: 0.95rem;
      margin: 1rem 0 1.2rem 0;
      word-wrap: break-word;
    }

    div.el-row.footer {
      .el-col {
        color: $--color-text-second;
        font-size: 0.9rem;
        height: 1.2rem;
        line-height: 1.2rem;
        overflow: hidden;
        white-space: nowrap;

        i.far {
          color: $--color-primary;
        }
      }
    }
  }
}
</style>
<style>
@import url(https://cdn.bootcss.com/font-awesome/5.8.1/css/fontawesome.min.css);
@import url(https://cdn.bootcss.com/font-awesome/5.8.1/css/regular.min.css);
</style>
