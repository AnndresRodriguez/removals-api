
import { getRepository } from 'typeorm';
import { Contact } from '../models/contact.entity';
import { IContact } from '../models/interfaces/IContact';
import { response } from '../libs/tools';
import _ from 'lodash';

class ContactService {


  async getAllContacts() {

    const contactRepository = getRepository(Contact);
    const allContacts = await contactRepository.find();
    return allContacts;

  }

  async createContact(contact: IContact) {

    const contactRepository = getRepository(Contact);
    const newContact = contactRepository.create(contact);
    const { id, name, mail, affair, message, status } = await newContact.save();
    response.operation = true;
    response.message = `Contact request for client ${ contact.name } was created successfully`;
    response.data = { id, name, mail, affair, message, status };
    return response;
    
  }

  async updateContact(idContact: number){

    if(!_.isNaN(idContact)){

      const contactRepository = getRepository(Contact);
      const contactToUpdate = await contactRepository.findOne(idContact);
      if( contactToUpdate !== undefined ){
  
          contactToUpdate.status = contactToUpdate.status == 0 ? contactToUpdate.status = 1 : contactToUpdate.status = 0;
          contactToUpdate.updatedAt = new Date();
          const { id, name, mail, affair, message, status }  = await contactToUpdate.save();
          response.operation = true;
          response.message = `Status Contact update successfully`;
          response.data = { id, name, mail, affair, message, status };
          return response;
      }
  
      response.message = `No Contact was found with the id ${idContact} to update`;
      return response;
    }

    response.message = `ID received { id: ${ idContact } }  is not number valid, check if is not empty o type string`;
    return response;

  }

  async getContactByID( idContact: number ){

    if(!_.isNaN(idContact)){
      const contactRepository = getRepository(Contact);
      const contactToUpdate = await contactRepository.findOne(idContact);
      if(contactToUpdate !== undefined){
          
          const { id, name, mail, affair, message, status, createdAt } = contactToUpdate;
          response.operation = true;
          response.data = { id, name, mail, affair, message, status, createdAt };
          return response;
      }
      response.message = `No Contact was found with the id ${idContact}`;
      return response;
    }
    response.message = `ID received { id: ${ idContact } }  is not number valid, check if is not empty o type string`;
    return response;
  }

}

const contactService = new ContactService();
export default contactService;