import Post from "../../models/post";
import mongoose from "mongoose";
import Joi from "joi";

const { ObjectId } = mongoose.Types;

export const checkObjectid = (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }
    return next();
};

export const write = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(), //필수항목
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(), // 문자열 배열
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
    });
    try {
        await post.save(); // 데이터베이스에 등록
        ctx.body = post;
    } catch (error) {
        ctx.throw(500, error);
    }
};
export const list = async (ctx) => {
    try {
        const posts = await Post.find().exec();
        ctx.body = posts;
    } catch (error) {
        ctx.throw(500, error);
    }
};

export const read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (error) {
        ctx.throw(500, error);
    }
};

export const remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch (error) {
        ctx.throw(500, error);
    }
};

export const update = async (ctx) => {
    const { id } = ctx.params;
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        }).exec();

        //post가 없으면
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (error) {
        ctx.throw(500, error);
    }
};