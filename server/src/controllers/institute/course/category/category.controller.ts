import { Response } from "express";
import { IExtendedRequest } from "../../../../middleware/type";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

export class CategoryController {
  static async createCategory(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const { categoryName, categoryDescription } = req.body;
    if (!(categoryName || categoryDescription)) {
      return res.status(400).json({
        message: " Provide categoryName , categoryDescription !!",
      });
    }
    await sequelize.query(
      `INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES(?,?)`,
      {
        replacements: [categoryName, categoryDescription],
      },
    );
    const [categoryData]: { id: string, createdAt: Date }[] = await sequelize.query(`SELECT id,createdAt FROM category_${instituteNumber}`, {
      replacements: [categoryName],
      type: QueryTypes.SELECT
    })

    res.status(200).json({
      message: "Category added successfully",
      data: {
        categoryName,
        categoryDescription,
        id: categoryData.id,
        createdAt: categoryData.createdAt
      }
    });
  }
  static async getCategories(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const allCategories = await sequelize.query(
      `SELECT * FROM category_${instituteNumber}`,
      {
        type: QueryTypes.SELECT,
      },
    );
    console.log("all ::: ", allCategories)
    return res.status(200).json({
      message: "Get All Categories",
      data: allCategories,
    });
  }

  static async deleteCategory(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const categoryId = req.params.id;

    await sequelize.query(
      `DELETE FROM category_${instituteNumber} where id = ?`,
      {
        replacements: [categoryId],
        type: QueryTypes.DELETE,
      },
    );

    res.status(200).json({
      message: "Category Deleted Successfully !!",
    });
  }
}
