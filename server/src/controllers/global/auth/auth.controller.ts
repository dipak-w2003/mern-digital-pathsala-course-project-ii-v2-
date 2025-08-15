import { Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "../../../database/connection";
import { UserRole } from "../../../middleware/type";
export class AuthController {
  static async registerUser(req: Request, res: Response) {
    const { username, password, email, type } = req.body;

    // ✅ 1. Input validation
    // type is optional for now
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    try {
      // ✅ 2. Check for duplicates
      const [existingUsers]: any = await sequelize.query(
        `SELECT * FROM users WHERE username="${username}" OR email="${email}"`
      );

      if (existingUsers.length > 0) {
        return res.status(409).json({
          message: "Username or email already exists.",
        });
      }

      // ✅ 3. Hash password and create user
      const hashedPassword = bcrypt.hashSync(password, 12);

      await User.create({
        username,
        password: hashedPassword,
        email: email,
        // optional for now
        // role: type === UserRole.Student ? "student" : "institute",
      });

      return res.status(201).json({
        message: "User registered successfully!",
      });
    } catch (error) {
      console.error("Register Error:", error);
      return res.status(500).json({
        message: "Internal server error.",
      });
    }
  }

  // 2: Login Method
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validate input: Check if both email and password are provided
    if (!(email || password)) {
      res.status(404).json({
        message: "Please provide both email and password",
      });
      return;
    }

    // Check if the email exists in the user table
    // Equivalent raw SQL query:
    // SELECT * FROM user WHERE email = "xyz@gmail.com" AND age=nums
    const data = await User.findAll({
      where: {
        email,
      },
    });

    console.log("found user : ", data);

    // If no user found with the provided email, respond with error
    if (data.length === 0) {
      res.status(404).json({ message: "User not registered" });
      return;
    }

    // Compare the provided password with the hashed password stored in DB
    // bcrypt.compareSync(plainPassword, hashedPassword) returns boolean
    const isPasswordMatch = bcrypt.compareSync(password, data[0].password);

    // If password does not match, deny access
    if (!isPasswordMatch) {
      console.log("Password mismatch error");
      res.status(403).json({ message: "Invalid email or password!" });
      return;
    }

    // Else Successful login
    console.log("User logged in successfully");
    const token = jwt.sign({ id: data[0]["id"] }, "thisisecret", {
      expiresIn: "90d",
    });

    // Authorization token send
    // login Access & Authorization checking gateway
    res.status(200).json({
      data: {
        username: data[0].username,
        token: token,
      },
      message: "Login Successful!",
    });
  }
}

/*
  Login Flow Overview:
  --------------------
  1. Accept email and password from client.
  2. Validate input fields.
  3. Check if the email exists in the database.
     - If not, return "Not Registered" response.
  4. Compare provided password with   stored hashed password.
     - If not matched, return "Invalid email or password".
  5. On success, generate and return an authentication token (e.g., JWT).
     - Token can be stored using cookies, localStorage, or handled via sessions.

  Note:
  - This setup can be extended to support OAuth (Google, GitHub, etc.) and SSO.
  🔐 SSO (Single Sign-On)
     * You log in through a trusted identity provider (like Google, GitHub, Facebook, Microsoft, or a company login).
     * The provider verifies you and then tells the app: “This user is trusted.”
     * You don’t create a new password for each app.
     * Often used in corporate systems, or via buttons like “Login with Google”.


*/
