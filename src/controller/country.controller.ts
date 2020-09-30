import { Request, Response, Router } from 'express';
import countryService from '../services/country.service';
import { ICountry } from '../models/interfaces/ICountry';
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

   async deleteCountry(req: Request, res: Response){

      const { data, message, operation } = await countryService.deleteCountry(parseInt(req.params.id));
      operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });

   }

   async getCountry(req: Request, res: Response){

     const { data, message, operation } = await countryService.getCountry(parseInt(req.params.id));
      operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });
     
   }

   async updateCountry(req: Request, res: Response){

      const dataCountry: ICountry = req.body;   
   
      const { data, message, operation } = await countryService.updateCountry(parseInt(req.params.id), dataCountry);
      operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });

   }

   routes() {
    this.router.get("/", this.getAllCountries);

    this.router.get("/:id", this.getCountry);
    // this.router.post("/", this.createCountry);
    this.router.put("/", this.updateCountry);
    // this.router.put("/:id", this.updateStatusCountry);
   this.router.delete("/:id", this.deleteCountry);
  }

}

const countryController = new CountryController();
export default countryController.router;