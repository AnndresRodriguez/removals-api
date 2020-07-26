import { Router, Request, Response } from "express";
import { QuotationService } from '../services';

class QuotationController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getAllQuotations(req: Request, res: Response) {

    res.json({
      data: 'dashboard user'
    })

  }

  async getQuotation(req: Request, res: Response) {
    
  }

  async createQuotation(req: Request, res: Response) {
    
  }

  async updateQuotation(req: Request, res: Response) {
    
  }

  async deleteQuotation(req: Request, res: Response) {
   
    
  }

  routes() {
    this.router.get("/", this.getAllQuotations);
    this.router.get("/:id", this.getQuotation);
    this.router.post("/", this.createQuotation);
    this.router.put("/", this.updateQuotation);
    this.router.delete("/:id", this.deleteQuotation);
  }
}

const quotationController = new QuotationController();
export default quotationController.router;