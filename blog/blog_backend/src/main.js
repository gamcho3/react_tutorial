require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import api from "./api";

const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("connect mongodb");
    })
    .catch((e) => {
        console.error(e);
    });

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log(`Server is running on port ${PORT}`);
});
