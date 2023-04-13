import Router from "koa-router";
import * as postsCtrl from "./posts.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const posts = new Router();
const post = new Router();

posts.get("/", postsCtrl.list);
//미들웨어 통해 로그인유지 검사
posts.post("/", checkLoggedIn, postsCtrl.write);

post.get("/", postsCtrl.read);
post.delete("/", checkLoggedIn, postsCtrl.remove);
post.patch("/", checkLoggedIn, postsCtrl.update);

posts.use("/:id", postsCtrl.checkObjectid, post.routes());

// posts.get("/:id", postsCtrl.read);
// posts.delete("/:id", postsCtrl.remove);
// posts.patch("/:id", postsCtrl.update);

export default posts;
