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
        
    }
}