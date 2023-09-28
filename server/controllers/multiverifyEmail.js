import axios from 'axios';
import emailValidator from 'deep-email-validator';

export const multiverifyEmails = async (req, res) => {
  try {
    const emails = req.body.emails;
    const results = [];

    async function isEmailValid(email) {
      const result = await emailValidator.validate(email);
      return { email, result };
    }

    for (const email of emails) {
      const result = await isEmailValid(email);
      results.push(result);
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({
      message: 'Server Error',
    });
  }
};
