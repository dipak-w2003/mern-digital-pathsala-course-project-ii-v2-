import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";
import { Response } from "express";
import generateRandomPassword from "../../../services/generateRandomPassword.service";

export class TeacherController {
  // Create Teacher
  static async createTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const {
      teacherName,
      teacherEmail,
      teacherPhoneNumber,
      teacherExperience,
      teacherSalary,
      teacherJoinedDate,
      courseId,
    } = req.body;
    const teacherPhoto = req.file
      ? req.file.path
      : "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";
    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPhoneNumber ||
      !teacherExperience ||
      !teacherSalary ||
      !teacherJoinedDate ||
      !courseId
    ) {
      return res.status(400).json({
        message:
          "Please provide teacherName,teacherEmail,teacherPhoneNumber,teacherExperience,teacherSalary,teacherJoinedDate,courseId",
      });
    }
    // Generate Custom Password for 'teacherPassword'
    const dataPassword = generateRandomPassword(teacherName);
    await sequelize.query(
      `INSERT INTO teacher_${instituteNumber}(
    teacherName, teacherEmail, teacherPhoneNumber, teacherExperience,
    teacherJoinedDate, teacherSalary, teacherPhoto, teacherPassword, courseId) VALUES(?,?,?,?,?,?,?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          teacherName,
          teacherEmail,
          teacherPhoneNumber,
          teacherExperience,
          teacherJoinedDate,
          teacherSalary,
          teacherPhoto,
          dataPassword.hashedVersion,
          courseId,
        ],
      }
    );
    const teacherData: { id: string }[] = await sequelize.query(
      `SELECT * FROM teacher_${instituteNumber} WHERE teacherEmail = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [teacherEmail],
      }
    );
    // Holded Idea
    //  QueryTypes.UPDATE,
    //     replacements: [teacherData[0].id, courseId],
    //   }
    // );

    // send mail function goes here
    // const mailInformation = {
    //     to : teacherEmail,
    //     subject : "Welcome to our saas MERN project",
    //     text : `Welcome xa hai, <b>Email</b> : ${teacherEmail}, Password : ${data.plainVersion}, Your Institute Number : ${instituteNumber}`
    // }
    // await sendMail(mailInformation)

    res.status(200).json({
      message:`Teacher Created Successfully !! :ℹ️"`,
      data:teacherData
    });
    /*@CreateTeacher Flow
    1.Grab {Essentials Request : teacherName,
      teacherEmail,
      teacherPhoneNumber,
      teacherExperience,
      teacherjoinedDate,
      teacherSalary,
      courseId,}
    1.1 teacherPhoto = req.file ? req.file.path : null
    2. Insert Query (teacher_${instituteNumber})
    3. Grab Teacher Id : Select Query : id
    4. holded :: Update Query course_${instituteNumber} teacherId where id matches 
    */
  }

  // GET Teachers
  static async readTeachers(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const teachers = await sequelize.query(
      `SELECT t.*,c.courseName FROM teacher_${instituteNumber} AS t JOIN course_${instituteNumber} AS c ON t.courseId = c.id`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      message: "teachers fetched",
      data: teachers,
    });
    console.log(teachers);
  }
  // GET Teacher
  static async readTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const teacherId = req.params.id;
    const teacherData = await sequelize.query(
      `SELECT t.*,c.courseName FROM teacher_${instituteNumber} AS t JOIN course_${instituteNumber} AS c WHERE t.courseId = c.id`,
      {
        replacements: [teacherId],
        type: QueryTypes.SELECT,
      }
    );
    console.log(teacherData);
    res.status(200).json({
      message: "Fetched Single Teacher Data 🧑‍🏫",
      data: teacherData,
    });
  }

  // DELETE Teacher
  static async deleteTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const teacherId = req.params.id;
    await sequelize.query(
      `DELETE FROM teacher_${instituteNumber} WHERE id = ?`,
      {
        type: QueryTypes.DELETE,
        replacements: [teacherId],
      }
    );
    res.status(200).json({
      message: "Teacher Delete Successfully : 🟢",
    });
  }
}
