import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.model";
import { IExtendedRequest, UserRole } from "./type";

export class Middleware {
  // NextFunction express based method which triggers next function/method
  static isLoggedIn(req: IExtendedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    // Verification 1: Token Checking Added or Not
    if (!token) {
      res.status(401).json({
        message: "Invalid Token",
      });
      return;
    }
    // Verification 2: Verify 'token' var-data
    jwt.verify(
      token,
      "thisisecret",
      async (errorMessage, successMessage: any) => {
        // Verify Token with 'jwt' method 'verify'
        // if not verified
        if (errorMessage) {
          res.status(403).json({
            message: "Invalid Token Intercepted !!",
          });
          return;
        }
        console.log("Middleware Accessed :: ");
        console.log("token_authentication_success_::", successMessage);
        // Verification 3: 'User' Data-List Verification
        const userData = await User.findByPk(successMessage.id, {
          // NOTE : data accessing or passing limitation set
          attributes: ["id", "currentInstituteNumber", "role"],
        });
        console.log(userData);
        if (!userData) {
          res.send(403).json({
            // user not found
            message: "User Email or Pass Invalid !!",
          });
        } else {
          req.user = userData;
          next();
        }
      }
    );
  }

  // Id trimming for table due to unsupported table name as '-'
  static changeUserIdForTableName(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    console.log(req.user, "Req user outside")
    if (req.user && req.user.id) {
      const newUserId = req.user.id.split("-").join("_")
      req.user = { id: newUserId, role: req.user.role }
      console.log(req.user, "RequserId")
      //  console.log(req.user?.id.split("-").join("_") ,"data")
      next()
    }
  }

  // Role Based Routing API Execution set . In short RBA Role Based Authorization
  static restrictTo(...roles: UserRole[]) {
    return (req: IExtendedRequest, res: Response, next: NextFunction) => {
      // requesting user ko role k xa tyo liney ani parameter aako role sanga match garne 
      let userRole = req.user?.role as UserRole // teacher
      console.log(req.user?.role, "restrict o")
      if (roles.includes(userRole)) {
        next()
      } else {
        res.status(403).json({
          message: "Invalid, you dont have access to this.."
        })
      }
    }
  }
}
// http POST http://localhost:3000/api/institute \
// Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzNDVlMDRiLTA2OTUtNDJkOS1iMTAzLWE2NjkwN2FmM2UyMCIsImlhdCI6MTc1MTA4NzUwOSwiZXhwIjoxNzU4ODYzNTA5fQ.PwXor-KgeO2WyfjmzXJUeHK-rx8Sry3KteM0ScK9Q3A" \
//   instituteName="sudo" \
//   instituteEmail="sudo@example.com" \
//   institutePhoneNumber="sudo" \
//   instituteAddress="sudo" \
//   institutePanNo="sudo" \
//   instituteVatNo="sudo"

