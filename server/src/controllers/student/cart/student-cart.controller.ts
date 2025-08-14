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
        message: "Invalid Institute Id ..",
      });
    }
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS student_cart_${userId}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        courseId VARCHAR(36) REFERENCES institute_${instituteId}(id) NOT NULL,
        instituteId VARCHAR(36) REFERENCES institute_${instituteId}(id) NOT NULL
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`
    );

    await sequelize.query(
      `INSERT INTO student_cart_${userId}(courseId,instituteId) VALUES(?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [courseId, instituteId],
      }
    );
    res.status(200).json({
      message: "Course added to cart successfully !",
    });
  }
  static async fetchStudentCartItems(req: IExtendedRequest, res: Response) {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        message: "Provide User Id :: ASAP",
      });
    }
    const data = await sequelize.query(
      `SELECT * FROM student_cart_${userId} AS sc course_${`SELECT instituteId from sc`}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    //     const data = await sequelize.query(`SELECT courseId, instituteId FROM student_cart_${userId}`, {
    //       type: QueryTypes.SELECT,
    //     });
    //     for(let dt of data){
    // await sequelize.query(`SELECT * FROM course_${dt?.instituteId} WHER id=${dt.courseId}`)
    //     }

    if (data.length === 0) {
      return res.status(404).json({
        message: "Not items found !",
      });
    } else {
      await sequelize.query(`INSERT INTO student_cart_${userId} WHERE id=?`, {
        replacements: [],
      });
    }
  }
}
