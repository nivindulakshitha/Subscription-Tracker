import { Router } from "express";

const userRouter = Router();

userRouter.get('/users', (req, res) => {
    res.send({
        title: 'Fetch all users'
    })
})

userRouter.get('/:id', (req, res) => {
    res.send({
        title: 'Get user details by id'
    })
})

userRouter.post('/', (req, res) => {
    res.send({
        title: 'Create new users'
    })
})

userRouter.put('/:id', (req, res) => {
    res.send({
        title: 'Update user details by id'
    })
})

userRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Delete user by id'
    })
})

export default userRouter;