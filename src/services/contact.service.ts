
import { getRepository } from 'typeorm';
import { Contact } from '../models/contact.entity';
import { IContact } from '../models/interfaces/IContact';
import _ from 'lodash';
import { HttpResponse } from '../libs/httpResponse';

class ContactService {


  async getAllContacts() {

    const contactRepository = getRepository(Contact);
    const allContacts = await contactRepository.find();
    return allContacts;

  }

  async createContact(contact: IContact) {

    const contactRepository = getRepository(Contact);
    const newContact = contactRepository.create(contact);
    const httpResponse = new HttpResponse();
    const contactCreated = await newContact.save();
    httpResponse.create('Contact', contactCreated);
    return httpResponse;
    
  }

  async updateContact(idContact: number){
    
    const httpResponse = new HttpResponse();
    if(!_.isNaN(idContact)){
      const contactRepository = getRepository(Contact);
      const contactToUpdate = await contactRepository.findOne(idContact);
      if( contactToUpdate !== undefined ){
  
          contactToUpdate.status = contactToUpdate.status == 0 ? contactToUpdate.status = 1 : contactToUpdate.status = 0;
          contactToUpdate.updatedAt = new Date();
          const { id, name, mail, affair, message, status }  = await contactToUpdate.save();
          httpResponse.update('Contact', { id, name, mail, affair, message, status });
          return httpResponse;
      }
  
      httpResponse.errorNotFoundID('Contact', idContact);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(idContact);
    return httpResponse;

  }

  async getContactByID( idContact: number ){

    const httpResponse = new HttpResponse();
    if(!_.isNaN(idContact)){
      const contactRepository = getRepository(Contact);
      const contactToUpdate = await contactRepository.findOne(idContact);
      if(contactToUpdate !== undefined){
          const { id, name, mail, affair, message, status, createdAt } = contactToUpdate;
          httpResponse.findOne({ id, name, mail, affair, message, status, createdAt })
          return httpResponse;
      }
      httpResponse.errorNotFoundID('Contact', idContact);
      return httpResponse;
    }
    httpResponse.errorFormatInvalid(idContact);
    return httpResponse;
  }

}

const contactService = new ContactService();
export default contactService;