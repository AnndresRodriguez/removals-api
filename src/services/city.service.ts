import { City } from "../models/city.entity";
import { getRepository } from "typeorm";
import { ServiceEntity } from '../models/service.entity';
import fp from 'lodash/fp';
import _ from 'lodash';
import { HttpResponse } from '../libs/httpResponse';

class CityService {
  async getAllCities() {
    const cityRepository = getRepository(City);
    const allCities = await cityRepository.find();
    return allCities;
  }

  async createCity(name: string) {
    const cityRepository = getRepository(City);
    const newCity = cityRepository.create({ name });
    return await newCity.save();
  }

  async disableCity( id: number ){

        const httpResponse = new HttpResponse();

        if(!_.isNaN(id)){
            
            const cityRepository = getRepository(City);
            const cityToDisable = await cityRepository.findOne(id);
    
            httpResponse.errorNotFoundID('City', id)
            return httpResponse;
        }

        httpResponse.errorFormatInvalid(id);
        return httpResponse;

    }

}

const cityService = new CityService();
export default cityService;
