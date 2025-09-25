const axios = require("axios");

export default async function fetchCountries() {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=area,capital,currencies,languages,name,population"
    );
    //largest area
    const largestArea = Math.max(...response.map((item: any) => item.area));
    //highest population
    const maxPopulation = Math.max(
      ...response.map((item: any) => item.population)
    );
    //more than one currency
    const moreThanOneCurrency = response.find((el: any) => el.currencies > 1);
    //more than one language
    const moreThanOneLanguage = response.find((el: any) => el.languages > 1);

    console.log(
      "largest area : ",
      largestArea,
      "largest population : ",
      maxPopulation,
      "more than one currency : ",
      moreThanOneCurrency,
      "more than one language : ",
      moreThanOneLanguage
    );
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
