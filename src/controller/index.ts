import userController from "./user.controller";
import indexController from "./router";
import quotationContoller from "./quotation.controller";
import serviceController from "./service.controller";
import countryController from "./country.controller";
import contactController from './contact.controller';
import cityController from './city.controller';

const routes = {
  userController,
  indexController,
  quotationContoller,
  serviceController,
  countryController,
  contactController,
  cityController
};
export default routes;
