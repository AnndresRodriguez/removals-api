
import { City } from "../models/city.entity";
import { getRepository } from 'typeorm';

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



}

const cityService = new CityService();
export default cityService;