import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send({ title: "Get all Users" });
});

userRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Get User with ID: ${id}` });
});

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
