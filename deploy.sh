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

# 如果你想要部署到 https://<TOKEN><USERNAME>.github.io
git push -f https://ghp_pb0wbRr1mchbXei2345AUVFfg5k2Cp1C7sMn@github.com/fentiaozi/fentiaozi.github.io.git master

cd -
