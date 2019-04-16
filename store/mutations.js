/**
 *
 * By So http://sooo.site
 * -----
 *    Javascript will save your soul!
 * -----
 *
 */

export default {
  setMenuActiveIndex(state, index) {
    state.MenuActiveIndex = index
  },
  setCurrentMenuPath(state, path) {
    const MenuActiveIndex = state.MenuActiveIndex
    // 找到对应信息
    for (const key in state.MenuList) {
      if (state.MenuList[key].index === MenuActiveIndex) {
        state.MenuList[key].path = path
        break
      }
    }
  },
  setMeData(state, obj) {
    state.Me[obj.index] = obj.value
  },
  setIsHideAside(state, stat) {
    state.IsHideAide = stat
  },
  setShowArticleInfo(state, stat) {
    state.Aside.isHideHot = stat
    state.Aside.isHideSearch = stat
    state.Aside.isHideEmail = stat
    state.Aside.isHideNav = !stat
  },
  setArticleNav(state, data) {
    state.Aside.navList = data
  },
  setArticleActiveNav(state, data) {
    state.Aside.activeNav = data
  },
  setApiCache(state, obj) {
    state.ApiCache[obj.key] = obj.value
  }
}
