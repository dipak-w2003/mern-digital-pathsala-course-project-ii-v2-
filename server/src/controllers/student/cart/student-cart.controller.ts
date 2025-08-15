import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

export class StudentCartController {
  static async insertIntoCartTableOfStudent(
    req: IExtendedRequest,
    res: Response
  ) {
    const userId = req.user?.id;
    const { instituteId, courseId } = req.body;
    if (!instituteId || !courseId) {
      return res.status(400).json({
        message: "Invalid Data's ..",
      });
    }
    console.log("createTable : ", userId);

    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_cart_${userId}(
               id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            courseId VARCHAR(36) REFERENCES course_${instituteId}(id),
            instituteId VARCHAR(36) REFERENCES institute_${instituteId}(id), 
              createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
              updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);
    await sequelize.query(
      `INSERT INTO student_cart_${userId}(courseId,instituteId) VALUES(?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [courseId, instituteId],
      }
    );
    res.status(200).json({
      message: "Course added to cart",
    });
  }
  static async fetchStudentCartItems(req: IExtendedRequest, res: Response) {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        message: "Provide User Id :: ASAP",
      });
    }
    const data: { instituteId: string; courseId: string }[] =
      await sequelize.query(
        `SELECT courseId, instituteId FROM student_cart_${userId}`,
        {
          type: QueryTypes.SELECT,
        }
      );
    const cartDatas = [];
    for (let dt of data) {
      const testData = await sequelize.query(
        `SELECT * FROM course_${dt?.instituteId} WHER id=${dt.courseId}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      cartDatas.push(...testData);
    }
    res.status(200).json({
      message: "Student Carts Fetched",
      data: cartDatas,
    });
  }
}

/**@StudentCartController -> Overview */
