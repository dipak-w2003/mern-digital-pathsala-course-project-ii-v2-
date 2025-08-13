import { Response } from "express";
import { IExtendedRequest } from "../../../../middleware/type";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

export class LessonController {
  static async createChapterLesson(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const {
      lessonName,
      lessonDescription,
      lessonVideoUrl,
      lessonThumbnailUrl,
      chapterId,
    } = req.body;
    if (
      !lessonName ||
      !lessonDescription ||
      !lessonVideoUrl ||
      !lessonThumbnailUrl ||
      !chapterId
    ) {
      return res.status(400).json({
        message:
          "Please provide lessonName, lessonDescription,lessonVideoUrl,lessonThumbnailUrl,chapterId",
      });
    }
    await sequelize.query(
      `INSERT INTO chapter_lesson_${instituteNumber}(lessonName,lessonDescription,lessonVideoUrl,lessonThumbnailUrl,chapterId) VALUES(?,?,?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          lessonName,
          lessonDescription,
          lessonVideoUrl,
          lessonThumbnailUrl,
          chapterId,
        ],
      }
    );
    res.status(200).json({
      message: "lesson added to chapter",
    });
  }

  static async fetchChapterLesson(req: IExtendedRequest, res: Response) {
    const { chapterId } = req.params;
    const instituteNumber = req.user?.currentInstituteNumber;
    if (!chapterId)
      return res.status(400).json({ message: "please provide chapterId" });
    const data = await sequelize.query(
      `SELECT * FROM chapter_lesson_${instituteNumber} WHERE chapterId=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [chapterId],
      }
    );
    res.status(200).json({
      message: "lessons fetched",
      data,
    });
  }
}
