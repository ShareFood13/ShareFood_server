// sugar_g:2.6
// fiber_g:1.2
// serving_size_g:100
// sodium_mg:4
// name:"tomato"
// potassium_mg:23
// fat_saturated_g:0
// fat_total_g:0.2
// calories:18.2
// cholesterol_mg:0
// protein_g:0.9
// carbohydrates_total_g:3.9

const mongoose = require('mongoose')

const nutritionSchema = new mongoose.Schema({
    sugar_g: { type: Number },
    fiber_g: { type: Number },
    serving_size_g: { type: Number },
    sodium_mg: { type: Number },
    name: {
        type: String,
        unique: true
    },
    potassium_mg: { type: Number },
    fat_saturated_g: { type: Number },
    fat_total_g: { type: Number },
    calories: { type: Number },
    cholesterol_mg: { type: Number },
    protein_g: { type: Number },
    carbohydrates_total_g: { type: Number },
})

const PostNutrition = mongoose.model("PostNutrition", nutritionSchema)
module.exports = PostNutrition