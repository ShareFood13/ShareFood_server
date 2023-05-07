const express = require('express')
const router = express.Router()

const shopListsController = require('../DL/controllers/shopListController.js')

const { auth } = require('../middleware/auth.js')

router.post('/save', auth, shopListsController.saveShopList)
router.patch("/update/:_id", auth, shopListsController.updateShopList)
router.get('/getall/:_id', auth, shopListsController.getAllShopList)
router.get('/getshoplist/:listId', auth, shopListsController.getShopList)
router.delete("/getshoplist/:listId", auth, shopListsController.delShopList)

module.exports = router

