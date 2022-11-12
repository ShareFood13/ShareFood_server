const express = require('express')
const router = express.Router()

const recipesController = require('../DL/controllers/recipesController.js')

const { auth } = require('../middleware/auth.js')

router.post('/', auth, recipesController.createRecipe)
router.get('/:id', auth, recipesController.getMyRecipes)
// router.get('/', recipesController.getRecipes)
// router.put('/updateRecipe', auth, recipesController.updateRecipe)
// router.delete('/delRecipe', auth, recipesController.delRecipe)

////////
// router.get("/search", postController.getPostsBySearch)
// router.get("/creator", postController.getPostsByCreator);
// router.get("/", postController.getPosts)
// router.get("/:id", postController.getPost)

// router.post("/", auth, postController.createPost)
// router.patch("/:id", auth, postController.updatePost)
// router.delete("/:id", auth, postController.deletePost)
// router.patch("/:id/likePost", auth, postController.likePost)
// router.post('/:id/commentPost',auth, postController.commentPost)

module.exports = router