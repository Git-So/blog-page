/**
 *
 * By So http://sooo.site
 * -----
 *    Javascript will save your soul!
 * -----
 *
 */

export default {
  // 解析函数
  Parse(md) {
    // 分割为行
    const lines = md.split('\n')

    // 块级处理(变量)
    const block = {
      isCode: false, // 代码块
      blockquote: [], // 当前块引用
      listPrefix: [],
      listType: []
    }

    // 块级处理(检测子列表)
    const checkBlock = function(type, args) {
      // 列表偏移
      let offset = 0

      // 获取列表数据
      let list = block.listPrefix
      if (type === 'blockquote') list = block.blockquote

      // 检测是否存在同级
      if (list.length > 0) {
        for (let key = list.length - 1; key > -1; key--) {
          if (args[1] === undefined) {
            continue
          }
          // 依然为当前等级子列表
          if (list[key].length === args[1].length) {
            break
          }

          // 子列表结束
          if (list[key].length > args[1].length) {
            offset--
            continue
          }

          // 新增子列表
          if (list[key].length < args[1].length) {
            // 添加入等级列表
            if (type === 'ul' || type === 'ol') {
              block.listPrefix.push(args[1])
              block.listType.push(type)
            }

            if (type === 'blockquote') {
              block.blockquote.push(args[1])
            }
            offset++
            break
          }
        }
      } else {
        offset = 1
        // 添加入等级列表
        if (type === 'ul' || type === 'ol') {
          block.listPrefix.push(args[1])
          block.listType.push(type)
        }

        if (type === 'blockquote') block.blockquote.push(args[1])
      }

      return offset
    }

    // 行解析
    const parseLine = function(line) {
      // 标题检测
      line = line.replace(/^(#{1,6})\s+(.+?)\s*#*\s*$/, (...args) => {
        return `<div class="h${args[1].length}">${args[2]}</div>`
      })

      // 分割线
      line = line.replace(/^([*-]{3})\s*$/, (...args) => {
        if (args[1] === '***' || args[1] === '---') {
          return `<hr/>`
        }
        return args[1]
      })

      // 段落
      line = line.replace(
        /^(?!(?:#{,6}|\+|-|>+|\d\.)\s+|`{3})\S+.*$/,
        (...args) => {
          return `<p>${args[0]}</p>`
        }
      )

      // 换行
      line = line.replace(/^\s*$/, (...args) => {
        return `<br/>`
      })

      return line
    }

    // 字体解析
    const parseFont = function(line) {
      // 字体样式检测(双符号语法)
      line = line.replace(/([*_+~=]{2})(\S+)?([*_+~=]{2})/, (...args) => {
        // 前后必须一致才满足语法
        if (args[1] !== args[3]) {
          return args[1] + args[2] + args[3]
        }

        // 标签名
        let tagName = 'div'
        switch (args[1]) {
          case '**':
          case '__':
            // 粗体
            tagName = 'strong'
            break
          case '++':
            // 下划线
            tagName = 'ins'
            break
          case '~~':
            // 中划线
            tagName = 's'
            break
          case '==':
            // 标记
            tagName = 'mark'
            break
          default:
            // 不匹配规则
            return args[1] + args[2] + args[3]
        }
        return `<${tagName}>${args[2]}</${tagName}>`
      })

      // 字体样式检测 (单符号语法)
      line = line.replace(/([*_^~`])(\S+)?([*_^~`])/, (...args) => {
        // 前后必须一致才满足语法
        if (args[1] !== args[3]) {
          return args[1] + args[2] + args[3]
        }

        // 标签名
        let tagName = 'div'
        switch (args[1]) {
          case '*':
          case '_':
            // 斜体
            tagName = 'em'
            break
          case '^':
            // 上角标
            tagName = 'sup'
            break
          case '~':
            // 下角标
            tagName = 'sub'
            break
          case '`':
            // 代码
            tagName = 'code'
            break
          default:
            // 不匹配规则
            return args[1] + args[2] + args[3]
        }
        return `<${tagName}>${args[2]}</${tagName}>`
      })

      return line
    }

    // 逐行处理
    let html = ''
    const reg = {
      list: /^(\s*)(\+|-|\d\.)\s+(.+)\s*$/,
      blockquote: /^(>+)\s+(.*)$/,
      code: /^`{3}\s*(\S*)\s*.*$/
    }
    for (let line of lines) {
      // 列表结束检测
      if (!reg.list.test(line) && block.listPrefix.length > 0) {
        //
        while (block.listPrefix.length) {
          block.listPrefix.pop()
          html += `</li></${block.listType.pop()}>`
        }
      }

      // 块引用结束检测
      if (!reg.blockquote.test(line) && block.blockquote.length > 0) {
        html += `</blockquote>`.repeat(block.blockquote.length)
        block.blockquote = []
      }

      // 代码块结束检测
      if (block.isCode) {
        // 代码块结束检测
        if (/^`{3}\s*$/.test(line)) {
          // 停用代码块状态
          block.isCode = false
          html += `</div></pre>`
          continue
        }
        // 代码块不能使用其他语法
        html += line + '<br/>'
        continue
      }

      // 代码块开始检测(代码块有优选权，且排斥其他语法)
      if (reg.code.test(line)) {
        line = line.replace(reg.code, (...args) => {
          // 启用代码状态
          block.isCode = true
          html += `<pre class="lang" data-lang="${args[1]}"><div class="code">`
        })
        // 代码块不能使用其他语法
        continue
      }

      // 块引用开始检测
      line = line.replace(reg.blockquote, (...args) => {
        // 生成 html
        let tagNode = ''
        let offset = checkBlock('blockquote', args)
        switch (true) {
          case offset > 0:
            tagNode = `<blockquote>${args[2]}`
            break
          case offset === 0:
            tagNode = `</blockquote><blockquote>${args[2]}`
            break
          case offset < 0:
            while (offset) {
              block.blockquote.pop()
              tagNode += `</blockquote>`
              offset++
            }
            tagNode += `</blockquote><blockquote>${args[2]}`
            break
        }

        return tagNode
      })

      // 行解析
      line = parseLine(line)

      // 字体解析
      line = parseFont(line)

      // 列表开始检测
      line = line.replace(reg.list, (...args) => {
        // 有序无序？并启用列表状态
        let tagName = 'ol' // 默认有序
        if (args[2] === '+' || args[2] === '-') tagName = 'ul' // 无序

        // 生成 html
        let tagNode = ''
        let offset = checkBlock(tagName, args)
        switch (true) {
          case offset > 0:
            tagNode = `<${tagName}><li>${args[3]}`
            break
          case offset === 0:
            tagNode = `</li><li>${args[3]}`
            break
          case offset < 0:
            while (offset) {
              block.listPrefix.pop()
              tagNode += `</li></${block.listType.pop()}>`
              offset++
            }
            tagNode += `</li><li>${args[3]}`
            break
        }

        return tagNode
      })

      // 添加代码
      html += line
    }

    // 释放未处理代码块 (主要是最后不规则语句兼容)
    if (block.isCode) {
      block.isCode = false
      html += `</div></pre>`
    }

    // 释放块引用数据
    html += `</blockquote>`.repeat(block.blockquote.length)
    block.blockquote = []

    // 释放列表数据
    while (block.listPrefix.length) {
      html += `</li></${block.listType.pop()}>`
      block.listPrefix.pop()
    }

    return html
  }
}
