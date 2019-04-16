<template>
  <section class="view-comment-item">
    <div>
      <el-row>
        <el-col :span="4" :md="3" :lg="4">
          <img
            :src="avatarURI + comment.Email"
            alt="头像"
            @error="onDefaultImage"
          />
        </el-col>
        <el-col :span="20" :md="21" :lg="20">
          <div>
            {{ comment.Nickname || nickname }}
          </div>
          <div class="comment-date">
            {{ comment.CreatedAt | toDate }}
          </div>
          <div
            class="comment-content"
            v-html="doContentParse(comment.Content) || content"
          ></div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
import Helper from '~/assets/javascript/helper.js'
import Markdown from '~/assets/javascript/markdown.js'
import Twemoji from 'twemoji'

export default {
  name: 'ViewCommentItem',
  filters: {
    toDate(value) {
      return `发表于${Helper.Datetime('Y年m月d日', value)}`
    }
  },
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      nickname: '匿名用户',
      avatarURI: 'https://dn-qiniu-avatar.qbox.me/avatar/',
      content: '这是测试评论内容哦'
    }
  },
  methods: {
    onDefaultImage(e) {
      e.target.src = this.avatarURI
    },
    doContentParse(value) {
      return Twemoji.parse(Markdown.Parse(value))
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/_var.scss';
@import '~/assets/style/markdown.scss';

section.view-comment-item {
  border-bottom: 1px solid $--color-border;
  padding: 0.8rem 0;
  padding-top: 0;
  margin: 1.24rem;

  .el-row {
    .el-col {
      div.comment-date {
        font-size: 0.9rem;
        color: #858585;
      }

      div.comment-content {
        margin-top: 0.8rem;

        img.emoji {
          width: 1.24rem;
          height: 1.24rem;
          margin: 0 2px;
        }
      }
    }
  }
}
</style>
