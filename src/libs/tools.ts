import _ from 'lodash'


export const response = { operation: false, message: '', data: {} }

export function removeBlanks(stringToFormat: string) {
  return stringToFormat.replace(/ /g, "");
}


export function emptyProperties(objectToValidate: object){
   return Object.values(objectToValidate).some(key => {
      if(key !== null && key === '' || key === undefined || key === NaN){
         return true;
      }else if( _.isObject(key)){
         return _.isEmpty(key)
      }
   })
}

export function validateRequest(request: object){

   let requestData = { isValidRequest: false, information: 'OK', dataRequest: {}  }

   if(_.isEmpty(request)){

      requestData.information = 'Empty Request';
      requestData.dataRequest = request;
      return requestData;
      
   }else if (emptyProperties(request)){
      requestData.information = 'Some field in the request is empty';
      requestData.dataRequest = request;
      return requestData;
   }

   requestData.isValidRequest = true;
   requestData.dataRequest = request;
   return requestData;
}