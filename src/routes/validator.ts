import _ from 'lodash';
import { validateSchema } from "@utils/authentication";
import  ServerError  from "@error/ServerError";
const validator = (schema) => {

    return async (req, res, next) => {
        const obj = req.body;
        const {errors} = await validateSchema(schema,obj);

        const valid = _.isEmpty(errors)

        if (!valid) next(new ServerError(undefined,{message:_.join(errors,','),status:500}));
        next();
    }
}
export default validator;
