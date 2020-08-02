import { Router, Request, Response } from "express";
class UserController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getAllusers(req: Request, res: Response) {

    res.json({
      data: 'dashboard user'
    })

  }

  // async getuser(req: Request, res: Response) {
    
  // }

  // async createuser(req: Request, res: Response) {
    
  // }

  // async updateuser(req: Request, res: Response) {
    
  // }

  // async deleteuser(req: Request, res: Response) {
   
    
  // }

  routes() {
    this.router.get("/", this.getAllusers);
    // this.router.get("/:id", this.getuser);
    // this.router.post("/", this.createuser);
    // this.router.put("/", this.updateuser);
    // this.router.delete("/:id", this.deleteuser);
  }
}

const userController = new UserController();
export default userController.router;