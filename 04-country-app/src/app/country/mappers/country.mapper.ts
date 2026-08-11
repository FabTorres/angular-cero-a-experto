import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-country.interface";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital: restCountry.capital?.join(','),
      population: restCountry.population,
      area: restCountry.area,
      languages: restCountry.languages ? Object.values(restCountry.languages) : [],
      borders: restCountry.borders ?? [],
      region: restCountry.region,
      subregion: restCountry.subregion,
      mapsUbication: restCountry.maps.googleMaps,
      continent: restCountry.continents[0],
      currencies: restCountry.currencies ? Object.values(restCountry.currencies).map((c) => c.name) : [],
      timezone: restCountry.timezones,
      coatOfArmsSvg: restCountry.coatOfArms.svg ?? ''
    };
  }

  static mapRestCountriesToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map((rest) => CountryMapper.mapRestCountryToCountry(rest));
  }

}
