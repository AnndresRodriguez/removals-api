import { Router, Request, Response } from "express";

class IndexRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/', (req: Request, res: Response) => {
            res.send('duran:api /users')
        })
    }

}

let IndexRoutes = new IndexRouter();
export default IndexRoutes.router;