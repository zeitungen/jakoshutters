const Koa = require("koa");
const serve = require("koa-static");

const app = new Koa();

app.use(serve("./static"));

app.listen(3000);