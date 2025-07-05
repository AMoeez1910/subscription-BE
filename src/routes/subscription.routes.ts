import { Router, Response, Request } from "express";

const subscriptionRouter = Router();
// get
subscriptionRouter.get("/", (req: Request, res: Response) => {
  res.send({ title: "Get all Subscriptions" });
});

subscriptionRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Get Subscription with ID: ${id}` });
});

subscriptionRouter.get("/user/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  res.send({ title: `Get Subscriptions for User with ID: ${userId}` });
});

subscriptionRouter.get(
  "/get-upcoming-renewals",
  (req: Request, res: Response) => {
    res.send({ title: "Get Upcoming Renewals" });
  }
);
// post
subscriptionRouter.post("/", (req: Request, res: Response) => {
  res.send({ title: "Create Subscription" });
});
// put
subscriptionRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Update Subscription with ID: ${id}` });
});

subscriptionRouter.put("/user/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  res.send({ title: `Update Subscription for User with ID: ${userId}` });
});
// delete
subscriptionRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Delete Subscription with ID: ${id}` });
});
// patch
subscriptionRouter.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Patch Subscription with ID: ${id}` });
});

export default subscriptionRouter;
