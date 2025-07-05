import { Router, Request, Response } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req: Request, res: Response) => {
  res.send({ title: "Sign Up" });
});

authRouter.post("/sign-in", (req: Request, res: Response) => {
  res.send({ title: "Sign In" });
});

authRouter.post("/sign-out", (req: Request, res: Response) => {
  res.send({ title: "Sign Out" });
});

export default authRouter;
