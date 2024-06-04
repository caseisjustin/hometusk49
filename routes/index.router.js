import {Router} from "express"
import userRouter from "./auth.router.js"

const router = Router()

router.use("/users", userRouter)

export default router;