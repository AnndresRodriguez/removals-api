import { getRepository, getManager, getConnection } from "typeorm";
import { Quotation } from "../models/quotation.entity";
import { IQuotation } from "../models/interfaces/IQuotation";
import _ from 'lodash';
import cityService from "./city.service";
import countryService from "./country.service";

import { response } from '../libs/tools';
import { sendMail } from "../libs/mail";

class QuotationService {
  async getAllQuotations() {
    const quotationRepository = getRepository(Quotation);
    const quotations = quotationRepository.find();
    return quotations;
  }

  async createQuotation(quotation: IQuotation) {

    const quotationRepository = getRepository(Quotation);
    const newQuotation = quotationRepository.create({
      name_user: quotation.name,
      mail_user: quotation.mail,
      description: quotation.description,
      phone_user: quotation.phone,
    });

    const cityOrigin = await cityService.createCity(quotation.origin[1]);
    const countryOrigin = await countryService.createCountry(
      quotation.origin[0],
      cityOrigin
    );
    const cityDestination = await cityService.createCity(
      quotation.destination[1]
    );
    const countryDestination = await countryService.createCountry(
      quotation.destination[0],
      cityDestination
    );

    newQuotation.origin = countryOrigin;
    newQuotation.destination = countryDestination;

    const {
      name_user,
      mail_user,
      description,
      phone_user,
      origin,
      destination,
      id,
    } = await newQuotation.save();

    quotation.services.map(async (idService) => {
      await getConnection()
        .createQueryBuilder()
        .relation(Quotation, "services")
        .of(id)
        .add(idService);
    });

    sendMail(quotation.mail, quotation.name);

    response.operation = true;
    response.message = `Quotation for client ${name_user} created successfully`;
    response.data = {
      name_user,
      mail_user,
      description,
      phone_user,
      origin,
      destination,
    };

    return response;
  }

  async updateStatusQuotation(idQuotation: number) {

    if(!_.isNaN(idQuotation)){
      const quotationRepository = getRepository(Quotation);
      const quotationToUpdate = await quotationRepository.findOne(idQuotation);
      if (quotationToUpdate !== undefined) {
        quotationToUpdate.status = quotationToUpdate.status == 0 ? quotationToUpdate.status = 1 : quotationToUpdate.status = 0;
        quotationToUpdate.updatedAt = new Date();
        const { id, status } =  await quotationToUpdate.save(); 
        response.operation = true;
        response.message = 'Update quotation status succesfully';
        response.data = { id, status };
        return response;
      }
  
      response.message = `No Quotation was found with the id ${idQuotation} to update`;
      return response;
    }

    response.message = `ID received { id: ${ idQuotation } }  is not number valid, check if is not empty or another type (string, null, undefined) etc`;
    return response;

  }

  async getQuotationByID(idQuotation: number){

    if(!_.isNaN(idQuotation)){

      const quotationRepository = getRepository(Quotation);
      const quotation = await quotationRepository.findOne(idQuotation);
      if(quotation !== undefined){

        const { id, name_user, mail_user, phone_user, origin, destination, services, description, createdAt } = quotation;
        response.operation = true;
        response.data = { id, name_user, mail_user, phone_user, origin, destination, services, description, createdAt };
        return response;
        
      }

      response.message = `Quotation with ID ${idQuotation} was not found`;
      return response;
    }

    response.message = `ID received { id: ${ idQuotation } }  is not number valid, check if is not empty or another type (string, null, undefined) etc`;
    return response;

  }
}

const quotationService = new QuotationService();
export default quotationService;
