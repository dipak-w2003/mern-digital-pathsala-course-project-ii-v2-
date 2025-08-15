import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import User from "../../../database/models/user.model";

export class StudentOrderController {
  static async createStudentCourseOrder(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const userData = await User.findByPk(userId);
    const { whatsapp_no, remarks } = req.body;
    const orderDetailsData: {
      courseId: string;
      instituteId: string;
    }[] = req.body;
    if (orderDetailsData.length === 0)
      return res.status(400).json({
        message: "Please send the course you want to purchase!!!",
      });

    if (!whatsapp_no || !remarks) {
      return res.status(400).json({
        message: "Please provide whatsapp_no, remarks",
      });
    }
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_order_${userId}(
            id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            email VARCHAR(25) NOT NULL,
            whatsapp_no VARCHAR(26) NOT NULL, 
            remarks TEXT, 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    // order-details
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_order_details_${userId}(
          id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            courseId VARCHAR(36) , 
            instituteId VARCHAR(36), 
            orderId VARCHAR(36) REFERENCES student_order_${userId} NOT NULL, 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_payment_${userId}(
         id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            paymentMethod ENUM('esewa','khalti','cod'), 
            paymentStatus ENUM('paid','pending','unpaid'),
            totalAmount VARCHAR(10) NOT NULL,
            orderId VARCHAR(36) REFERENCES student_order_${userId} NOT NULL, 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

    // insert query
    const data = await sequelize.query(
      `INSERT INTO student_order_${userId}(whatsapp_no,email,remarks) VALUES(?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [whatsapp_no, remarks, userData?.email],
      }
    );

    console.log(data);
    for (let orderDetail of orderDetailsData) {
      await sequelize.query(
        `INSERT INTO student_order_details_${userId}(courseId,instituteId, orderId) VALUES(?,?,?)`,
        {
          type: QueryTypes.INSERT,
          replacements: [orderDetail.courseId, orderDetail.instituteId, 12323],
        }
      );
    }
  }
}
