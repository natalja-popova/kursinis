import { sendCourseRegistrationEmail } from "../services/sendMail.js";
export const RegistrationEmail = async (req, res) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course) {
    return res.status(400).json({ message: "Trūksta duomenų" });
  }
  try {
    await sendCourseRegistrationEmail({ name, email, course });
    return res
      .status(200)
      .json({ message: "Registracijos el. laiškas išsiustas" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Nepavyko išsiusti el. laiško." });
  }
};
