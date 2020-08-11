import { Router, Request, Response } from "express";
import fs from 'fs';

class IndexRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/', (req: Request, res: Response) => {
            res.send('duran:api /quotations')
        })


        this.router.get('/*', (req: Request, res: Response) => {
            try {

                fs.appendFileSync('logs.txt', `\n ${req.originalUrl} : IP  ${req.ip} : method ${req.method}`);

            } catch (error) {
                console.log(error)
            }

            res.send('route is invalid')
        })
    }

}

let IndexRoutes = new IndexRouter();
export default IndexRoutes.router;