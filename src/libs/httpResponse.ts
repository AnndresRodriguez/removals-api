import fp from "lodash/fp";
import _ from "lodash";

export class HttpResponse {
  operation: boolean;
  message: string;
  data: object;

  constructor() {
    this.operation = false;
    this.message = "";
    this.data = {};
  }

  create(nameEntity: string, dataCreated: object) {
    this.operation = true;
    this.message = `${nameEntity} created successfully`;
    this.data = dataCreated;
  }

  update(nameEntity: string, dataCreated: object) {
    this.operation = true;
    this.message = `${nameEntity} updated successfully`;
    this.data = dataCreated;
  }

  delete(nameEntity: string, dataCreated: object){
    this.operation = true;
    this.message = `${nameEntity} deleted successfully`;
    this.data = dataCreated;

  }

  findOne(dataFinded: object){
    this.operation = true;
    this.message = `Record Found`;
    this.data = dataFinded;

  }

  errorDuplicated() {
    this.message = "This record is already in our database";
  }

  errorEmptyObject(dataReceived: object) {
    this.message = `Data received to request is empty`;
    this.data = dataReceived;
  }

  errorFormatInvalid(numberID: any) {
    this.message = `ID received { id: ${numberID} }  is not number valid, check if is not empty or another type (string, null, undefined) etc`;
    // return this.message;
  }

  errorNotFoundID(nameEntity: string, id: any) {
    this.message = `${nameEntity} with ID ${id} was not found`;
  }
}
