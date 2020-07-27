import { Router, Request, Response } from "express";
import { QuotationService } from "../services";
import _ from "lodash";
import { IQuotation } from "../models/interfaces/IQuotation";
import quotationService from "../services/quotation.service";

class QuotationController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getAllQuotations(req: Request, res: Response) {
    res.json({
      data: "dashboard user",
    });
  }

  async getQuotation(req: Request, res: Response) {}

  async createQuotation(req: Request, res: Response) {
    if (_.isEmpty(req.body)) {
      res.status(204).json({ operation: false, message: "La petición a realizar se encuentra vacía", data: req.body,
      });
    } else {
      const quotation: IQuotation = req.body;
      const { operation, data, message } = await quotationService.createQuotation(quotation);
      operation
        ? res.status(200).json({ operation, message, data })
        : res.status(204).json({ operation, message });
    }
  }

  async updateQuotation(req: Request, res: Response) {}

  async deleteQuotation(req: Request, res: Response) {}

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
