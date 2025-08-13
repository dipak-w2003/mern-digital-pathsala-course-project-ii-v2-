import { Request, Response } from "express";
import User from "../database/models/user.model";

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Users fetched successfully!",
      users,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};
