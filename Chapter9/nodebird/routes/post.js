const express = require('express');
const multer = require('multer');
const path = require('path');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer({
    //options
    storage: multer.diskStorage({
        destination(req, file, cb) { //파일 저장 경로
            cb(null, 'uploads/');
        },
        filename(req, file, cb) { //파일 이름
            const ext = path.extname(file.originalname); //확장자
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        }
    }),
    limit: { filesize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

//사진을 올리지 않을 경우
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    //게시글 업로드
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if (hashtags) {
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: { title: tag.slice(1).toLowerCase() },
            })));
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//게시글 삭제
router.delete('/:id', async (req, res, next) => {
    try {
        await Post.destroy({ where: { id: req.params.id, userId: req.user.id } });
        res.send('OK');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.find({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            user: req.user,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// 좋아요
router.post('/:id/like', async (req, res, next) => {
    try {
        const post = await Post.find({ where: { id: req.params.id } });
        await post.addLiker(req.user.id);
        res.send('OK');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

//좋아요 취소
router.delete('/:id/like', async (req, res, next) => {
    try {
        const post = await Post.find({ where: { id: req.params.id } });
        await post.removeLiker(req.user.id);
        res.send('OK');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;