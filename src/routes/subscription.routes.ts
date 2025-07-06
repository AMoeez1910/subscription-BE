import { Router, Response, Request } from "express";
import authorize from "../middleware/auth.middleware";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptionByUser,
  getSubscriptions,
  getUpcomingRenewals,
  updateSubscription,
} from "../controllers/subscription.controller";

const subscriptionRouter = Router();
// get
subscriptionRouter.get("/", getSubscriptions);

subscriptionRouter.get("/subscription/:id", getSubscription);

subscriptionRouter.get(
  "/get-upcoming-renewals",
  authorize,
  getUpcomingRenewals
);
subscriptionRouter.get("/user/:userId", authorize, getSubscriptionByUser);

// post
subscriptionRouter.post("/", authorize, createSubscription);
// put
subscriptionRouter.put("/:id", authorize, updateSubscription);

// delete
subscriptionRouter.delete("/:id", authorize, deleteSubscription);
// patch
subscriptionRouter.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send({ title: `Patch Subscription with ID: ${id}` });
});

export default subscriptionRouter;
