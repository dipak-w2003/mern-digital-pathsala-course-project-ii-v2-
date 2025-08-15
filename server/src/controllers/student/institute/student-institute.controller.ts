import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

export class StudentInstituteController {
  static async instituteListForStudent(req: Request, res: Response) {
    try {
      const insTableList = await sequelize.query(
        // QueryInfo 🫤 : Grab All Tables names starts with institute_
        `SHOW TABLES LIKE 'institute_%'`,
        {
          type: QueryTypes.SHOWTABLES,
        }
      );
      const allData = [];
      for (let table of insTableList) {
        // table:institute_1000 -> split("_") : ["institute","1000"] -> selected:index-1 = 1000
        const instituteNumber = table.split("_")[1];
        const [data] = await sequelize.query(
          `SELECT  instituteName, instituteEmail FROM ${table}`,
          {
            type: QueryTypes.SELECT,
          }
        );
        // console.log(data);
        allData.push({ instituteNumber: instituteNumber, ...data });
      }
      res.status(200).json({
        message: "Institute List Fetched Succssfully ! ",
        data: allData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async instituteCourseListForStudent(req: Request, res: Response) {
    try {
      const { instituteId } = req.params;
      const courseList = await sequelize.query(`SELECT co.id as courseId,co.courseName,co.courseDescription,co.coursePrice,cat.id,cat.categoryName FROM course_${instituteId} AS co JOIN category_${instituteId} AS cat ON co.categoryId = cat.id`, {
        type: QueryTypes.SELECT
      })

      if (courseList.length === 0) {
        res.status(404).json({
          message: "N0 Courses Found !",
        });
      } else {
        res.status(200).json({
          message: "Courses Fetched",
          data: courseList,
        });
      }
    } catch (error) {
      console.log("list Course student ", error);
      res.status(404).json({
        message: "N0 Courses Found !",
      });
    }
  }
}
