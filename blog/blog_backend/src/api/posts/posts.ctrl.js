import Post from "../../models/post";
import mongoose from "mongoose";
import Joi from "joi";

const { ObjectId } = mongoose.Types;

//작성자가 자신의 포스트를 찾는지 확인
export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
};

export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }
    try {
        //post검색
        const post = await Post.findById(id);
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    } catch (error) {}
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
        user: ctx.state.user,
    });
    try {
        await post.save(); // 데이터베이스에 등록
        ctx.body = post;
    } catch (error) {
        ctx.throw(500, error);
    }
};
export const list = async (ctx) => {
    const page = parseInt(ctx.query.page || "1", 10);

    if (page < 1) {
        ctx.status = 400;
        return;
    }

    const { tag, username } = ctx.query;

    //tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음

    const query = {
        ...(username ? { "user.username": username } : {}),
        ...(tag ? { tags: tag } : {}),
    };

    try {
        const posts = await Post.find(query)
            .sort({ _id: -1 })
            .limit(10)
            .skip((page - 1) * 10)
            .lean()
            .exec();
        const postCount = await Post.countDocuments().exec();
        //header 세팅하기
        ctx.set("Last-Page", Math.ceil(postCount / 10));
        ctx.body = posts.map((post) => ({
            ...post,
            body:
                post.body.length < 200
                    ? post.body
                    : `${post.body.slice(0.2)}....`,
        }));
    } catch (error) {
        ctx.throw(500, error);
    }
};

export const read = async (ctx) => {
    try {
        ctx.body = ctx.state.post;
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
