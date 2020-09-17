import { Request, Response, Router } from 'express';
import countryService from '../services/country.service';
import { ICountry } from '../models/interfaces/ICountry';
class CityController {

   router: Router;

   constructor(){
       this.router = Router();
       this.routes();

   }

   async getAllCities(req: Request, res: Response){

      const allCountries = await countryService.getAllCountries();
      res.json(allCountries);
      
   }

   async deleteCity(req: Request, res: Response){

     

   }

   async updateCity(req: Request, res: Response){

   

   }

   routes() {
    this.router.get("/", this.getAllCities);

    // this.router.get("/:id", this.getCity);
    // this.router.post("/", this.createCity);
    this.router.put("/", this.updateCity);
    // this.router.put("/:id", this.updateStatusCity);
   this.router.delete("/:id", this.deleteCity);
  }

}

const cityController = new CityController();
export default cityController.router;