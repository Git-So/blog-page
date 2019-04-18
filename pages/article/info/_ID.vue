<template>
  <section class="page-article-info">
    <!-- 文章详情 -->
    <view-article :article="info" />

    <!-- 发表评论 -->
    <h3>发表评论</h3>
    <div class="block-comment-input">
      <!-- 验证码 -->
      <section :hidden="!captcha.isShow">
        <el-card class="captcha">
          <h3>验证码</h3>
          <div>
            <!-- 声音验证码 -->
            <audio
              v-if="captcha.type === 'Audio'"
              controls="controls"
              :src="captcha.base64"
            ></audio>
            <!-- 图片验证码 -->
            <img v-else :src="captcha.base64" alt="验证码" />
            <el-button type="text" @click.stop="onGetCaptcha">
              重新获取
            </el-button>
          </div>
          <div>
            <el-input
              v-model="captcha.value"
              placeholder="请输入验证码"
              clearable
            >
            </el-input>
          </div>
          <div>
            <el-button @click.stop="onCancelSendComment">取消</el-button>
            <el-button
              type="primary"
              :loading="captcha.loading"
              @click.stop="onSendComment"
            >
              提交
            </el-button>
          </div>
        </el-card>
      </section>
      <!-- 评论编辑 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12" :xs="24">
            <el-form-item label="昵称：">
              <el-input
                v-model="form.Nickname"
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="邮箱：">
              <el-input
                v-model="form.Email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <view-comment-input ref="commentInput" v-model="form.Content" />
      <el-row class="btn">
        <el-col :span="16">
          <span>请注意，您所发表的评论本站有权屏蔽或删除</span>
        </el-col>
        <el-col :span="8">
          <el-button
            type="primary"
            class="send"
            :loading="form.loading"
            @click.stop="onSendComment"
          >
            发送
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 评论列表 -->
    <h3>评论</h3>
    <div class="comment-list">
      <view-comment-item
        v-for="item in comment.list"
        :key="item.ID"
        :comment="item"
      />
      <div v-if="comment.loading || !comment.count" class="nil-data">
        暂时还没有评论哦!
      </div>
    </div>

    <!-- 翻页 -->
    <section
      class="view-pagination"
      :hidden="comment.loading || !comment.count"
    >
      <el-pagination
        background
        :page-size="comment.pageSize"
        layout="prev, pager, next"
        :total="comment.count"
        :current-page="comment.pageNum"
        @current-change="onPageChangeComment"
      />
    </section>
  </section>
</template>
<script>
import Helper from '~/assets/javascript/helper.js'
import ViewArticle from '~/components/Article.vue'
import ViewCommentInput from '~/components/CommentInput.vue'
import ViewCommentItem from '~/components/CommentItem.vue'

export default {
  name: 'PageArticleInfo',
  components: {
    'view-article': ViewArticle,
    'view-comment-input': ViewCommentInput,
    'view-comment-item': ViewCommentItem
  },
  data() {
    return {
      info: {
        loading: false
      },
      comment: {
        list: [],
        count: 1,
        pageNum: 1,
        pageSize: 0,
        loading: false,
        useCache: true
      },
      captcha: {
        isShow: false,
        type: 'Digit',
        key: '',
        base64: '',
        value: '',
        loading: false
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
      // 验证昵称,邮箱,评论是否为空
      if (!this.form.Nickname) {
        this.$message.warning('您的昵称不能为空')
        return
      }
      if (!this.form.Email) {
        this.$message.warning('您的邮箱不能为空')
        return
      } else {
        // 邮箱合法检验
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*){1,63}\.[a-z0-9]+$/
        if (!reg.test(this.form.Email)) {
          this.$message.warning('您的邮箱邮箱不正确')
          return
        }
      }
      if (!this.form.Content) {
        this.$message.warning('评论不能为空')
        return
      }

      // 打开验证码输入框
      if (!this.captcha.isShow) {
        this.form.loading = true
        this.onGetCaptcha()
        return
      }

      // 评论内容
      const comment = {
        ArticleID: this.ID,
        Nickname: this.form.Nickname,
        Email: this.form.Email,
        Content: this.form.Content,
        CaptchaKey: this.captcha.key,
        CaptchaValue: this.captcha.value
      }

      // 发表评论
      this.captcha.loading = true
      const url = `comment/info`
      this.$axios
        .$post(url, comment)
        .then(resp => {
          this.captcha.loading = false
          if (resp.Code !== 200) {
            this.$message.warning(resp.Msg)
          } else {
            this.$message.success(resp.Msg)
            this.comment.useCache = false
            this.form.Content = ''
            this.captcha.isShow = false
            this.captcha.value = ''
            this.$refs.commentInput.onClearInput()
            this.getCommentList()
          }
        })
        .catch(e => {
          this.captcha.loading = false
          // console.log(err)
          this.$message.error('发表评论失败')
        })
    },
    onCancelSendComment() {
      this.captcha.isShow = false
    },
    onGetCaptcha() {
      // 获取验证码
      this.$axios
        .$get(`captcha`)
        .then(resp => {
          this.form.loading = false
          if (resp.Code !== 200) {
            this.$message.warning(resp.Msg)
          } else {
            this.$message.success(resp.Msg)
            this.captcha.isShow = true
            this.captcha.type = resp.data.type
            this.captcha.key = resp.data.key
            this.captcha.base64 = resp.data.base64
          }
        })
        .catch(e => {
          this.form.loading = false
          this.$message.error('获取验证码失败')
        })
    },
    onPageChangeComment(PageNum) {
      // 评论翻页
      this.comment.pageNum = PageNum
      this.getCommentList()
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
  @media (max-width: 765px) {
    & > h3 + div.block-comment-input {
      width: 100%;
      div.block-comment-input {
        div.captcha {
          width: auto;
        }
      }

      .el-form-item {
        $xs-label-width: 4rem;
        label.el-form-item__label {
          width: $xs-label-width !important;
        }

        div.el-form-item__content {
          margin-left: $xs-label-width !important;
          margin-right: 20px;
        }
      }

      div.btn {
        margin: 0.6rem;
        line-height: 1.3rem;

        div.el-col:nth-child(1) {
          font-size: 0.8rem;
        }
      }
    }
  }
  form.el-form {
    div.el-form-item {
      margin-bottom: 1rem;
    }
  }

  div.block-comment-input {
    position: relative;
    width: 37.5em;

    div.captcha {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      margin: auto;
      height: 18rem;
      width: 25rem;

      div.el-card__body {
        margin: 0 2rem;
        div {
          min-width: 1px;
          min-height: 2rem;
          margin: 0.6rem;
          text-align: center;

          img {
            height: 3rem;
            width: 9rem;
          }

          audio {
            height: 3rem;
            width: 100%;
          }

          button.el-button {
            margin-left: 0.6rem;
          }
        }

        div:nth-last-child(1) {
          text-align: right;
        }
      }
    }

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
