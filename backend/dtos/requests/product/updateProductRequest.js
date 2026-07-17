import Joi from 'joi';
class updateProductRequest{

// tat ca truong the null 
  constructor(data) {
    
       this.name  = data.name;
        this.price = data.price;
        this.oldprice = data.oldprice;
        this.image = data.image;
        this.quantity = data.quantity;
        this.category_id = data.category_id;
        this.buyturn = data.buyturn;
        this.size = data.size;
        this.description = data.description;       
    }
    static validate(data) {
    
        const schema = Joi.object({
            // tuy nhiên nếu có giá trị thì phải validatevalidate
            name: Joi.string().optional(),
            price: Joi.number().positive().optional(),
            oldprice: Joi.number().positive().optional(),
            image: Joi.string().optional(),
            quantity: Joi.number().integer().min(0).optional(),
            category_id: Joi.number().optional(),
            buyturn: Joi.number().integer().min(0).optional(),
            size: Joi.string().optional(),
            description: Joi.string().optional(),
        });
        return schema.validate(data); // return {error, value}
    }

}
export default updateProductRequest;