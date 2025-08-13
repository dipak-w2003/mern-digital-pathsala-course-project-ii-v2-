import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
// NEEDS SOME MODIFICATION ASAP ⚠️
export class CourseController {
  // Create Course
  static async createCourse(req: IExtendedRequest, res: Response) {
    try {
      const instituteNumber = req.user?.currentInstituteNumber;
      const {
        courseName,
        coursePrice,
        courseDuration,
        courseLevel,
        courseDescription,
        categoryId,
      } = req.body;

      // Validate all fields
      if (
        !courseName ||
        !coursePrice ||
        !courseDuration ||
        !courseLevel ||
        !courseDescription ||
        !categoryId
      ) {
        return res.status(400).json({
          message: "Please provide all required fields",
        });
      }

      const courseThumbnail = req.file ? req.file.path : null;

      // Insert course into DB
      const insertedResult = await sequelize.query(
        `INSERT INTO course_${instituteNumber}
        (courseName, coursePrice, courseDuration, courseLevel, courseThumbnail, courseDescription, categoryId)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        {
          type: QueryTypes.INSERT,
          replacements: [
            courseName,
            coursePrice,
            courseDuration,
            courseLevel,
            courseThumbnail || "LINK",
            courseDescription,
            categoryId,
          ],
        }
      );

      return res.status(200).json({
        message: "Course Created Successfully",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // Delete Course
  static async deleteCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params?.id;
    // first check if course exists or not , if exists --> delete else not delete
    console.log("id received : ", courseId);
    const courseData = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} WHERE id=?`,
      {
        replacements: [courseId],
        type: QueryTypes.SELECT,
      }
    );

    if (courseData.length == 0) {
      return res.status(404).json({
        message: "no course with that id",
      });
    }

    await sequelize.query(
      `DELETE FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [courseId],
        type: QueryTypes.DELETE,
      }
    );
    res.status(200).json({
      message: "course deleted successfully",
    });
  }

  // Get All courses
  static async getAllCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    // Explanation Needed ⚠️ :  get course:id,courseName from course_nums as 'c' and join it to category_nums as 'cat' on/where c.categoryId matches cat.id
    const joined_table = `SELECT c.id,c.courseName,c.courseDescription,c.coursePrice,c.createdAt FROM course_${instituteNumber} AS c JOIN category_${instituteNumber} AS cat ON c.categoryId = cat.id`;

    const courses = await sequelize.query(joined_table, {
      type: QueryTypes.SELECT,
    });
    console.log(courses);
    res.status(200).json({
      message: "Courses fetched",
      data: courses,
    });
  }

  // Get Single Course
  static async getSingleCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;

    console.log("Institute Number from Single Fetch : ", instituteNumber);
    const courseId = req.params.id;
    console.log(`Course Id ${courseId}`);
    const [course] = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [courseId],
      }
    );
    if (course.length === 0)
      return res.status(404).json({
        message: "Book Not Found",
        data: [],
      });
    res.status(200).json({
      message: "Single Course fetched",
      data: course,
    });
  }
}
