import { Request, Response, Router } from "express";
import { IContact } from "../models/interfaces/IContact";
import contactService from "../services/contact.service";
import _ from "lodash";
import { validateRequest } from '../libs/tools';

class ContactController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getAllContacts(req: Request, res: Response) {
    const allContacts = await contactService.getAllContacts();
    res.json(allContacts);
  }

  async getContactById(req: Request, res: Response){

    const { operation, data, message } = await contactService.getContactByID(parseInt(req.params.id));
    operation
        ? res.status(200).json({ operation, data })
        : res.status(202).json({ operation, message });
  }

  async createContact(req: Request, res: Response) {
    
    const { isValidRequest, dataRequest, information } = validateRequest(req.body);
    if(!isValidRequest){
      res.status(202).json({information, dataRequest})
    }
    else{ 
      const newContact: IContact = req.body;
      const { operation, data, message } = await contactService.createContact(newContact);
      operation
        ? res.status(200).json({ operation, message, data })
        : res.status(202).json({ operation, message });
    }
  }

  async updateStatusContact(req: Request, res: Response){

    const { data, message, operation } = await contactService.updateContact(parseInt(req.params.id));
    operation
      ? res.status(200).json({ operation, message, data })
      : res.status(202).json({ operation, message });

  }

 
  routes() {
    this.router.get("/", this.getAllContacts);
    this.router.get("/:id", this.getContactById);
    this.router.post("/", this.createContact);
    this.router.put("/:id", this.updateStatusContact);
    // this.router.put("/", this.updateContact);
    // this.router.delete("/:id", this.deleteContact);
  }
}

const contactController = new ContactController();
export default contactController.router;
