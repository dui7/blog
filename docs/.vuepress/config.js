const barHelper = require('./utils/barHelper.js');

module.exports = {
    title: ' ',
    description: ' ',
    head: [
        ['link', {rel: 'icon', href: '/assets/img/photo.jpg'}],
    ],
    base: '/',
    markdown: {
        lineNumbers: true // 代码块是否显示行号
    },
    themeConfig: {
        logo: '/assets/img/photo.jpg',
        // nav: [
        //     {
        //         text: '导航1', link: '/nav.10./*.md'
        //     },
        //     {
        //         text: 'Java',
        //         items: [
        //             {
        //                 text: '下拉1',
        //                 link: '/nav.10./*.md'
        //             }]
        //     }
        // ],
        nav: [
        ],

        docsDir: '/',
        // lastUpdated: 'Last Updated',
    },
    plugins: [
        // ['cursor-effects', {
        //     size: 2, // size of the particle, default: 2
        //     shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
        //     zIndex: 999999999, // z-index property of the canvas, default: 999999999
        // }],
        ["vuepress-plugin-nuggets-style-copy", {
            copyText: "复制代码",
            tip: {
                content: "复制成功"
            }
        }],
        // [
        //     '@vuepress-reco/vuepress-plugin-kan-ban-niang',
        //     {
        //         theme: ['blackCat'],
        //         clean: true,
        //     }
        // ],
        'permalink-pinyin',
        ['autobar', {'pinyinNav': true}],
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
