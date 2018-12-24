var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const comments = await Comment.find({ commenter: req.params.id }).populate('commenter')
        res.json(comments);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const comment = new Comment({
            commenter: req.body.id,
            comment: req.body.comment,
        });

        const result = await comment.save();
        res.status(201).json(result);
        return Comment.populate(result, { path: 'commenter' });

    } catch (error) {
        console.error(err);
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const result = await Comment.update({ _id: req.params.id }, { comment: req.body.comment })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await Comment.remove({ _id: req.params.id })
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;