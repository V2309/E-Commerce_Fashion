import Joi from 'joi';
class insertProductRequest {
  constructor(data) {
    
        this.name = data.name;
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
            name: Joi.string().required(),
            price: Joi.number().positive().required(),
            oldprice: Joi.number().positive(),
            image: Joi.string().allow(""),
            quantity: Joi.number().integer().min(0),
            category_id: Joi.number().required(),
            buyturn: Joi.number().integer().min(0),
            size: Joi.string().required(),
            description: Joi.string().optional()
        });
        return schema.validate(data); // return {error, value}
    }

}
export default insertProductRequest;