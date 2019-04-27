/**
 *
 * By So http://sooo.site
 * -----
 *    Javascript will save your soul!
 * -----
 *
 */

export default () => ({
  Me: {
    Bio: '',
    Email: 'me@sooo.site',
    Github: 'https://github.com/Git-So'
  },
  SiteName: 'Sooo',
  ICP: '赣ICP备17016211号',
  MenuList: [
    {
      index: 'article',
      path: '/',
      title: '文章'
    },
    {
      index: 'subject',
      path: '/subject/list/1',
      title: '专题'
    },
    {
      index: 'tag',
      path: '/tag/list/1',
      title: '标签'
    },
    {
      index: 'about',
      path: '/about',
      title: '关于'
    },
    {
      index: 'link',
      path: '/link/list/1',
      title: '友链'
    }
  ],
  MenuActiveIndex: 'article',
  HeaderActiveStyle: {},
  IsHideAide: false,
  Aside: {
    isHideHot: false,
    isHideSearch: false,
    isHideEmail: false,
    isHideNav: true,
    navList: [],
    activeNav: ''
  },
  ApiCache: []
})
