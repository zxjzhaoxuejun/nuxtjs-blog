FROM node:14.8.0
MAINTAINER zxj
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /nuxt
COPY . /nuxt
WORKDIR /nuxt
EXPOSE 3000
#If the environment in China build please open the following comments
#如果在中国环境下构建请把下面注释打开
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
#RUN npm run build
CMD ["npm", "start"]
