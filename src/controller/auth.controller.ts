import { Request, Response, Router } from "express";

class AuthController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async login(req: Request, res: Response) {}
  async logout(req: Request, res: Response) {}
  async register(req: Request, res: Response) {}
 
  routes() {
    this.router.get("/", this.login);
    this.router.get("/:id", this.logout);
    this.router.post("/", this.register);
  }
}

const authController = new AuthController();
export default authController.router;