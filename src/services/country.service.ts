
import { Country } from "../models/country.entity";
import { getRepository } from 'typeorm';
import { City } from '../models/city.entity';
import fp from 'lodash/fp';
import _ from 'lodash';
import { HttpResponse } from '../libs/httpResponse';

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

  async deleteCountry(id: number) {

    const httpResponse = new HttpResponse();

        if(!_.isNaN(id)){
            
            const countryRepository = getRepository(Country);
            const countrytoDelete = await countryRepository.findOne(id);
            if(countrytoDelete != undefined){
              countryRepository.remove(countrytoDelete);
            }

    
            httpResponse.errorNotFoundID('Service', id)
            return httpResponse;
        }

        httpResponse.errorFormatInvalid(id);
        return httpResponse;
    
  }

  async updateCountry(id: number, dataNewCountry: object){

    const httpResponse = new HttpResponse();

    if(!_.isNaN(id)){
            
            const countryRepository = getRepository(Country);
            const countryToUpdate = await countryRepository.findOne(id);
            if(countryToUpdate != undefined){

                
                
            }
              
            httpResponse.errorNotFoundID('City', id)
            return httpResponse;
    }

    httpResponse.errorFormatInvalid(id);
    return httpResponse;



  }

}

const countryService = new CountryService();
export default countryService;