import nodemailer from "nodemailer";
import { envConfig } from "../config/config";
interface IMailInformation {
  to: string;
  subject: string;
  text: string;
}

const sendMail = (mailInformation: IMailInformation) => {
  // mail pathaune logic goes here :
  // step 1 : create nodemailer Transport
  // transporter/transport ---> configuration setup lai transport
  // xyz@gmail.com -- mail snt huncha
  // xyz@yahoo.com -->
  // auth --> tapai ko/ tapai ko business ko gmail, password k ho tyo hamro auth ho,
  // sender ko gmail/password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envConfig.NodeMailer,
    },
  });
};
