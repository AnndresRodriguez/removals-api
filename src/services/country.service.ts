
import { Country } from "../models/country.entity";
import { getRepository } from 'typeorm';
import { City } from '../models/city.entity';

class CountryService {


  async getAllCountries() {

    const countryRepository = getRepository(Country);
    const allCountries = await countryRepository.find();
    return allCountries;

  }

  async createCountry(name: string, city: City) {

    const CountryRepository = getRepository(Country);
    const newCountry = CountryRepository.create({ name });
    newCountry.city = city;
    return await newCountry.save();
    
  }

}

const countryService = new CountryService();
export default countryService;