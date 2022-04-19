import _ from 'lodash'
const errors = {
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Server Error',
  };
class ServerError extends Error {
    status:number;
  constructor(code?:number, error?:{message:string,status:number}) {
    //Either code or error exists if not throws error
    const defaultStatus = 500; // Internal Server Error
    //console.log(code,error)
    if(!code && !error) throw new Error('Constructor requires code or error');
    super(code?errors[code]:_.get(error,'message',errors[defaultStatus]));
    if(code) {
      this.status = code;
    } else{
    const defaultStatus = 500;  
    this.status = _.get(error,'status', defaultStatus);
    }
  }
  getErrorMessage() {
    return this.message;
  }
  getStatus() {
    return this.status;
  }
}
export default ServerError;