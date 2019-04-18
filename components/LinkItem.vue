<template>
  <section class="view-link-item">
    <el-card shadow="always">
      <el-col>
        <el-row>
          <!-- 打开友链 -->
          <el-button
            icon="el-icon-news"
            circle
            class="open"
            @click="onOpenURI(`${link.URI || URI}`)"
          />
          <!-- 编辑友链 -->
          <el-button
            v-if="isEdit"
            icon="el-icon-edit-outline"
            circle
            class="edit"
            @click.native="$emit('edit', link)"
          />
        </el-row>
      </el-col>
      <div class="link-info">
        <!-- 头像 -->
        <div class="link-avater">
          <img :src="link.AvatarURI || avatarURI" @error="onDefaultImage" />
          <!-- 删除友链 -->
          <div
            v-if="isDelete"
            class="delete"
            @mouseenter="showDelete"
            @mouseleave="hideDelete"
            @click="$emit('delete', link)"
          >
            <i class="el-icon-delete"></i>
          </div>
        </div>
        <!-- 用户昵称 -->
        <div class="link-nickname">
          <span>{{ link.Nickname || nickname }}</span>
        </div>
        <!-- 网站标题 -->
        <div class="link-title">
          <p>{{ link.Title || title }}</p>
        </div>
      </div>
    </el-card>
  </section>
</template>
<script>
export default {
  name: 'ViewLinkItem',
  props: {
    link: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      URI: `https://sooo.site`,
      avatarURI: `https://dn-qiniu-avatar.qbox.me/avatar/`,
      nickname: `无名`,
      title: `这个人很懒，啥也不留下。`
    }
  },
  methods: {
    onOpenURI(uri) {
      window.open(uri)
    },
    onDefaultImage(e) {
      e.target.src = this.avatarURI
    },
    showDelete(e) {
      e.target.classList.add('delete-show')
    },
    hideDelete(e) {
      e.target.classList.remove('delete-show')
    }
  }
}
</script>
<style lang="scss">
section.view-link-item {
  @media (max-width: 765px) {
    width: 48%;

    & > div.el-card.is-always-shadow {
      min-height: 15rem;
      .el-card__body {
        padding: 14px;

        div.link-info {
          font-size: 0.85rem;
          div.link-avater {
            margin-bottom: 1.5rem;
          }
          div.link-nickname {
            margin-bottom: 0.5rem;
          }
        }
      }
    }
  }
  width: 12.8rem;
  display: inline-block;
  margin: 0.8rem;
  margin-right: 0;

  div.el-card {
    min-height: 20rem;

    // 顶部操作
    div.el-col {
      .el-row {
        .el-button {
          position: absolute;
        }
        // 打开按钮
        .open.el-button {
          left: 0;
        }
        // 编辑按钮
        .edit.el-button {
          right: 0;
        }
      }
    }

    // 内容
    div.link-info {
      %center {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
      }

      // 头像与删除
      .link-avater {
        height: 6rem;
        text-align: center;
        margin: 3rem auto;
        margin-bottom: 1.5rem;
        position: relative;

        img,
        .delete {
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          @extend %center;
        }

        .delete {
          opacity: 0;
          transition: 0.3s;
        }

        .delete-show {
          opacity: 1;
        }

        .delete {
          background-color: rgba(0, 0, 0, 0.5);

          i.el-icon-delete {
            @extend %center;
            top: 50%;
            font-size: 2.5rem;
            color: rgba(255, 255, 255, 0.9);
            height: 100%;
            line-height: 100%;
          }
        }
      }

      // 用户昵称
      .link-nickname {
        text-align: center;
        margin-bottom: 1rem;

        span {
          margin: 0.5rem 0 !important;
          padding: 0.5rem 0 !important;
        }
      }

      // 链接标题
      .link-title {
        text-align: center;

        p {
          margin: 0.5rem 0 !important;
          padding: 0.5rem 0 !important;
        }
      }
    }
  }
}
</style>
