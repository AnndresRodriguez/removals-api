import { Request, Response, Router } from 'express';
import cityService from '../services/city.service';
import { ICity } from '../models/interfaces/ICity';
class CityController {

   router: Router;

   constructor(){
       this.router = Router();
       this.routes();

   }

   async getAllCities(req: Request, res: Response){
      
   }

   async deleteCity(req: Request, res: Response){

    const { operation, message, data } =  await cityService.disableCity(parseInt(req.params.id));
    operation
     ? res.status(200).json({ operation, message, data })
     : res.status(202).json({ operation, message });

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