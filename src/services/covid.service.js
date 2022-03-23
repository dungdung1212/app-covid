 
const covidService = {
  getListOfCountriesCovid () {
    return  fetch("https://api.covid19api.com/summary")
            .then((res) => res.json()) 
  }, 
  getCountryDetailDataByCountryCode(CountryCode){
    return fetch(`https://restcountries.com/v2/alpha/${CountryCode}`)
          .then((res) => res.json()) 
  },
  getListCountryBySlug(slug){
    return fetch(`https://api.covid19api.com/country/${slug}`)
          .then((res)=>res.json())
  }
};

export default covidService;
