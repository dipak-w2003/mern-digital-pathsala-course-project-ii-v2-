import bcrypt, { hashSync } from "bcrypt";
const generateRandomPassword = (teacherName: string) => {
  const randomNumber = Math.floor(1000 + Math.random() * 90000);

  const hashed = bcrypt.hashSync(`${randomNumber}_${teacherName}`, 10);

  const passwordData = {
    // for table store
    hashedVersion: hashed,
    // for mailing
    plainVersion: `${randomNumber}_${teacherName}`,
  };
  return passwordData;
  // $2b$10$BQDQyvzn5UvxzzcTNhoi8e1lV.HOCCDmiBSIhWmfrCLwLwLAEd1OS
};
export default generateRandomPassword;
// console.log(generayeRandomPassword("Wiz Khalifa"));
