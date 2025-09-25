"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=area,capital,currencies,languages,name,population");
        //largest area
        const largestArea = Math.max(...response.map((item) => item.area));
        //highest population
        const maxPopulation = Math.max(...response.map((item) => item.population));
        //more than one currency
        const moreThanOneCurrency = response.find((el) => el.currencies > 1);
        //more than one language
        const moreThanOneLanguage = response.find((el) => el.languages > 1);
        console.log("largest area : ", largestArea, "largest population : ", maxPopulation, "more than one currency : ", moreThanOneCurrency, "more than one language : ", moreThanOneLanguage);
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
    }
}
exports.default = fetchCountries;
//# sourceMappingURL=fetchCountries.js.map