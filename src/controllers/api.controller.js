import sendEmail from "../helpers/email.helper.js";
import sum from "../helpers/sum.helper.js";
import { fork } from "child_process";

const sumCb = (req, res) => {
    const result = sum();
    return res.json200(result);
  };
  
  const sumProcessCb = (req, res) => {
    const childProcess = fork("./src/helpers/sumProcess.helper.js");
    childProcess.send("start");
    childProcess.on("message", result => {
      return res.json200(result);
    });
  };
const sendEmailCb = async(req, res) => {
  const { email } = req.params;
  await sendEmail({ email });
  return res.json200("Email enviado");
};


  export { sumCb, sumProcessCb, sendEmailCb };