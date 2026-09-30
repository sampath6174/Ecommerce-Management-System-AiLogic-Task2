import { Router } from "express";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import UserController from "../Controllers/userController";
import registerValidation from "../Validations/registerValidation";
import loginValidation from "../Validations/loginValidation";
import validator from "../Validations/validator";
const router = Router()
const userController = new UserController()

router.post("/register",registerValidation,validator,userController.register.bind(userController))



router.post("/login",loginValidation,validator,userController.login.bind(userController))



router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["ADMIN","USER","CUSTOMER"]),
    userController.deleteUser.bind(userController)
);


router.get(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    userController.getAllUsers.bind(userController)
);


router.get(
    "/customers",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER"]),
    userController.getAllCustomers.bind(userController)
);



router.get(
    "/customers/:id",
    authMiddleware,
    roleMiddleware(["ADMIN", "USER"]),
    userController.getCustomerById.bind(userController)
);



router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    userController.getUserById.bind(userController)
);


router.post(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    userController.createUser.bind(userController)
);

router.post(
    "/refresh-token",
    userController.refreshAccessToken.bind(userController)
);
export default router