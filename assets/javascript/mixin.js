/**
 *
 * By So http://sooo.site
 * -----
 *    Javascript will save your soul!
 * -----
 *
 */

import Helper from '~/assets/javascript/helper.js'

export const Global = {
  created() {
    this.mixinInit()
  },
  computed: {
    dataMixinInitFunc() {
      // 获取mixinInit系列函数
      return Object.keys(this).filter(key => {
        // 长度必须大于mixinInit且与mixinInit开头
        const prefix = 'mixinInit'
        if (key.length > prefix.length && key.substr(0, 9) === prefix) {
          if (typeof this[key] === 'function') return true
        }
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.mixinInit()
  },
  methods: {
    mixinInit() {
      // 执行mixinInit系列函数
      this.dataMixinInitFunc.forEach(key => {
        this[key]()
      })
    },
    mixinInitGlobal() {
      // 组件中可自定义初始化
      this.onInit()
    },
    onInit() {
      // 醒目提示未定义自定义初始化函数
      // console.info("%c[mixin]未定义onInit函数", "color:#009a61")
    }
  }
}

// 搜索
export const Search = {
  data() {
    return {
      search: '',
      pageClass: 'page'
    }
  },
  methods: {
    mixinInitSearch() {
      this.search = Helper.GetGetForm('search')
    },
    onSearch() {
      const search = this.search.length ? `?search=${this.search}` : ``
      this.$router.push(`/${this.pageClass}/list/1${search}`)
    }
  }
}

// 获取当前页数
export const GetPageNum = {
  data() {
    return {
      pageNum: 1
    }
  },
  methods: {
    mixinInitGetPageNum() {
      this.pageNum = Number(this.$route.params.PageNum)
    }
  }
}

// 获取列表
export const GetList = {
  data() {
    return {
      list: [],
      info: {},
      search: '',
      pageNum: 1,
      pageSize: 0,
      count: 1,
      loading: false,
      pageClass: 'page'
    }
  },
  methods: {
    mixinInitGetList() {
      this.getList()
    },
    async getList() {
      const url = `${this.pageClass}/list/${this.pageNum}${
        window.location.search
      }`
      let JsonData = {}

      if (!this.$store.state.ApiCache.hasOwnProperty(Helper.GetKey(url))) {
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
      this.list = data[this.pageClass + 'List']
      this.count = data.count
      this.pageNum = data.pageNum
      this.pageSize = data.pageSize
      this.search = data.search
      this.loading = false
    }
  }
}
