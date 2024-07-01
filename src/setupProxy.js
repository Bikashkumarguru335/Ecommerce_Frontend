  const {createProxyMiddleware}=require("http-proxy-middleware");

  module.exports=function(app){
      app.use('/api/v1',createProxyMiddleware({target:"http://localhost:4007",changeOrigin:true}))
      } 
  // //     //"https://mern-11-cq3g.onrender.com"