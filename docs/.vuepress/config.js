const getConfig = require("vuepress-bar");
const options = {
    maxLevel: 2,
    multipleSideBar: true,
    addReadMeToFirstGroup: false,
    pinyinNav: true
  };
  
// const { nav, sidebar } = getConfig();
const { nav, sidebar } = getConfig(options); // Use default location of `.vuepress`: `${__dirname}/..`

module.exports = {
    title: ' ',
    description: ' ',
    head: [
        ['link', {rel: 'icon', href: '/assets/img/photo.jpg'}],
        ["meta", {"http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate"}],
        ["meta", {"http-equiv": "Pragma", content: "no-cache"}],
        ["meta", {"http-equiv": "Expires", content: "0"}],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}]
    ],
    base: '/',
    markdown: {
        lineNumbers: true // 代码块是否显示行号
    },
    themeConfig: {
        nav, 
        sidebar: filterBlank(sidebar),
        logo: '/assets/img/photo.jpg',
        docsDir: '/',
        // lastUpdated: 'Last Updated',
    },
    plugins: [
        // ['cursor-effects', {
        //     size: 2, // size of the particle, default: 2
        //     shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
        //     zIndex: 999999999, // z-index property of the canvas, default: 999999999
        // }],
        // [
        //     '@vuepress-reco/vuepress-plugin-kan-ban-niang',
        //     {
        //         theme: ['blackCat'],
        //         clean: true,
        //     }
        // ],
        ["vuepress-plugin-nuggets-style-copy", {
            copyText: "复制代码",
            tip: {
                content: "复制成功"
            }
        }],
        'permalink-pinyin',
        'rpurl'
    ],
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            const dateTime = new Date().getTime();

            // 清除js版本号
            config.output.filename('assets/js/cg-[name].js?v=' + dateTime).end();
            config.output.chunkFilename('assets/js/cg-[name].js?v=' + dateTime).end();

            // 清除css版本号
            config.plugin('mini-css-extract-plugin').use(require('mini-css-extract-plugin'), [{
                filename: 'assets/css/[name].css?v=' + dateTime,
                chunkFilename: 'assets/css/[name].css?v=' + dateTime
            }]).end();

        }
    },
}

//把空的README.md不显示在侧边栏
function filterBlank(sideBardto) {
    Object.keys(sideBardto).forEach((key) =>
        sideBardto[key] = sideBardto[key].filter(Boolean)
    );

    return sideBardto
}