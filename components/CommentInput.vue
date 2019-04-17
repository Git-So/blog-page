<template>
  <section class="view-comment-input">
    <div class="toolbar">
      <span
        title="输入"
        :class="isInput ? 'is-active' : ''"
        @click="onSelectInput"
      >
        <i class="far fa-edit"></i>
      </span>

      <span
        title="Emoji"
        :class="isSelectEmoji ? 'is-active' : ''"
        @click="onSelectEmoji"
      >
        <i class="far fa-laugh-squint"></i>
      </span>

      <span
        title="预览"
        :class="isPreview ? 'is-active' : ''"
        @click="onSelectPreviewComment"
      >
        <i class="far fa-map"></i>
      </span>

      <span
        title="帮助"
        :class="isHelp ? 'is-active' : ''"
        @click="onSelectHelp"
      >
        <i class="far fa-question-circle"></i>
      </span>
    </div>
    <div class="content">
      <div class="input">
        <textarea
          ref="inputComment"
          v-model="input"
          placeholder="文明评论，理性发言"
          @keydown="onInputKey"
          @input="$emit('input', $event.target.value)"
        />
      </div>
      <div class="input-emoji" :hidden="!isSelectEmoji">
        <div ref="inputEmoji" @keydown="onEmojiKey">
          <span
            v-for="item in emoji"
            :key="item"
            :class="isActiveEmoji === item ? 'is-active' : ''"
            @click="onInputEmoji"
            v-html="doEmoji2Img(item)"
          />
        </div>
      </div>
      <div class="preview" :hidden="!isPreview">
        <div class="comment comment-content" v-html="html" />
      </div>
      <div class="help" :hidden="!isHelp">
        <div class="comment-content" v-html="doParseMarkdown(help)" />
      </div>
    </div>
  </section>
</template>
<script>
import Markdown from '~/assets/javascript/markdown.js'
import Twemoji from 'twemoji'

