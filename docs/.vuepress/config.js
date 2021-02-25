module.exports = {
  title: '首页',
  description: ' ',
  head: [
    ['link', { rel: 'icon', href: '/assets/img/photo.jpg' }],
    // ['link', { rel: 'manifest', href: '/images/photo.jpg' }]
  ],
  base: '/',
  markdown: {
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    nav: [
      // { text: 'Blog', link: 'https://www.ruciya.com' }
    ],
    docsDir: '/',
    lastUpdated: 'Last Updated',
  },
  plugins: ['permalink-pinyin', ['autobar', {'pinyinNav': true}], 'rpurl'],
  chainWebpack: (config, isServer) => {
    const inlineLimit = 10000
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `assets/img/[name].[hash:8].[ext]`
        })
  }
}
