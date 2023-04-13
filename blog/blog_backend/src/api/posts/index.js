import Router from "koa-router";
import * as postsCtrl from "./posts.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const posts = new Router();
const post = new Router();

posts.get("/", postsCtrl.list);
//미들웨어 통해 로그인유지 검사
posts.post("/", checkLoggedIn, postsCtrl.write);

post.get("/", postsCtrl.read);
//삭제하거나 수정할떄 내 포스트인지 검사하는 미들웨어 적용
post.delete("/", checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch("/", checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.use("/:id", postsCtrl.getPostById, post.routes());

// posts.get("/:id", postsCtrl.read);
// posts.delete("/:id", postsCtrl.remove);
// posts.patch("/:id", postsCtrl.update);

export default posts;
