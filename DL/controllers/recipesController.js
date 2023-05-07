const mongoose = require("mongoose")

const PostRecipe = require('../models/recipeModel.js')

const userModel = require("../../DL/models/userModel")

const cloudinaryLogic = require("../../BL/cloudinaryLogic")

const createRecipe = async (req, res) => {

    const recipe = req.body

    // const newRecipe = recipe.recipePicture.length === 0 ? {...recipe} : await cloudinaryLogic.uploadToCloudinary(recipe)
    const newRecipe = await cloudinaryLogic.uploadToCloudinary(recipe)

            try {

                // console.log("createRecipe", newRecipe)
                
                const result = await newRecipe.save()
                // const result = await PostRecipe.insertOne(newRecipe)
                
                console.log(result)
                
                // funciona nao apaga
                // await userModel.findByIdAndUpdate(recipe.creatorId, { $push: { recipesId: { $each: [result._id] } } })//, $position: 0 

                const myRecipes = await PostRecipe.find({ creatorId: recipe.creatorId })
                
                // console.log("createRecipe", myRecipes)
                
                res.status(201).json({ recipes: myRecipes, message: "👍 Recipe Created!!!" })
            } catch (error) {

                res.status(409).json({ message: error.message })
            }
        // }
    // }

}

const getMyRecipes = async (req, res) => {

    const { id } = req.params
console.log("getMyRecipes id",id)
    try {

        const myRecipes = await PostRecipe.find({ creatorId: id })
        // const myRecipes = await PostRecipe.find({ creatorId: id },
        //     { recipeName: 1, likes: 1, specialDiet: 1, downloads: 1, prepTime: 1, cookTime: 1, "recipePicture.small": 1, _id: 1 })
console.log("getMyRecipes myRecipes",myRecipes)
        res.status(200).json({ recipes: myRecipes })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const getRecipe = async (req, res) => {

    const { id } = req.params

    try {

        const myRecipe = await PostRecipe.findOne({ _id: id },
            {"recipePicture.small": 0})

        // console.log(myRecipe)
     
        res.status(200).json({ recipe: myRecipe })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const updateRecipe = async (req, res) => {
    var newRecipePicture = {normal: [], small: []}
    const { id } = req.params
    const newRecipeForm =req.body.recipeForm
    // console.log("req.body.recipeForm.recipePicture",req.body.recipeForm)
    // console.log(req.body.cloudinaryToDelete)

    if(req.body.cloudinaryToDelete.length !== 0){
        cloudinaryLogic.deleteFromCloudinary(req.body.cloudinaryToDelete) // OK
    }

    var newRecipe = await cloudinaryLogic.uploadToCloudinary(newRecipeForm)
    // console.log("newRecipePicture newRecipe",newRecipe)

    // newRecipeForm.recipePicture.map(item => item.path.includes("cloudinary") && (newRecipePicture.normal.push(item.path), newRecipePicture.small.push(item.path.replace('_normal.jpg', '_small.jpg'))))
    // console.log("142", newRecipePicture)

    if(newRecipe.recipePicture !== undefined) {
    newRecipe = {newRecipe, recipePicture: {normal: [...newRecipe.recipePicture.normal, ...newRecipePicture.normal], small: [...newRecipe.recipePicture.small, ...newRecipePicture.small]}, _id: id}
    // console.log("147 newRecipe",newRecipe)
    } else {
        newRecipe = {newRecipeForm, recipePicture: {...newRecipePicture}, _id: id}
    }

    try {

        console.log("updatedRecipe.recipePicture",{...newRecipe.newRecipe})

        await PostRecipe.findByIdAndUpdate(id, {...newRecipe.newRecipe}, { new: true })
        
        // console.log("newRecipe.newRecipe.id",newRecipe.newRecipe.creatorId)
        
        const myRecipes = await PostRecipe.find({ creatorId: newRecipe.newRecipe.creatorId })
        
        // console.log("updateRecipe", myRecipes)
        
        res.status(200).json({ recipes: myRecipes, message: "👍 Recipe Updated!!!" })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const delRecipe = async (req, res) => {

    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No Post with That ID !!!" })

        const result = await PostRecipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

        await userModel.findByIdAndUpdate(result.creatorId, { $pull: { recipesId: result._id } })

        const myRecipes = await PostRecipe.find({ creatorId: result.creatorId })
        // console.log("delRecipe", myRecipes)

        res.status(200).json({ recipes: myRecipes, message: "👍 Recipe Deleted!!!" })
    } catch (error) {

        res.status(404).json({ message: error.message })
    }
}

const getOtherRecipes = async (req, res) => {

    try {

        const otherRecipes = await PostRecipe.find({}).sort({ date: -1 })

        console.log("getOtherRecipes otherRecipes", otherRecipes)

        res.status(200).json({ otherRecipes })
    } catch (error) {

        res.status(500).json({ message: "👎 Something went wrong!!!" })
    }
}

// createRecipe()

module.exports = { createRecipe, getMyRecipes, getRecipe, updateRecipe, delRecipe, getOtherRecipes }

    // const userInfo = await userModel.findOne({ _id: recipe.creatorId })//.populate('eventsId').populate('mealsId').populate('recipesId')
    // console.log("userInfo", userInfo)

    // createRecipe OLD
    
    // try {

    // for (const file of recipe.recipePicture) {
    //     const resN = await cloudinary.uploader.upload(`${file.base64}`,
    //         {
    //             folder: 'sharefood_test',
    //             tags: ['normal_version'],
    //             transformation: [
    //                 { width: 315, height: 210, crop: 'fill' }, //newRecipe image)//, { public_id: "olympic_flag" }
    //                 // { width: 140, height: 90, crop: 'fill' }, //myBook image

    //             ]
    //         })
    //     resN.then((data) => {
    //         // console.log(data);
    //         // console.log(data.secure_url);

    //         picturesListToUpload.push(data.secure_url)
    //         picturesList['normal'].push(data.secure_url)
    //         arrayLength--
    //         if (arrayLength === 0) {
    //             // do your thing
    //             console.log("picturesListToUpload", picturesListToUpload)
    //             // const newRecipe = { ...recipe, recipePicture: picturesListToUpload }
    //             newRecipe = { ...recipe, recipePicture: picturesListToUpload }
    //             console.log("newRecipe", newRecipe)
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }

    // for (const file of recipe.recipePicture) {
    //     const resS = await cloudinary.uploader.upload(`${file.base64}`,
    //         {
    //             folder: 'sharefood_test',
    //             tags: ['small_version'],
    //             transformation: [
    //                 // { width: 315, height: 210, crop: 'fill' }, //newRecipe image)//, { public_id: "olympic_flag" }
    //                 { width: 140, height: 90, crop: 'fill' }, //myBook image

    //             ]
    //         })
    //     resS.then((data) => {
    //         // console.log(data);
    //         // console.log(data.secure_url);

    //         picturesListToUpload.push(data.secure_url)
    //         picturesList['small'].push(data.secure_url)

    //         arrayLength--
    //         if (arrayLength === 0) {
    //             // do your thing
    //             console.log("picturesListToUpload", picturesListToUploadSmall)
    //             newRecipe = { ...newRecipe, recipePictureSmall: picturesListToUploadSmall }
    //             console.log("newRecipe", newRecipe)
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }

    // // recipe.recipePicture.forEach((picture, index) => upload(`"data:image/jpeg;base64,${picture.base64}"`, { public_id: `test${index}` }))
    // // const upload = (string) => {
    // //     console.log(string)

    ///////////
    // const res = cloudinary.uploader
    //     .upload("data:image/png;base64,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",
    //         {
    //             folder: 'sharefood_test',
    //             // public_id: "olympic_flag",
    //             transformation: [
    //                 // { width: 315, height: 210, crop: 'fill' }, //newRecipe image
    //                 // { width: 140, height: 90, crop: 'fill' }, //myBook image
    //                 { width: 140, height: 140, crop: 'fill', radius: 'max', crop: 'thumb', gravity: 'face' }, //user image
    //                 // { overlay: { font_family: 'Arial', font_size: 20, text: 'Hello, World!' }, gravity: 'south', y: 10, color: 'red', effect: 'colorize' }
    //             ]
    //         })
    // // cloudinary
    // res.then((data) => {
    //     console.log(data);
    //     console.log(data.secure_url);
    //     const newRecipe = { ...recipe, recipePicture: [data.secure_url] }
    //     console.log("newRecipe", newRecipe)
    // }).catch((err) => {
    //     console.log(err);
    // });
    /////////////////////

    ////////////
    //VELHO NAO APAGAR
    // const newRecipe = new PostRecipe({ ...recipe })

    // const result = await newRecipe.save()

    // await userModel.findByIdAndUpdate(recipe.creatorId, { $push: { recipesId: { $each: [result._id] } } })//, $position: 0 

    // const myRecipes = await PostRecipe.find({ creatorId: recipe.creatorId })

    // res.status(201).json({ recipes: myRecipes, message: "👍 Recipe Created!!!" })
    ////////////
    // } catch (error) {

    //     res.status(409).json({ message: error.message })
    // }

    ///////////

    
// require("dotenv").config();
// const cloudinary = require('cloudinary').v2;
// // Configuration 
// cloudinary.config({
//     // cloud_name: "dqnf2qxk8",
//     // api_key: "833417574655837",
//     // api_secret: "efscpB6j6x7c4Yd4j8flrjXGYNM"
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
// })
// {
//     asset_id: 'c1def89e9afde62aaeb9ecd162124aa6',
//     public_id: 'olympic_flag',
//     version: 1677780146,
//     version_id: 'b51c12bff9319df22391b155b8f6f15c',
//     signature: '7d7556bdb6f7f5ed2faf629a3a3dbc9144d5df2d',
//     width: 113,
//     height: 80,
//     format: 'png',
//     resource_type: 'image',
//     created_at: '2023-03-02T18:02:26Z',
//     tags: [],
//     bytes: 4310,
//     type: 'upload',
//     etag: '240124f1fa98fc2bd9008f888ece6d94',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/dqnf2qxk8/image/upload/v1677780146/olympic_flag.png',
////     secure_url: 'https://res.cloudinary.com/dqnf2qxk8/image/upload/v1677780146/olympic_flag.png',
//     folder: '',
//     api_key: '833417574655837'
//   }
//   https://res.cloudinary.com/dqnf2qxk8/image/upload/v1677780146/olympic_flag.png