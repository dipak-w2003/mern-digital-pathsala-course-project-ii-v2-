import { Request, Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { QueryTypes } from "sequelize";

export class StudentController {
  /**@Studentsdata
   * studentName,
   * studentEmail,
   * studentPhoneNumber,
   * studentAddress,
   * enrolledDate,
   * studentImage,
   */
  static async createStudent(req: IExtendedRequest, res: Response) {
    try {
      const instituteNumber = req.user?.currentInstituteNumber;
      const {
        studentName,
        studentEmail,
        studentPhoneNumber,
        studentAddress,
        enrolledDate,
      } = req.body;
      const studentImage = req.file ? req.file.path : null;
      const returnedData = await sequelize.query(
        `INSERT INTO student_${instituteNumber} (studentName,studentEmail,studentPhoneNumber,studentAddress,enrolledDate,studentImage) VALUES(?,?,?,?,?,?)`,
        {
          replacements: [
            studentName,
            studentEmail,
            studentPhoneNumber,
            studentAddress,
            enrolledDate,
            studentImage,
          ],
        }
      );
      res.status(200).json({
        message: "Student Registered Successfully",
        data: returnedData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Student Registered Unsuccessfully",
      });
      console.log(error);
    }
  }
  static async getAllStudent(req: IExtendedRequest, res: Response) {
    try {
      const instituteNumber = req.user?.currentInstituteNumber;
      const getAllStudents = await sequelize.query(
        `SELECT * FROM student_${instituteNumber}`, {
        type: QueryTypes.SELECT
      }
      );
      res.status(200).json({
        message: "All Student Data's Fetched Successfully",
        data: getAllStudents,
      });
    } catch (error) {
      res.status(200).json({
        message: "All Student Data's Fetching Unsuccessfully",
        data: [],
      });
      console.log(error);
    }
  }
  static async getSingleStudent(req: IExtendedRequest, res: Response) {
    try {
      const instituteNumber = req.user?.currentInstituteNumber;
      const studentId = req.params.id;
      const singleStudent = await sequelize.query(
        `SELECT * FROM student_${instituteNumber} where id = ?`,
        {
          replacements: [studentId],
        }
      );
      res.status(200).json({
        message: "Single Student Data Fetched !!",
        data: singleStudent,
      });
    } catch (error) {
      res.status(500).json({
        message: "Single Student Data Fetched !!",
        data: [],
      });
      console.log(error);
    }
  }

  static async updateStudent(req: IExtendedRequest, res: Response) {
    try {
      const {
        studentName,
        studentEmail,
        studentPhoneNumber,
        studentAddress,
        enrolledDate,
      } = req.body;
      const instituteNumber = req.user?.currentInstituteNumber;
      const studentId = req.params.id;
      const studentImage = req.file ? req.file.path : null;
      await sequelize.query(
        `UPDATE student_${instituteNumber} 
      SET
        studentName = ?,
        studentEmail = ?,
        studentPhoneNumber = ?,
        studentAddress = ?,
        enrolledDate = ?,
        studentImage = ?,
        WHERE id = ?`,
        {
          replacements: [
            studentName,
            studentEmail,
            studentPhoneNumber,
            studentAddress,
            enrolledDate,
            studentImage,
          ],
        }
      );
      res.status(200).json({
        message: "Student Updated Successfully",
      });
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({
        message: "Student Update Failed",
      });
    }
  }

  static async deleteStudent(req: IExtendedRequest, res: Response) {
    try {
      const instituteNumber = req.user?.currentInstituteNumber;
      const studentId = req.params.id;
      await sequelize.query(
        `DELETE FROM student_${instituteNumber} where id = ?`,
        {
          replacements: [studentId],
        }
      );
      res.status(200).json({
        message: "Student Deletion Successfull !",
      });
    } catch (error) {
      res.status(500).json({
        message: "Student Deletion Unsuccessfull !",
      });
      console.log(error);
    }
  }
}
