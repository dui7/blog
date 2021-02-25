#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'blog.ruciya.com' > CNAME

git init
git add -A
git commit -m 'update'

# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:qq24566664/qq24566664.github.io.git  master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/vuepress.git master:master
git push -f https://github.com/qq24566664/qq24566664.github.io.git master

cd -