export default {
  name: 'ViewCommentInput',
  data() {
    return {
      inputEl: {},
      inputEmoji: {},
      input: '',
      html: '',
      isInput: true,
      isSelectEmoji: false,
      isPreview: false,
      isHelp: false,
      help: `# 说明
支持大部分标准Markdown语法
==不支持链接和图片语法==
==不支持拓展语法==
\`\`\`markdown
    # 一级标题
    ....
    ###### 六级标题
   
    __粗体__
    **粗体**
    _斜体_
    *斜体*
    ++下划线++
    ~~中划线~~
    ==标记==
    ^上角标^
    ~下角标~

    > 这是一个引用
    >> 这是一个二级引用
    >>> 引用不限制层数，但请节制，避免玩坏

  \`\`\`lang
      // 这是一个代码块
      // 如果不需要代码块，需要插入三个"\`"字符请在前面添加空格
      alert("Hello,World!")
  \`\`\`

    + 这是一个无序列表
    - 无序列表的另一种方式
        - 可以自由嵌套
            1. 这是一个有序列表
    
   
\`\`\`

`,
      emoji: [
        '😀',
        '😃',
        '😄',
        '😁',
        '😆',
        '😅',
        '🤣',
        '😂',
        '🙂',
        '🙃',
        '😉',
        '😊',
        '😇',
        '🥰',
        '😍',
        '🤩',
        '😘',
        '😗',
        '☺',
        '😚',
        '😙',
        '😋',
        '😛',
        '😜',
        '🤪',
        '😝',
        '🤑',
        '🤗',
        '🤭',
        '🤫',
        '🤔',
        '🤐',
        '🤨',
        '😐',
        '😑',
        '😶',
        '😏',
        '😒',
        '🙄',
        '😬',
        '🤥',
        '😌',
        '😔',
        '😪',
        '🤤',
        '😴',
        '😷',
        '🤒',
        '🤕',
        '🤢',
        '🤮',
        '🤧',
        '🥵',
        '🥶',
        '🥴',
        '😵',
        '🤯',
        '🤠',
        '🥳',
        '😎',
        '🤓',
        '🧐',
        '😕',
        '😟',
        '🙁',
        '☹',
        '😮',
        '😯',
        '😲',
        '😳',
        '🥺',
        '😦',
        '😧',
        '😨',
        '😰',
        '😥',
        '😢',
        '😭',
        '😱',
        '😖',
        '😣',
        '😞',
        '😓',
        '😩',
        '😫',
        '😤',
        '😡',
        '😠',
        '🤬',
        '😈',
        '👿',
        '🌚',
        '🌛',
        '🌜',
        '🌝',
        '🌞',
        '🌬',
        '💀',
        '☠',
        '💩',
        '🤡',
        '👹',
        '👺',
        '👻',
        '👽',
        '👾',
        '🤖',
        '😺',
        '😸',
        '😹',
        '😻',
        '😼',
        '😽',
        '🙀',
        '😿',
        '😾',
        '💋',
        '👋',
        '🤚',
        '🖐',
        '✋',
        '🖖',
        '👌',
        '✌',
        '🤞',
        '🤟',
        '🤘',
        '🤙',
        '👈',
        '👉',
        '👆',
        '🖕',
        '👇',
        '☝',
        '👍',
        '👎',
        '✊',
        '👊',
        '🤛',
        '🤜',
        '👏',
        '🙌',
        '👐',
        '🤲',
        '🤝',
        '🙏',
        '✍',
        '💅',
        '🤳',
        '💪',
        '🦵',
        '🦶',
        '👂',
        '👃',
        '🧠',
        '🦷',
        '🦴',
        '👀',
        '👁',
        '👅',
        '👄'
      ],
      isActiveEmoji: '',
      isActiveEmojiKey: 0
    }
  },
  mounted() {
    this.inputEl = this.$refs.inputComment
    this.inputEmoji = this.$refs.inputEmoji
    document.addEventListener('keydown', this.onPageKey)
  },
  methods: {
    onSelectInput() {
      // 显示编辑
      this.hideAllContent()
      this.isInput = true

      // 光标选定
      this.inputEl.focus()
    },
    onClearInput() {
      this.input = ''
    },
    onSelectEmoji() {
      // 显示Emoji选择框
      this.hideAllContent()
      this.isSelectEmoji = true
      // 选择输入
      this.inputEmoji.focus()
    },
    onInputEmoji(e) {
      // emoji 输入
      if (!e.target.alt) return
      this.doInputEmoji(e.target.alt)
    },
    doInputEmoji(emoji) {
      this.inputEl.focus()
      document.execCommand('insertHTML', false, emoji)
      this.onSelectInput()
    },
    onSelectPreviewComment() {
      // 显示预览
      this.hideAllContent()
      this.isPreview = true

      // 预览数据
      // console.warn('preview')
      const html = this.doParseMarkdown(this.input)

      // emoji
      this.html = Twemoji.parse(html)
      // console.log(this.html)
    },
    onSelectHelp() {
      // 显示 Help
      this.hideAllContent()
      this.isHelp = true
    },
    onCommonKey(e) {
      //   console.log(e.keyCode);
      // ctrl + w input
      if (e.keyCode === 68 && e.ctrlKey) {
        this.onSelectInput()
        e.returnValue = false
        return
      }

      // ctrl + e emoji
      if (e.keyCode === 69 && e.ctrlKey) {
        this.onSelectEmoji()
        e.returnValue = false
        return
      }

      // ctrl + s  emoji
      // 为啥是 s ？ 因为按键方便
      if (e.keyCode === 83 && e.ctrlKey) {
        this.onSelectPreviewComment()
        e.returnValue = false
      }
    },
    onInputKey(e) {
      // console.warn('onInputKey')

      // 快捷键设置
      this.onCommonKey(e)

      // tab 4空格
      if (e.keyCode === 9) {
        this.inputEl.focus()
        document.execCommand('insertHTML', false, '       ')
        e.returnValue = false
      }
    },
    onEmojiKey(e) {
      // console.warn('onEmoijKey')

      // 快捷键设置
      // this.onCommonKey(e)

      // 方向键选择表情
      // console.log(this.isActiveEmoji);
      if (e.keyCode > 36 && e.keyCode < 41) {
        // 无选中则默认第一个
        if (!this.isActiveEmoji) {
          this.isActiveEmoji = this.emoji[0]
          // console.log(this.isActiveEmoji)
          return
        }

        // 判断是否存在 emoji
        const isExistEmojiKey = num => {
          // 最小值
          if (this.isActiveEmojiKey + num < 0) {
            this.isActiveEmojiKey = 0
            return
          }

          // 最大值
          if (this.isActiveEmojiKey + num >= this.emoji.length) {
            this.isActiveEmojiKey = this.emoji.length - 1
            return
          }

          this.isActiveEmojiKey = this.isActiveEmojiKey + num
          return true
        }

        // 方向键选择
        let moveIndex = 0
        switch (e.keyCode) {
          case 38:
            // up
            moveIndex = -10
            break
          case 40:
            // down
            moveIndex = 10
            break
          case 37:
            // left
            moveIndex = -1
            break
          case 39:
            // right
            moveIndex = 1
            break
        }

        // 获取 emoji key
        isExistEmojiKey(moveIndex)
        this.isActiveEmoji = this.emoji[this.isActiveEmojiKey]

        // 获取滑动高度
        const emoji = this.inputEmoji.querySelector('span')

        // 最大距离高度
        const maxScrollTop =
          this.inputEmoji.scrollTop + emoji.getBoundingClientRect().height

        // 最小距离高度
        const minScrollTop =
          this.inputEmoji.scrollTop - emoji.getBoundingClientRect().height

        // 滑动距离是否有效
        if (
          maxScrollTop > this.inputEmoji.getBoundingClientRect().height &&
          minScrollTop < 0
        ) {
          // 取消默认事件
          e.returnValue = false
          return
        }

        // 是否滑动
        // 上下换行情况
        let isScroll = false
        // console.log(Math.abs(moveIndex));
        if (Math.abs(moveIndex) > 9) {
          isScroll = true
        }

        // 左右换行情况
        const col1 = Math.ceil((this.isActiveEmojiKey + 1) / 10)
        const col2 = Math.ceil((this.isActiveEmojiKey - moveIndex + 1) / 10)
        // console.log(col1, col2);
        if (col1 !== col2) {
          isScroll = true
        }
        // console.log(isScroll);
        if (isScroll) {
          if (moveIndex > 0) {
            // 滑动
            this.inputEmoji.scrollTop = maxScrollTop
          }
          if (moveIndex < 0) {
            this.inputEmoji.scrollTop = minScrollTop
          }
        }
      }

      // 输入表情
      if (e.keyCode === 13) {
        this.doInputEmoji(this.isActiveEmoji)
      }

      // 取消默认事件
      e.returnValue = false
    },
    onPageKey(e) {
      // emoji 选择
      if (this.isSelectEmoji) {
        this.onEmojiKey(e)
      }
    },
    hideAllContent() {
      this.isInput = false
      this.isSelectEmoji = false
      this.isPreview = false
      this.isHelp = false
    },
    doEmoji2Img(img) {
      return Twemoji.parse(img)
    },
    doParseMarkdown(md) {
      return Markdown.Parse(md)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/style/markdown.scss';
@import '~/assets/style/comment.scss';

.view-comment-input {
  $content-select-padding: 0.5rem;
  $span-emoji-width: 3.5rem;
  $content-scrollbar-width: 0.4rem;
  $width: $span-emoji-width * 10 + $content-select-padding * 2 +
    $content-scrollbar-width;
  $height: 15rem;
  $toolbar-height: 2.5rem;
  $content-height: $height - $toolbar-height;
  $border-size: 0.07rem;
  $border-color: rgba(0, 0, 0, 0.431);

  height: $height;
  width: $width;
  margin-left: 1.24rem;
  border: $border-size solid;
  position: relative;
  color: #34495e;
  font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif;
  border-color: $border-color;
  letter-spacing: 0.05rem;
  font-size: 16px;
  box-sizing: content-box;

  * {
    margin: 0;
    padding: 0;
  }

  .toolbar {
    $toolbar-emoji-width: 1.6rem;
    height: $toolbar-height;
    font-size: 16px;
    border-bottom: $border-size solid;
    -webkit-text-stroke: 1px white;

    span {
      cursor: default;
      margin: 0 1.5rem;
      height: $toolbar-height;
      line-height: $toolbar-height;

      &:nth-child(1) {
        margin-left: 1rem;
        background-color: $--color-title;
      }

      &.is-active {
        color: $--color-title;
      }

      img.emoji {
        display: inline-block;
        width: $toolbar-emoji-width;
        height: $toolbar-emoji-width;
        position: absolute;
        top: ($toolbar-height - $toolbar-emoji-width) /2;
      }

      i:before {
        font-size: $toolbar-emoji-width;
        position: absolute;
        top: ($toolbar-height - $toolbar-emoji-width) /2;
      }
    }
  }

  .content {
    height: $content-height;

    .input,
    .input-emoji,
    .preview,
    .help {
      width: 100%;
      position: absolute;
      left: 0;
    }

    .input > textarea,
    .input-emoji > div,
    .preview > div,
    .help > div {
      width: 100%;
      height: $content-height - $border-size;
      padding: $content-select-padding;
      font-size: 16px;
      overflow-y: auto;
      border-width: 0;
      background-color: white;

      &::-webkit-scrollbar {
        width: $content-scrollbar-width; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 1px;
        box-shadow: inset 0 0 5px #8dbba783;
        -webkit-box-shadow: inset 0 0 5px #8dbba783;
        background: #71c09bc7;
      }

      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: #ededed00;
        // border-bottom: $border-size $border-color solid;
      }
    }

    .input > textarea {
      outline: none;
      resize: none;
    }

    .input-emoji {
      z-index: 100;

      & > div {
        margin: 0 auto;
        font-size: 0;

        span {
          position: relative;
          display: inline-block;
          width: $span-emoji-width;
          height: $span-emoji-width;
          // border: #009a61 1px solid;
          // box-sizing: border-box;

          &.is-active,
          &:active {
            background: $--color-emoji-active-background;
          }

          img.emoji {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 80%;
            height: 80%;
          }
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
