import { getRepository, getManager } from 'typeorm';
import { ServiceEntity } from '../models/service.entity';
import fp from 'lodash/fp';
import _ from 'lodash';
import { HttpResponse } from '../libs/httpResponse';


class Service {

    
    async getAllServices(){

      const serviceRepository = getRepository(ServiceEntity);
      const services = serviceRepository.find();
      return services; 
      
    }

    async createService(nameService: string){

        const isValidName = await this.validateNameService(nameService);
        const httpResponse = new HttpResponse();
  
        if(isValidName){
            const serviceRepository = getRepository(ServiceEntity);
            const newService = serviceRepository.create({ name: fp.capitalize(fp.toLower(nameService)) })
            const serviceCreated = await newService.save();
            const { id, name } = serviceCreated;;
            httpResponse.create('Service', { id, name })
            return httpResponse;
        }

        httpResponse.errorDuplicated();
        return httpResponse;
    }

    async updateService( idService:number, newName: string ){

        const httpResponse = new HttpResponse();

        if (!_.isNaN(idService)){

            const serviceRepository = getRepository(ServiceEntity);
            const serviceToUpdate = await serviceRepository.findOne(idService);
            if (serviceToUpdate != undefined){
                const isNameValid = await this.validateNameService(newName);
                if(isNameValid)
                {
                    serviceToUpdate.name = fp.capitalize(fp.toLower(newName));
                    serviceToUpdate.updatedAt = new Date();
                    const { id, name } = await serviceToUpdate.save();
                    httpResponse.update('Service', { id, name });
                    return httpResponse;
                }
                
                else {
    
                   httpResponse.errorDuplicated()
                   return httpResponse;
                }
            }
            httpResponse.errorNotFoundID('Service', idService)
            return httpResponse;
        } 

        httpResponse.errorFormatInvalid(idService);
        return httpResponse;
    }

    async updateStatusService( id: number ){

        const httpResponse = new HttpResponse();

        if(!_.isNaN(id)){
            
            const serviceRepository = getRepository(ServiceEntity);
            const serviceToUpdate = await serviceRepository.findOne(id);

            if (serviceToUpdate != undefined){
                serviceToUpdate.status == 0 ? serviceToUpdate.status = 1 : serviceToUpdate.status = 0;
                serviceToUpdate.updatedAt = new Date();
                const { id, name, status } = await serviceToUpdate.save();
                httpResponse.update('Service', { id, name, status });
                return httpResponse;
            }
    
            httpResponse.errorNotFoundID('Service', id)
            return httpResponse;
        }

        httpResponse.errorFormatInvalid(id);
        return httpResponse;

    }

    async validateNameService( nameService: string ){

        const serviceRepository = getRepository(ServiceEntity);
        const service = await serviceRepository.find({ where: { name: fp.capitalize(fp.toLower(nameService)) } });
        return service.length === 0;
    }

}

const service = new Service();
export default service;