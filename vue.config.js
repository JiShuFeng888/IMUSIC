const jsdom = require("jsdom");
const { JSDOM } = jsdom;
module.exports={
    configureWebpack:{
        module: {
            rules: [
              {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    minimize:true,//进行压缩
                }
              },
            ],
          }, 
        
    },

    pluginOptions: {
      prerenderSpa: {
        registry: undefined,
        renderRoutes: [
          // '/',
          // '/recommend',
          // '/singer',
          // '/rank',
          // '/account',
          // '/detail',
          // '/search'
        ],
        useRenderEvent: true,
        headless: true,
        onlyProduction: true,
        postProcess: route => {
          // 预渲染内容写入之前的额外操作
          let reg = /<meta name="viewport".*user-scalable=no">/gi
          let res = route.html.match(reg)
          route.html = route.html.replace(res[1], '')
  
          // 1.根据字符串创建一个网页
          let html = new JSDOM(route.html)
          // 2.从创建好的网页中拿到document对象
          let dom = html.window.document
          // 3.找到对应的元素, 删除对应的元素(选择器方式匹配)
          let loadingEle = dom.querySelector('.container')
          dom.body.removeChild(loadingEle)
          //再转换为字符串
          route.html = html.serialize()
          return route
        }
      }
    }
}
