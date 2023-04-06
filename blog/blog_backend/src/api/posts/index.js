import Router from "koa-router";
import * as postsCtrl from "./posts.ctrl";

const posts = new Router();
const post = new Router();

posts.get("/", postsCtrl.list);
posts.post("/", postsCtrl.write);

post.get("/", postsCtrl.read);
post.delete("/", postsCtrl.remove);
post.patch("/", postsCtrl.update);

posts.use("/:id", postsCtrl.checkObjectid, post.routes());

// posts.get("/:id", postsCtrl.read);
// posts.delete("/:id", postsCtrl.remove);
// posts.patch("/:id", postsCtrl.update);

export default posts;
