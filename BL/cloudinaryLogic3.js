const mongoose = require("mongoose")
const fs = require('fs')
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
    // var newRecipe = {}
    // var arrayLength = recipe.recipePicture.length
    // const picturesList = { normal: [], small: [] }

    // console.log(recipe.recipePicture)


    for (const file of recipe.recipePicture) {
        // fazer upload da imagem em tamanho normal
        console.log(file.path)
        // obter o nome do arquivo a partir do caminho
        const fileName = path.basename(file.path);

        // criar um objeto stream a partir do arquivo
        const stream = fs.createReadStream(file.path);

        let buffer = '';

        stream.on('data', function (chunk) {
            buffer += chunk;
        });

        stream.on('end', function () {
            // fazer upload da imagem
            cloudinary.uploader.upload(buffer,
                {
                    public_id: fileName,
                    folder: 'imagens',
                    tags: 'vinculadas'
                },
                (error, result) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log(result);
                    }
                }
            )
        })
    }

    //     const resultNormal = await cloudinary.uploader.upload({
    //         folder: 'sharefood_test',
    //         public_id: `${fileName}_normal`,
    //         transformation: [
    //             { width: 315, height: 210, crop: 'fill' }
    //         ],
    //     }).end(stream);
    //     console.log(resultNormal)
    //     picturesList['normal'].push(resultNormal.secure_url);

    //     // fazer upload da imagem em tamanho small
    //     const resultSmall = await cloudinary.uploader.upload_stream({
    //         folder: 'sharefood_test',
    //         public_id: `${fileName}_small`,
    //         transformation: [
    //             { width: 140, height: 90, crop: 'fill' }
    //         ]
    //     }).end(stream);
    //     console.log(resultSmall)

    //     picturesList['small'].push(resultSmall.secure_url);

    //     arrayLength--
    //     if (arrayLength === 0) {
    //         // console.log("picturesList", picturesList)
    //         newRecipe = new PostRecipe({ ...recipe, recipePicture: picturesList })
    //     }
    // }
    // console.log("Cloudinary Logic NewRecipe", newRecipe)
    // return newRecipe
}

async function deleteFromCloudinary(cloudinaryToDelete) {
    console.log("cloudinaryLogic deleteFromCloudinary", cloudinaryToDelete)

    for (const path of cloudinaryToDelete) {
        console.log("cloudinaryLogic deleteFromCloudinary", path)

        // Extrair o public_id da URL
        // var publicId = path.match(/upload\/([^\/]+)\.\w+/)[1];

        var publicId = path.slice(62).split(".")[0];
        // https://res.cloudinary.com/dqnf2qxk8/image/upload/v1682271437/sharefood_test/w3ezgaqfyypdkbd5wy1i.jpg
        console.log("cloudinaryLogic deleteFromCloudinary", publicId)

        // Excluir a imagem com o public_id extraído
        cloudinary.uploader.destroy(publicId, (error, result) => {
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


module.exports = { uploadToCloudinary, deleteFromCloudinary }