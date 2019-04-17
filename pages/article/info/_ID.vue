<template>
  <section class="page-article-info">
    <!-- 文章详情 -->
    <view-article :article="info" />

    <!-- 发表评论 -->
    <h3>发表评论</h3>
    <div class="block-comment-input">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称：">
              <el-input
                v-model="form.Nickname"
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱：">
              <el-input
                v-model="form.Email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <view-comment-input v-model="form.Content" ref="commentInput" />
      <el-row class="btn">
        <el-col :span="16">
          <span>请注意，您所发表的评论本站有权屏蔽或删除</span>
        </el-col>
        <el-col :span="8">
          <el-button
            type="primary"
            class="send"
            :loading="form.loading"
            @click="onSendComment"
          >
            发送
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 评论列表 -->
    <h3>评论</h3>
    <div class="block-list">
      <view-comment-item
        v-for="item in comment.list"
        :key="item.ID"
        :comment="item"
      />
    </div>

    <!-- 翻页 -->
    <view-pagination
      :loading="comment.loading"
      :page-size="comment.pageSize"
      :page-num="comment.pageNum"
      :count="comment.count"
      :page-class="comment.pageClass"
    />
  </section>
</template>
<script>
import Helper from '~/assets/javascript/helper.js'
import ViewArticle from '~/components/Article.vue'
import ViewCommentInput from '~/components/CommentInput.vue'
import ViewCommentItem from '~/components/CommentItem.vue'
import ViewPagination from '~/components/Pagination.vue'

export default {
  name: 'PageArticleInfo',
  components: {
    'view-article': ViewArticle,
    'view-comment-input': ViewCommentInput,
    'view-comment-item': ViewCommentItem,
    'view-pagination': ViewPagination
  },
  data() {
    return {
      info: {
        loading: false
      },
      comment: {
        list: [],
        count: 0,
        pageNum: 1,
        pageSize: 0,
        loading: false,
        useCache: true
      },
      form: {
        Nickname: '',
        Email: '',
        Content: '',
        loading: false
      },
      ID: 0
    }
  },
  destroyed() {
    this.$store.commit('setShowArticleInfo', false)
  },
  methods: {
    onInit() {
      this.$store.commit('setShowArticleInfo', true)
      this.ID = Number(this.$route.params.ID)
      this.getInfo()
      this.getCommentList()
    },
    onSendComment() {
      // console.log(this.form)
      this.form.loading = true

      // 评论内容
      const comment = {
        ArticleID: this.ID,
        Nickname: this.form.Nickname,
        Email: this.form.Email,
        Content: this.form.Content
      }

      // 发表评论
      const url = `comment/info`
      this.$axios
        .$post(url, comment)
        .then(resp => {
          this.form.loading = false
          if (resp.Code !== 200) {
            this.$message.warning(resp.Msg)
          } else {
            this.$message.success(resp.Msg)
            this.comment.useCache = false
            this.form.Content = ''
            this.$refs.commentInput.onClearInput()
            this.getCommentList()
          }
        })
        .catch(err => {
          this.form.loading = false
          // console.log(err)
          this.$message.error('发表评论失败')
        })
    },
    async getInfo() {
      const url = `article/info/${this.ID}`
      let JsonData = {}

      if (!this.$store.state.ApiCache.hasOwnProperty(Helper.GetKey(url))) {
        // fetch
        this.info.loading = true
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
      const data = JsonData.data
      this.info = data.articleInfo
      this.info.loading = false
    },
    async getCommentList() {
      const url = `comment/list/${this.comment.pageNum}?article_id=${this.ID}`
      let JsonData = {}

      if (
        !this.comment.useCache ||
        !this.$store.state.ApiCache.hasOwnProperty(Helper.GetKey(url))
      ) {
        // fetch
        this.loading = true
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
      const data = JsonData.data
      this.comment.list = data.commentList
      this.comment.count = data.count
      this.comment.pageNum = data.pageNum
      this.comment.pageSize = data.pageSize
      this.comment.loading = false
      this.comment.useCache = true
    }
  }
}
</script>
<style lang="scss">
section.page-article-info {
  form.el-form {
    div.el-form-item {
      margin-bottom: 1rem;
    }
  }

  div.block-comment-input {
    width: 37.5em;
    div.btn {
      $height: 2.6rem;
      margin: 1rem 0;
      margin-left: 1.4rem;
      text-align: right;
      height: $height;
      line-height: $height;

      div.el-col:nth-child(1) {
        text-align: left;
        font-size: 0.92rem;
        font-weight: 600;
      }
    }
  }
}
</style>
