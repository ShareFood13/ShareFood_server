const puppeteer = require("puppeteer");
const fs = require("fs");
const allFood = []

async function getFood(url = `https://www.goleango.com/nutrition-value.php?letter=0&food_id=`, curr = 1) {
    console.log(getFood, curr)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url + curr)
    const values = {}
    values.name = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#page_h1_title"), (e) => e.innerHTML)[0]
    })
    values.nutritionalValues = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("td")).map(x => x.textContent)
    })

    let y = {}
    for (let i = 0; i < values.nutritionalValues.length - 1; i += 2) {
        y[values.nutritionalValues[i]] = Number(values.nutritionalValues[i + 1].split(" ")[0])
    }
    values.nutritionalValues = y
    console.log(values)
    allFood.push(values)

    curr !== 2746 ? getFood(url, curr += 1) : null
    //   curr !== 2 ? getFood(url, ++curr) : null
    await browser.close()
    fs.writeFileSync("all food.json", allFood.map((o) => JSON.stringify(o)).join(',\n'));

    // fs.writeFileSync("all food.json", JSON.stringify(allFood))
}
// getFood()