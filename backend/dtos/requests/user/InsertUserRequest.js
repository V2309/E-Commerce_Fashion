
import Joi from 'joi';
import UserRole from '../../../constants/UserRole';
class InsertUserRequest {
  constructor(data){
   this.email = data.email;
    this.password = data.password;
    this.name= data.name;
    this.phone= data.phone;
  }
  
    static validate(data) {
        const schema = Joi.object({
            email: Joi.string().email().optional(),
            password: Joi.string().min(6).optional().required(),
            name: Joi.string().required(),
            phone: Joi.string().optional()
        });
        return schema.validate(data);
    }

}
export default InsertUserRequest;