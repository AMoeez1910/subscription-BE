import { Response, NextFunction } from "express";
import Subscription from "../models/subscription.model";
import { CustomRequestI } from "../middleware/auth.middleware";
import dayjs from "dayjs";

export const createSubscription = async (
  req: CustomRequestI,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.user?._id);
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user?._id,
    });
    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    next(error);
  }
};

export const getSubscriptions = async (
  req: CustomRequestI,
  res: Response,
  next: NextFunction
) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      success: true,
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    next(error);
  }
};

export const getSubscription = async (
  req: CustomRequestI,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Subscription fetched successfully",
      data: subscription,
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    next(error);
  }
};

export const getSubscriptionByUser = async (
  req: CustomRequestI,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const { userId: paramUserId } = req.params;
    if (paramUserId && paramUserId !== userId.toString()) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to access this user's subscriptions",
      });
      return;
    }
    const subscriptions = await Subscription.find({ user: userId });
    if (!subscriptions || subscriptions.length === 0) {
      res.status(404).json({
        success: false,
        message: "No subscriptions found for this user",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions by user:", error);
    next(error);
  }
};

export const updateSubscription = async (
  req: CustomRequestI,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedSubscription) {
      res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: updatedSubscription,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    next(error);
  }
};

export const deleteSubscription = async (
  req: CustomRequestI,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedSubscription = await Subscription.findByIdAndDelete(id);
    if (!deletedSubscription) {
      res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
      data: deletedSubscription,
    });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    next(error);
  }
};

export const getUpcomingRenewals = async (
  req: CustomRequestI,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = dayjs();
    const upcomingRenewals = await Subscription.find({
      user: req.user?._id,
      renewalDate: { $gte: date },
    })
    if (!upcomingRenewals || upcomingRenewals.length === 0) {
      res.status(404).json({
        success: false,
        message: "No upcoming renewals found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Upcoming renewals fetched successfully",
      data: upcomingRenewals,
    });
  } catch (error) {
    console.error("Error fetching upcoming renewals:", error);
    next(error);
  }
};
