import { Router, Request, Response } from "express";
import service from "../services/service.service";
// import { ServiceService } from '../services';

class ServiceController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getAllServices(req: Request, res: Response) {
    const allServices = await service.getAllServices();
    res.json(allServices);
  }

  async getService(req: Request, res: Response) {}

  async createService(req: Request, res: Response) {
    const { operation, message, data } = await service.createService(
      req.body.name
    );
    operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });
  }

  async updateService(req: Request, res: Response) {

    const { operation, message, data } = await service.updateService(parseInt(req.body.id), req.body.name);
    operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });
  }

  async updateStatus(req: Request, res: Response) {
     const { operation, message, data } =  await service.updateStatusService(parseInt(req.params.id));
     operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });

  }
  async deleteService(req: Request, res: Response) {}

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
