import Joi, { optional } from 'joi';
class insertOrderRequest {
  constructor(data){
    this.user_id = data.user_id;
    this.status = data.status;
    this.notes= data.notes;
    this.total = data.total;
    this.phone = data.phone;
    this.address = data.address;
  }

  static validate(data) 
  {
   const schema = Joi.object({
    user_id: Joi.number().allow('').optional(),
    status: Joi.string().allow(''),
    notes: Joi.string().optional().allow(''),
    total: Joi.number().required(),
    phone: Joi.string().pattern(/^[0-9+]+$/).required(),
    address: Joi.string().allow('').optional()
   });
    return schema.validate(data);
}
}
export default insertOrderRequest;