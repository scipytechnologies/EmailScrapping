import axios from "axios";
import emailValidator from "deep-email-validator";

export const verifyEmail = async (req, res) => {
  try {
    const email = req.body.email;
    isEmailValid(email);
  async function isEmailValid(email) {
      const result = await emailValidator.validate(email);
      res.status(200).json(result); 
    };
   
  } catch (error) {
    return res.status(401).json({
      message: "Server Error",
    });
  }
};
