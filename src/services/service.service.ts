import { getRepository, getManager } from 'typeorm';
import { ServiceEntity } from '../models/service.entity';
import { response } from '../libs/tools';
import fp from 'lodash/fp'
import _ from 'lodash'


class Service {

    
    async getAllServices(){

      const serviceRepository = getRepository(ServiceEntity);
      const services = serviceRepository.find();
      return services; 
      
    }

    async createService(nameService: string){

        const isValidName = await this.validateNameService(nameService);
        console.log(fp.startCase(fp.toLower(nameService)))

        if(isValidName){
            const serviceRepository = getRepository(ServiceEntity);
            const newService = serviceRepository.create({ name: fp.capitalize(fp.toLower(nameService)) })
            const serviceCreated = await newService.save();

            response.operation = true;
            response.message = `Service ${fp.capitalize(fp.toLower(nameService))} created successfully`;
            const { id, name } = serviceCreated;
            response.data = { id, name };
            return response;
        }

        response.operation = false;
        response.message = 'The name entered is already registered';
        return response;
    }

    async updateService( idService:number, newName: string ){

        if (_.isEmpty(newName)){
            response.message = `New name is empty`;
            return response;
        }

        if (!_.isNaN(idService) && !_.isEmpty(newName)){

            const serviceRepository = getRepository(ServiceEntity);
            const serviceToUpdate = await serviceRepository.findOne(idService);
            if (serviceToUpdate != undefined){
    
                const isNameValid = await this.validateNameService(newName);
    
                if(isNameValid)
                {
                    serviceToUpdate.name = fp.capitalize(fp.toLower(newName));
                    serviceToUpdate.updatedAt = new Date();
                    const { id, name } = await serviceToUpdate.save();
                    response.operation = true;
                    response.message = `Service ${fp.capitalize(fp.toLower(newName))} updated successfully`;
                    response.data = { id, name };
                    return response;
                }
                
                else {
    
                   response.message = `The name ${ newName } is already registered you must select another`;
                   return response;
                }
            }
    
            response.message = `Service with ID ${ idService } was not found`;
            return response;

        
        } else if(_.isNaN(idService)){

            response.message = `ID received ${ idService } is not number valid`
            return response;
        }

        response.message = 'The name received to create a new service is empty';
        return response;


    }

    async updateStatusService( id: number ){

        if(_.isNumber(id)){

            const serviceRepository = getRepository(ServiceEntity);
            const serviceToUpdate = await serviceRepository.findOne(id); 
            if (serviceToUpdate != undefined){
         
                serviceToUpdate.status == 0 ? serviceToUpdate.status = 1 : serviceToUpdate.status = 0;
                serviceToUpdate.updatedAt = new Date();
                const { id, name, status } = await serviceToUpdate.save();
                response.operation = true;
                response.message = `Update status service succesfully`;
                response.data = { id, name, status };
                return response;
    
            }
    
            response.message = `Service with ID ${ id } was not found`;
            return response;
        }

        response.message = `ID received { id: ${ id } }  is not number valid, check if is not empty or another type (string, null, undefined) etc`;
        return response;

    }

    async validateNameService( nameService: string ){

        const serviceRepository = getRepository(ServiceEntity);
        const service = await serviceRepository.find({ where: { name: fp.capitalize(fp.toLower(nameService)) } });
        return service.length === 0;
    }

}

const service = new Service();
export default service;