import { Submission } from "../../models/Submissions.js";

export const storeSubmission = async (req, res) => {
  const { title, status, runtime } = req.body;
  const userId = req.cookies.userId;

  try {
    await Submission.create({
      userId,
      title,
      status,
      runtime,
      createdAt: new Date().toLocaleString(),
    });
    return res.status(201).json({ success: "Submission stored successfully" });
  } catch (error) {
    console.log(`Error storing submission: ${error}`.bgRed);
    return res.status(500).json({ error: `Error storing submission` });
  }
};
