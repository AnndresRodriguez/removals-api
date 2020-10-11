import { Router, Request, Response } from "express";
import service from "../services/service.service";

import { validateRequest } from '../libs/tools';

class ServiceController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getAllServices(req: Request, res: Response) {
    const { operation, message, data }  = await service.getAllServices();
    operation
        ? res.status(200).json({ operation, message, data })
        : res.status(202).json({ operation, message });
    
  }

  async getService(req: Request, res: Response) {}

  async createService(req: Request, res: Response) {

    const { isValidRequest, dataRequest, information } = validateRequest(req.body);

    if(!isValidRequest){
      res.status(202).json({information, dataRequest});
    }else {
      const { operation, message, data } = await service.createService(req.body.name);
      operation
        ? res.status(200).json({ operation, message, data })
        : res.status(202).json({ operation, message });
    }

  }

  async updateService(req: Request, res: Response) {

    const { isValidRequest, dataRequest, information } = validateRequest(req.body);

    if(!isValidRequest){
      res.status(202).json({information, dataRequest});
    }else {
      const { operation, message, data } = await service.updateService(parseInt(req.body.id), req.body.name);
      operation
        ? res.status(200).json({ operation, message, data })
        : res.status(202).json({ operation, message });
    }

  }

  async updateStatus(req: Request, res: Response) {

     const { operation, message, data } =  await service.updateStatusService(parseInt(req.params.id));
     operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });

  }
  async deleteService(req: Request, res: Response) {

    const { operation, message, data } =  await service.deleteService(parseInt(req.params.id));
     operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });
    
  }

  routes() {
    this.router.get("/", this.getAllServices);
    this.router.get("/:id", this.getService);
    this.router.post("/", this.createService);
    this.router.put("/", this.updateService);
    this.router.put("/:id", this.updateStatus);
    this.router.delete("/:id", this.deleteService);
  }
}

const serviceController = new ServiceController();
export default serviceController.router;
