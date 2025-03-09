import { Router } from "express";

subcriptionRouter = Router();

suscriptionRouter.post('/', (req, res) => {
    res.send({
        title: 'Create new subscription'
    })
})

export default subcriptionRouter;