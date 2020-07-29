import _ from 'lodash'


export const response = { operation: false, message: '', data: {} }

export function removeBlanks(stringToFormat: string) {
  return stringToFormat.replace(/ /g, "");
}

export function checkEmptyFields( objectToValidate: object ){
  return Object.values(objectToValidate).some(key => (key !== null && key === '' || key === undefined || key === NaN));
}

export function validateRequest(request: object){

   let requestData = { isValidRequest: false, information: 'OK', dataRequest: {}  }

   if(_.isEmpty(request)){

      requestData.information = 'Empty Request';
      requestData.dataRequest = request;
      return requestData;
      
   }else if (checkEmptyFields(request)){
      requestData.information = 'Some field in the request is empty';
      requestData.dataRequest = request;
      return requestData;
   }

   requestData.isValidRequest = true;
   requestData.dataRequest = request;
   return requestData;
}