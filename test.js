/**
 * 这里是测试模拟express中间件效果的代码
 */

const express = require('./like-express');
const app = express();

app.use((req, res, next) => {
  console.log("请求开始",req.method, req.url);


  next();
});

app.use((req, res, next) => {
  console.log("设置cookie");

  req.cookie = {
    userId: '123'
  };
  
  next();
});

// app.use((req, res, next) => {
//   setTimeout(() => {
//     req.body = {
//       a: 100,
//       b: 200,
//     };
//     next();
//   }, 1000);
// });

// app.use((req, res, next) => {
//     console.log("404");
  
//     res.json({
//       errno: -1,
//       data: "404 not found",
//     });
//     next()
//   });

app.use("/api", (req, res, next) => {
//   console.log(req.body);
  console.log("处理/api路由");
  next();
});
app.get("/api", (req, res, next) => {
  console.log("处理api get路由");
  next();
});

function loginCheck(req,res,next){
    setTimeout(() => {
        console.log('模拟登录成功')
        next()
    });
}

app.post("/api", (req, res, next) => {
  console.log("处理api post路由");
  next();
});
app.get("/api/get-cookie",loginCheck, (req, res, next) => {
  console.log("get 处理cookie路由");
  res.json({
    errno: 0,
    data: req.cookie
  });
});

app.post("/api/get-post-data", (req, res, next) => {
  console.log("/api/get-post-data");
  res.json({
    errno: 0,
    data: req.body
  });
});



app.listen(4000, () => {
  console.log("服务运行中，端口4000");
});
