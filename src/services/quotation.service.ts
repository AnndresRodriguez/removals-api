import { getRepository, getManager, getConnection } from "typeorm";
import { Quotation } from "../models/quotation.entity";
import { IQuotation } from "../models/interfaces/IQuotation";
import _ from 'lodash';
import cityService from "./city.service";
import countryService from "./country.service";
import { sendMail } from "../libs/mail";
import { HttpResponse } from '../libs/httpResponse';

class QuotationService {
  async getAllQuotations() {
    const quotations = await getRepository(Quotation)
    .createQueryBuilder("quotation")
    .innerJoinAndSelect("quotation.services", "service")
    .getMany();

    return quotations;    

  }

  async createQuotation(quotation: IQuotation) {

    const httpResponse = new HttpResponse();
    const quotationRepository = getRepository(Quotation);
    const newQuotation = quotationRepository.create({
      name_user: quotation.name,
      mail_user: quotation.mail,
      description: quotation.description,
      phone_user: quotation.phone,
    });

    const cityOrigin = await cityService.createCity(quotation.origin[1]);
    const countryOrigin = await countryService.createCountry(quotation.origin[0], cityOrigin);
    const cityDestination = await cityService.createCity(quotation.destination[1]);
    const countryDestination = await countryService.createCountry(quotation.destination[0],cityDestination);

    newQuotation.origin = countryOrigin;
    newQuotation.destination = countryDestination;

    const {name_user, mail_user, description, phone_user, origin, destination, id} = await newQuotation.save();

    quotation.services.map(async (idService) => {
      await getConnection()
        .createQueryBuilder()
        .relation(Quotation, "services")
        .of(id)
        .add(idService);
    });

    // sendMail(quotation.mail, quotation.name);

    httpResponse.create('Quotation', { name_user, mail_user, description, phone_user, origin, destination} )
    return httpResponse;
  }

  async updateStatusQuotation(idQuotation: number) {

    const httpResponse = new HttpResponse();
    if(!_.isNaN(idQuotation)){
      const quotationRepository = getRepository(Quotation);
      const quotationToUpdate = await quotationRepository.findOne(idQuotation);
      if (quotationToUpdate !== undefined) {
        quotationToUpdate.status = quotationToUpdate.status == 0 ? quotationToUpdate.status = 1 : quotationToUpdate.status = 0;
        quotationToUpdate.updatedAt = new Date();
        const { id, status } =  await quotationToUpdate.save(); 
        httpResponse.create('Quotation', { id, status });
        return httpResponse;
      }
      httpResponse.errorNotFoundID('Quotation',idQuotation);
      return httpResponse;
    }
    httpResponse.errorFormatInvalid(idQuotation);
    return httpResponse;

  }

  async getQuotationByID(idQuotation: number){

    const httpResponse = new HttpResponse();
    if(!_.isNaN(idQuotation)){

      const quotation = await Quotation.findQuotationByID(idQuotation);

      if(quotation !== undefined){
        const { id, name_user, mail_user, phone_user, origin, destination, services, description, createdAt } = quotation;
        httpResponse.findOne({ id, name_user, mail_user, phone_user, origin, destination, services, description, createdAt });
        return httpResponse;
      }

      httpResponse.errorNotFoundID('Quotation', idQuotation);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(idQuotation);
    return httpResponse;

  }
}

const quotationService = new QuotationService();
export default quotationService;
