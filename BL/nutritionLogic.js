// const searchController = require('../DL/controller/searchController')
const axios = require("axios");

require("dotenv").config();
const NINJA_API_KEY = process.env.NINJA_API_KEY
// console.log(NINJA_API_KEY)

const PostNutrition = require('../DL/models/nutritionModel')

async function search(query) {

    const options = {
        method: 'GET',
        url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
        params: { query },
        headers: {
            'X-RapidAPI-Key': NINJA_API_KEY,
            'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
        }
    };

    const result = await axios.request(options)
    // .then(function (response) {
    //     console.log(response.data)
    //     // return response.data
    // }).catch(function (error) {
    //     console.error(error);
    // });
    return result.data

}

async function postIngredient(data) {
    console.log("postIngredient", data.items[0])

    const newIngredient = new PostNutrition(data.items[0])
    console.log("postIngredient newIngredient", data.items[0].name)

    const findIngredient = await PostNutrition.find({ name: data.items[0].name })

    console.log("findIngredient", findIngredient.length)

    const result = findIngredient.length === 0 ? await newIngredient.save() : console.log(data.items[0].name)

    console.log(result)
}

module.exports = { search, postIngredient };
