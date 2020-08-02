import { Request, Response, Router } from 'express';
import countryService from '../services/country.service';
class CountryController {

   router: Router;

   constructor(){
       this.router = Router();
       this.routes();

   }

   async getAllCountries(req: Request, res: Response){

      const allCountries = await countryService.getAllCountries();
      res.json(allCountries);
      
   }

   routes() {
    this.router.get("/", this.getAllCountries);

    // this.router.get("/:id", this.getCountry);
    // this.router.post("/", this.createCountry);
    // this.router.put("/", this.updateCountry);
    // this.router.put("/:id", this.updateStatusCountry);
    // this.router.delete("/:id", this.deleteCountry);
  }

}

const countryController = new CountryController();
export default countryController.router;