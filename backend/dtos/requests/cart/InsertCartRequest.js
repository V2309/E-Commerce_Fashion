import Joi from "joi";

class InsertCartRequest {
    constructor(data) {
        this.user_id = data.user_id;
        this.session_id = data.session_id;
    }
    
    static validate(data) {
        const schema = Joi.object({
            user_id: Joi.number().integer().allow('').optional(),        
            session_id: Joi.string().allow('').optional()     
        });
        return schema.validate(data);
    }
}

export default InsertCartRequest;