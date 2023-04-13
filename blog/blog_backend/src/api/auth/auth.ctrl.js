import Joi from "joi";
import User from "../../models/user";
export const register = async (ctx) => {
    //request 스키마로 생성
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { username, password } = ctx.request.body;

    try {
        const exists = await User.findByUsername(username);

        //계정이 존재할경우
        if (exists) {
            ctx.status = 409;
            return;
        }
        //user 인스턴스 생성
        const user = new User({
            username,
        });
        //패스워드 설정
        await user.setPassword(password);
        await user.save();
        //user이름만 리턴
        ctx.body = user.serialize();
        //token생성
        const token = user.generateToken();

        //token 쿠키에 저장
        ctx.cookies.set("access_token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httponly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const login = async (ctx) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.status = 401;
        return;
    }

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            ctx.status = 401;
            return;
        }

        const vaild = await user.checkPassword(password);
        if (!vaild) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();

        const token = user.generateToken();

        //token 쿠키에 저장
        ctx.cookies.set("access_token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httponly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const check = async (ctx) => {
    const { user } = ctx.state;
    if (!user) {
        //로그인중 아님
        ctx.status = 401;
        return;
    }
    ctx.body = user;
};

export const logout = async (ctx) => {
    ctx.cookies.set("access_token");
    ctx.status = 204;
};
