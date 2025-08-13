import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
  modelName: "user",
  timestamps: true,
})
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM("teacher", "student", "institute", "super-admin"),
    defaultValue: "student",
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
  })
  declare currentInstituteNumber: string;
}

/*@currentInstituteNumber : addon-column
This is added to make sure to filter-out that which table/database_id user created and working
on. 
user -> request table creation -> assigns tableName_table_id_999
user -> currentInstituteNumber : 999 
*/
