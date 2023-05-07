const mongoose = require("mongoose")
const path = require('path')

const PostRecipe = require('../DL/models/recipeModel.js')

// const userModel = require("../../DL/models/userModel")

require("dotenv").config();

const cloudinary = require('cloudinary').v2;
// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

async function uploadToCloudinary(recipe) {
    var newRecipe = {}
    var arrayLength = recipe.recipePicture.length
    const picturesList = { normal: [], small: [] }
    // console.log("uploadToCloudinary")

    for (const file of recipe.recipePicture) {
        // console.log(file.path)

        if (!file.path.includes("cloudinary")) {

            const fileName = path.basename(file.path).split(".")[0]


            // fazer upload da imagem em tamanho normal
            const resultNormal = await cloudinary.uploader.upload(`${file.base64}`, {
                folder: `sharefood_test/${recipe.creator}`,
                // public_id: `${recipe.recipeName}_${arrayLength}_normal`,
                public_id: `${fileName}_normal`,
                tags: [recipe.recipeName, 'normal'],
                transformation: [
                    { width: 315, height: 210, crop: 'fill' }
                ],


            });

            picturesList['normal'].push(resultNormal.secure_url);

            // fazer upload da imagem em tamanho small
            const resultSmall = await cloudinary.uploader.upload(`${file.base64}`, {
                folder: `sharefood_test/${recipe.creator}`,
                // public_id: `${recipe.recipeName}_${arrayLength}_small`,
                public_id: `${fileName}_small`,
                tags: [recipe.recipeName, 'small'],
                transformation: [
                    { width: 140, height: 90, crop: 'fill' }
                ]
            });

            picturesList['small'].push(resultSmall.secure_url);
        } else {
            picturesList['normal'].push(file.path);
            picturesList['small'].push(file.path.replace('_normal.jpg', '_small.jpg'));
        }
        arrayLength--
        // console.log("arrayLength", arrayLength)
        // if (arrayLength === 0) {
        //     // console.log("picturesList", picturesList)
        //     console.log("test2")
        //     newRecipe = new PostRecipe({ ...recipe, recipePicture: picturesList })
        // }
    }

    newRecipe = new PostRecipe({ ...recipe, recipePicture: picturesList })

    // console.log("Cloudinary Logic NewRecipe", newRecipe)
    return newRecipe
}

async function deleteFromCloudinary(cloudinaryToDelete) {
    // console.log("cloudinaryLogic deleteFromCloudinary", cloudinaryToDelete)

    for (const item of cloudinaryToDelete) {
        // console.log("cloudinaryLogic deleteFromCloudinary", item)

        const parsedPath = path.parse(item);
        const folderPath = parsedPath.dir.split('/').slice(7).join('/');
        const filename = parsedPath.name.split('_')[0];

        const publicId = `${folderPath}/${filename}`;

        // console.log(publicId);

        // console.log("cloudinaryLogic deleteFromCloudinary", publicId)

        // Excluir a imagem com o public_id extraído
        cloudinary.uploader.destroy(`${publicId}_normal`, (error, result) => {
            console.log(result, error);
        });
        cloudinary.uploader.destroy(`${publicId}_small`, (error, result) => {
            console.log(result, error);
        });
    }

    // cloudinaryToDelete.map(item => cloudinary.uploader.destroy(item.match(/upload\/([^\/]+)\//)[1]),
    //     (error, result) => {
    //         console.log(result, error);
    //     });

    // const imageUrl = 'https://res.cloudinary.com/dqnf2qxk8/image/upload/v1681851707/sharefood_test/ekvsddeunclorack02qw.jpg';

    // // Extrair o public_id da URL
    // const publicId = imageUrl.match(/upload\/([^\/]+)\//)[1];

    // // Excluir a imagem com o public_id extraído
    // cloudinary.uploader.destroy(publicId, (error, result) => {
    //     console.log(result, error);
    // });
}
// const cloudinaryToDelete = [
//     'https://res.cloudinary.com/dqnf2qxk8/image/upload/v1682357010/sharefood_test/Shleper/1ba21681-09c9-4556-ba20-6ea77b9b0a23_normal.jpg'
// ]
// deleteFromCloudinary(cloudinaryToDelete)
module.exports = { uploadToCloudinary, deleteFromCloudinary }