const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        //{ id : 1, name : zero, age : 25 }
        done(null, user.id); //무거우니까 고유 값만 저장
    });

    passport.deserializeUser((id, done) => {
        // 1 -> 완전한 객체로 만듦 -> req.user
        User.find({
            where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
};