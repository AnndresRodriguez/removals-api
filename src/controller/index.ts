import userController from "./user.controller";
import indexController from "./router";
import quotationContoller from "./quotation.controller";
import serviceController from "./service.controller";
import countryController from "./country.controller";
import contactController from './contact.controller';

const routes = {
  userController,
  indexController,
  quotationContoller,
  serviceController,
  countryController,
  contactController
};
export default routes;
