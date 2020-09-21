import { City } from "../models/city.entity";
import { getRepository } from "typeorm";
import { ServiceEntity } from '../models/service.entity';
import fp from 'lodash/fp';
import _ from 'lodash';
import { HttpResponse } from '../libs/httpResponse';
import { ICity } from '../models/interfaces/ICity';

class CityService {
  async getAllCities() {
    const cityRepository = getRepository(City);
    const allCities = await cityRepository.find();
    return allCities;
  }

  async createCity(name: string) {
    const httpResponse = new HttpResponse();
    const cityRepository = getRepository(City);
    const newCity = cityRepository.create({ name });
    const cityCreated =  await newCity.save();
    httpResponse.create('City', cityCreated);
    return httpResponse;
  }

  async disableCity( id: number ){

        const httpResponse = new HttpResponse();

        if(!_.isNaN(id)){
            
            const cityRepository = getRepository(City);
            const cityToDisable = await cityRepository.findOne(id);
            if(cityToDisable != undefined){
              cityRepository.remove(cityToDisable);
              httpResponse.delete('City', cityToDisable);
              return httpResponse;
            }
              
            httpResponse.errorNotFoundID('City', id)
            return httpResponse;
        }

        httpResponse.errorFormatInvalid(id);
        return httpResponse;

  }

  async updateCity(id: number, newDataCity: ICity ){

    const httpResponse = new HttpResponse();

    if(!_.isNaN(id)){
            
            const cityRepository = getRepository(City);
            const cityToUpdate = await cityRepository.findOne(id);
            if(cityToUpdate != undefined){
 
                cityToUpdate.status = newDataCity.status;
                cityToUpdate.name = newDataCity.name;
                const cityUpdated = await cityToUpdate.save();
                httpResponse.update('City', cityUpdated);
                return httpResponse;
                
            }
              
            httpResponse.errorNotFoundID('City', id)
            return httpResponse;
    }

    httpResponse.errorFormatInvalid(id);
    return httpResponse;

  }

}

const cityService = new CityService();
export default cityService;
