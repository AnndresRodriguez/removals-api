import { Router, Request, Response } from "express";
import { QuotationService } from "../services";
import _ from "lodash";
import { IQuotation } from "../models/interfaces/IQuotation";
import quotationService from "../services/quotation.service";
import { validateRequest, emptyProperties } from '../libs/tools';

class QuotationController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getAllQuotations(req: Request, res: Response) {
    const allQuotations  = await quotationService.getAllQuotations();
    res.json(allQuotations);
  }

  async getQuotation(req: Request, res: Response) {

    const { operation, data, message } = await quotationService.getQuotationByID(parseInt(req.params.id));
    operation
        ? res.status(200).json({ operation, message, data })
        : res.status(202).json({ operation, message });
  }

  async createQuotation(req: Request, res: Response) {
    
    const { isValidRequest, dataRequest, information } = validateRequest(req.body);

    if(!isValidRequest){
      res.status(202).json({ information, dataRequest });
    }
    else {
      const quotation: IQuotation = req.body;
      const { operation, data, message } = await quotationService.createQuotation(quotation);
      operation
        ? res.status(200).json({ operation, message, data })
        : res.status(202).json({ operation, message });
    }
  }

  async updateStatusQuotation(req: Request, res: Response) {

    const { operation, data, message } = await quotationService.updateStatusQuotation(parseInt(req.params.id));
    operation
        ? res.status(200).json({ operation, message, data })
        : res.status(202).json({ operation, message });

  }

   async updateQuotation(req: Request, res: Response) {

   }

   async deleteQuotation(req: Request, res: Response) {

    const { operation, data, message } = await quotationService.deleteQuotation(parseInt(req.params.id))
    operation
        ? res.status(200).json({ operation, message, data })
        : res.status(202).json({ operation, message });

   }

  routes() {
    this.router.get("/", this.getAllQuotations);
    this.router.get("/:id", this.getQuotation);
    this.router.post("/", this.createQuotation);
    this.router.put("/:id", this.updateStatusQuotation);
    // this.router.put("/", this.updateQuotation);
    this.router.delete("/:id", this.deleteQuotation);
  }
}

const quotationController = new QuotationController();
export default quotationController.router;
