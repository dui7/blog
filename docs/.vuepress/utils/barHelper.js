const fs = require('fs');
var barhelper = {
// 自动获取侧边栏
    getSideBar: function (folder) {
        // 只能用绝对路径
        path = '/Users/keliang/My/vue/vuepress/note/docs/pages/' + folder + '/';
        let file_list = fs.readdirSync(path);
        for (let i = 0; i < file_list.length; i++) {
            // 可根据需求定制文件名，但是不能有.md后缀
            file_list[i] = file_list[i].slice(0, -3);
        }
        return file_list;
    },

// 自动获取导航栏
    getNav: function (folder) {
        // 只能用绝对路径
        path = '/Users/keliang/My/vue/vuepress/note/docs/pages/' + folder + '/';
        let file_list = fs.readdirSync(path);
        let nav_text = [];
        for (let i = 0; i < file_list.length; i++) {
            nav_text.push({
                // 这里也可以根据需求定制，同样不能有后缀
                text: file_list[i].slice(0, -3),
                link: '/pages/' + folder + '/' + file_list[i].slice(0, -3)
            });
        }
        return nav_text;
    }
}
module.exports = barhelper;
