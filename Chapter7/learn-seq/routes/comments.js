const express = require('express');
const router = express.Router();
const { User, Comment } = require('../models');

// //GET /comments
// //GET /comments/id
router.get('/:id', async (req, res, next) => {
    try {
        console.log("dd : ",req.params.id)
        const comments = await Comment.findAll({
            include: {
                model: User,
                where: { id: req.params.id },
            }
        });
        res.json(comments);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// //post : 새로 생성
router.post('/', async (req, res, next) => {
    try {
        console.log("여기 : ", req.body)
        const result = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// //patch : 수정 -> /comments/id
router.patch('/:id', async (req, res, next) => {
    try {
        const result = await Comment.update({
            comment: req.body.comment,
        }, {
                where: { id: req.params.id },
            });
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// //delete /comments/id
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await Comment.destroy({
            where: { id: req.params.id },
        });
        res.json(result);
    } catch (error) {
        console.error(err);
        next(err);
    }
});

module.exports = router;