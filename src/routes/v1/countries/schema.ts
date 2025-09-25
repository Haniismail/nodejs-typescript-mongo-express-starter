import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  param: Joi.object().keys({
    area: JoiObjectId().optional(),
    population: JoiObjectId().optional(),
    currencies: JoiObjectId().optional(),
    languages: JoiObjectId().optional(),
  }),
};
