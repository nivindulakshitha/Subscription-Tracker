import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({
        title: 'Get all subscription'
    })
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({
        title: 'Get subscription by id'
    })
})

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => {
    res.send({
        title: 'Update subscription by id'
    })
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Delete subscription by id'
    })
})

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({
        title: 'Cancel subscription by id'
    })
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({
        title: 'Get all upcoming subscription renewals'
    })
})

export default subscriptionRouter;