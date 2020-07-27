import { getRepository, getManager } from 'typeorm';
import { ServiceEntity } from '../models/service.entity';
import { response } from '../libs/tools';
import fp from 'lodash/fp'



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
            response.message = `Servicio ${fp.capitalize(fp.toLower(nameService))} Creado exitósamente`;
            const { id, name } = serviceCreated
            response.data = { id, name }
            return response;
        }

        response.operation = false;
        response.message = 'El nombre ingresado ya se encuentra registrado';
        return response;


    }

    async updateService( id:number, newName: string ){

        const serviceRepository = getRepository(ServiceEntity);
        const serviceToUpdate = await serviceRepository.findOne(id);
        if (serviceToUpdate != undefined){

            const isNameValid = await this.validateNameService(newName);

            if(isNameValid)
            {
                serviceToUpdate.name = fp.capitalize(fp.toLower(newName));
                serviceToUpdate.updatedAt = new Date();
                const { id, name } = await serviceToUpdate.save();
                response.operation = true;
                response.message = `Servicio ${fp.capitalize(fp.toLower(newName))} actualizado exitósamente`;
                response.data = { id, name };
                return response;
            }
            
            else {

               response.message = `El nombre ${ newName } ya se encuentra registrado debe seleccionar otro`;
               return response;
            }
        }

        response.message = `El servicio con el id ${ id } no existe`;
        return response;

    }

    async updateStatusService( id: number ){

        const serviceRepository = getRepository(ServiceEntity);
        const serviceToUpdate = await serviceRepository.findOne(id); 
        if (serviceToUpdate != undefined){
     
            serviceToUpdate.status == 0 ? serviceToUpdate.status = 1 : serviceToUpdate.status = 0;
            serviceToUpdate.updatedAt = new Date();
            const { id, name, status } = await serviceToUpdate.save();
            response.operation = true;
            response.message = `El servicio ${name} ha actualizado el estado con éxito`;
            response.data = { id, name, status };
            return response;

        }

        response.message = `El servicio con el ID ${id} no se encuentra en la base de datos`;
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