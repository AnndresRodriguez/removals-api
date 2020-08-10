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


        this.router.get('*', (req: Request, res: Response) => {
            try {
                fs.writeFileSync('../../logs.txt', `${ req.originalUrl + req.ip + req.method } `)
                // console.log(fs.readFileSync("../../logs.txt", "utf8"));
            } catch (error) {
                console.log(error)
            }

            res.send('route is invalid')
        })
    }

}

let IndexRoutes = new IndexRouter();
export default IndexRoutes.router;