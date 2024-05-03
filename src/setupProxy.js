  const {createProxyMiddleware}=require("http-proxy-middleware");

  module.exports=function(app){
      app.use('/api/v1',createProxyMiddleware({target:"https://mern-11-cq3g.onrender.com",changeOrigin:true}))
      } 
      //"https://mern-11-cq3g.onrender.com"