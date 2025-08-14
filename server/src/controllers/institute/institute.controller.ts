import { NextFunction, Response } from "express";
import sequelize from "../../database/connection";
import { generateRandomInstituteNumber } from "../../services/generateRandomInstituteNumber.service";
import User from "../../database/models/user.model";
import { IExtendedRequest } from "../../middleware/type";
import { seed_data_0 } from "../../seed";
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { QueryTypes } from "sequelize";

export class InstituteController {
  /** @reateInstitute */
  static async createInstitute(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;
    console.log(req.user, " Data from Middleware");
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanNo = req.body.institutePanNo || null;

    if (
      !(
        instituteName ||
        instituteEmail ||
        institutePhoneNumber ||
        instituteAddress
      )
    ) {
      res.status(400).json({ message: "Data Invalid" });
      return;
    }

    const tableId = generateRandomInstituteNumber();

    const tableName = `institute_${tableId}`;
    // Create table
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS ${tableName} (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        instituteName VARCHAR(255) NOT NULL,
        instituteEmail VARCHAR(255) NOT NULL,
        institutePhoneNumber VARCHAR(255) NOT NULL,
        instituteAddress VARCHAR(255) NOT NULL,
        institutePanNo VARCHAR(255),
        instituteVatNo VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    );

    // Insert data
    await sequelize.query(
      `INSERT INTO ${tableName} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          institutePanNo,
          instituteVatNo,
        ],
      }
    );

    // users created tables for institute history query
    // creating a table to check each user created number of institute table details
    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      userId VARCHAR(255) REFERENCES users(id),
      instituteNumber INT UNIQUE
      )`);

    if (req.user) {
      await sequelize.query(
        `INSERT INTO user_institute (userId,instituteNumber) VALUES(?,?)`,
        {
          replacements: [req.user.id, tableId],
        }
      );
    }
    /*@updating_currentUser_currentInstituteNumber : For more check user.model.ts::file */
    if (req.user) {
      await User.update(
        {
          currentInstituteNumber: tableId,
          role: "institute",
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      // pass institute number for Teacher Table Query & so on
      req.user.currentInstituteNumber = tableId;

      next();
    }
  }

  /**  @createTeacherTable */
  static async createTeacherTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    if (!instituteNumber) return;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
              id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
              teacherName VARCHAR(255) NOT NULL, 
              teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
              teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
              teacherExperience VARCHAR(255), 
              teacherJoinedDate DATE, 
              teacherSalary VARCHAR(100),
              teacherPhoto VARCHAR(255), 
              teacherPassword VARCHAR(255),
              courseId VARCHAR(100) REFERENCES course_${instituteNumber}(id),
              createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
              updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
              )`);
    next();
  }

  /**  @createStudentTable */
  static async createStudentTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    try {
      if (!instituteNumber) return;
      await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    studentName VARCHAR(255) NOT NULL,
    studentEmail VARCHAR(255) NOT NULL UNIQUE,
    studentPhoneNumber VARCHAR(255) NOT NULL UNIQUE, 
    studentAddress TEXT,
    enrolledDate DATE,  
    studentImage VARCHAR(255), 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`);
      next();
    } catch (error) {
      console.log("Student Table Error ", error);
    }
  }

  /**  @createCategoryTable */
  static async createCategoryTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        categoryName VARCHAR(100) NOT NULL,
        categoryDescription TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

    // data seeding or loop query insert
    seed_data_0.forEach(async (seed) => {
      return await sequelize.query(
        `INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES(?,?)`,
        {
          replacements: [seed["categoryName"], seed["categoryDescription"]],
        }
      );
    });

    next();
  }

  /**  @createCourseTable */
  static async createCourseTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      courseName VARCHAR(255) NOT NULL UNIQUE,
      coursePrice VARCHAR(255) NOT NULL,
      courseDuration VARCHAR(100) NOT NULL,
      courseLevel ENUM('beginner','intermediate','advance') NOT NULL,
      courseThumbnail VARCHAR(200),
      courseDescription TEXT,
      teacherId VARCHAR(36) REFERENCES teacher_${instituteNumber}(id),
      categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber} (id),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        )`);
    next();
  }

  /** @Extras */
  /**  @createCourseChapter */
  static async createCourseChapter(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_chapter_${instituteNumber}(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      chapterName VARCHAR(255) NOT NULL,
      chapterDuration VARCHAR(100) NOT NULL,
      courseLevel ENUM('beginner','intermediate','advance') NOT NULL,
      courseId VARCHAR(255) REFERENCES course_${instituteNumber}(id) ON DELETE CASCADE ON UPDATE CASCADE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`);
    next();
    // EXPLAIN 🧑‍🏫 : courseId VARCHAR(255) REFERENCE course_${instituteNumber}(id) ON DELETE CASCADE ON UPDATE CASCADE
    // courseId.id reference from course_xyz and it should be dynamic showing when course.id is being updated or deleted
  }

  /**  @createChapterLessonTable */
  static async createChapterLessonTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS chapter_lesson_${instituteNumber}(
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    lessonName VARCHAR(255) NOT NULL,
    lessonDescription TEXT,
    lessonVideoUrl VARCHAR(200) NOT NULL,
    lessonThumbnailUrl VARCHAR(200) NOT NULL,
    chapterId VARCHAR(36) REFERENCES course_chapter_${instituteNumber}(id) ON DELETE CASCADE ON UPDATE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
      {
        type: QueryTypes.INSERT,
      }
    );
    // end of the chaining query/functions
    res.status(200).json({
      message: "Institute Successfully created  :  " + instituteNumber,
    });
  }
}
