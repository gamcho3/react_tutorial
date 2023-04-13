const checkLoggedIn = (ctx, next) => {
    //로그인 상태가 아닐때
    if (!ctx.state.user) {
        ctx.status = 401;
        return;
    }
    return next();
};

export default checkLoggedIn;
