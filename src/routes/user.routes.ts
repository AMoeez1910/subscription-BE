import { Request, Response, Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";
import authorize from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req: Request, res: Response) => {
  res.send({ title: "Create User" });
});

userRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Update User with ID: ${id}` });
});

userRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Delete User with ID: ${id}` });
});

userRouter.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Patch User with ID: ${id}` });
});

export default userRouter;
