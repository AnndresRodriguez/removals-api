import { getRepository, getManager } from 'typeorm';
import { Quotation } from '../models/quotation.entity';

class QuotationService {

    async getAllQuotations(){

      const quotationRepository = getRepository(Quotation);
      const quotations = quotationRepository.find();
      return quotations; 
      
    }

    async createQuotation(){

      


    }



}

const quotationService = new QuotationService();
export default quotationService;
