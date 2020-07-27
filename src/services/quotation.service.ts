import { getRepository, getManager, getConnection } from "typeorm";
import { Quotation } from "../models/quotation.entity";
import { IQuotation } from '../models/interfaces/IQuotation';
import cityService from './city.service';
import countryService from './country.service';

import { response } from '../libs/tools';
import { sendMail } from '../libs/mail';

class QuotationService {
  async getAllQuotations() {
    const quotationRepository = getRepository(Quotation);
    const quotations = quotationRepository.find();
    return quotations;
  }

  async createQuotation( quotation: IQuotation ) {

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
    const countryDestination = await countryService.createCountry(quotation.destination[0], cityDestination);

    newQuotation.origin = countryOrigin;
    newQuotation.destination = countryDestination;

    const { name_user, mail_user, description, phone_user, origin, destination, id } = await newQuotation.save();

    quotation.services.map( async idService => {
      await getConnection()
      .createQueryBuilder()
      .relation(Quotation, "services")
      .of(id)
      .add(idService);

    });

    sendMail(quotation.mail, quotation.name);

    response.operation = true;
    response.message = `Cotizacion para el usuario ${name_user} creada con éxito`;
    response.data = { name_user, mail_user, description, phone_user, origin, destination }

    return response;

  }

 

}

const quotationService = new QuotationService();
export default quotationService;
