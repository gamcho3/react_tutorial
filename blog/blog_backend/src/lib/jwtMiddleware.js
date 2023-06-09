import jwt from "jsonwebtoken";
import User from "../models/user";
const jwtMiddleware = async (ctx, next) => {
    //저장된 쿠키에서 토큰 가져오기
    const token = ctx.cookies.get("access_token");
    //토큰 없을경우 다음으로
    if (!token) return next();
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //state에 user라는 배열 생성 후 넣기
        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username,
        };

        const now = Math.floor(Date.now() / 1000);

        //남은 유효기간이 3.5미만
        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            ctx.cookies.set("access_token", token, {
                maxAge: 1000 * 60 * 60 * 24 * 7, //7일
                httpOnly: true,
            });
            console.log(token);
        }

        return next();
    } catch (error) {
        //검증실패
        return next();
    }
};

export default jwtMiddleware;
