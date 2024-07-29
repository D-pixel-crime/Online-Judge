import { Submission } from "../../models/Submissions.js";

export const getSubmissions = async (req, res) => {
  const userId = req.cookies.userId;

  try {
    const submissions = await Submission.find({ userId });
    return res.status(200).json({ submissions });
  } catch (error) {
    console.log(`Error fetching submissions: ${error}`.bgRed);
    return res.status(500).json({ error: `Error fetching submissions` });
  }
};
