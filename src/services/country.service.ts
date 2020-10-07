
import { Country } from "../models/country.entity";
import { getRepository } from 'typeorm';
import { City } from '../models/city.entity';
import fp from 'lodash/fp';
import _ from 'lodash';
import { HttpResponse } from '../libs/httpResponse';
import { ICountry } from '../models/interfaces/ICountry';

class CountryService {


  async getAllCountries() {

    const httpResponse = new HttpResponse();
    const countryRepository = getRepository(Country);
    const allCountries = await countryRepository.find();

    if(!_.isEmpty(allCountries)){
        httpResponse.findAll(allCountries);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;

  }

  async getCountry(id: number) {
    const httpResponse = new HttpResponse();

    if (!_.isNaN(id)) {
      const countryRepository = getRepository(Country);
      const countryFinded = await countryRepository.findOne(id);
      if (countryFinded != undefined) {
         httpResponse.findOne(countryFinded);
         return httpResponse;
      }
      
      httpResponse.errorNotFoundID("Country", id);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(id);
    return httpResponse;
  }

  async createCountry(name: string, city: City) {

    const httpResponse = new HttpResponse();

    if(name != "" && !_.isEmpty(city)){

      const CountryRepository = getRepository(Country);
      const newCountry = CountryRepository.create({ name });
      newCountry.city = city;
      const cityCreated = await newCountry.save();
      httpResponse.create('Country', cityCreated);
      return httpResponse;
    }

    httpResponse.errorEmptyObject({ name, city })
    return httpResponse;
    
    
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

  async updateCountry(id: number, dataNewCountry: ICountry){

    const httpResponse = new HttpResponse();

    if(!_.isNaN(id)){
            
            const countryRepository = getRepository(Country);
            const countryToUpdate = await countryRepository.findOne(id);
            if(countryToUpdate != undefined && dataNewCountry != undefined){

              countryToUpdate.name = dataNewCountry.name;
              countryToUpdate.status = dataNewCountry.status;
              let countryUpdated = await countryToUpdate.save();
              httpResponse.update('Country', countryUpdated);
              return httpResponse;
      
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