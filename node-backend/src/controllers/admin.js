import bcrypt from "bcryptjs";
import { v4 as uniqueID } from "uuid";
import jwt from "jsonwebtoken";
import AdminModel from "../models/admin.js";

export const adminLogin = async (req, res) => {
  const data = req.body;
  console.log("data", data);
  if (!data) {
    return res.status(401).json({ error: "Nera duomenu" });
  }
  const user = await AdminModel.findOne({ email: data.email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Neteisingi prisijungimo duomenys" });
  }

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordMatch) {
    return res
      .status(401)
      .json({ message: "Neteisingi prisijungimo duomenys" });
  }

  const token = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_RANDOMISER,
    { expiresIn: "12h" },
  );

  return res.status(200).json({ jwt: token });
};

export const adminRegister = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(401).json({ message: "Nėra duomenų" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data.password, salt);
  const id = uniqueID();

  const isUserExists = await AdminModel.findOne({
    $or: [{ email: data.email }, { id: id }],
  });

  if (isUserExists) {
    return res.status(404).json({
      message: `Vartotojas su el. paštu: ${data.email} jau registruotas.`,
    });
  }

  const user = new AdminModel({ id: id, ...data, password: hash });
  await user.save();

  const token = jwt.sign(
    { email: data.email, userId: id },
    process.env.JWT_RANDOMISER,
    { expiresIn: "12h" },
  );

  return res
    .status(201)
    .json({ jwt: token, message: "Vartotojas sekmingai užregistruotas" });
};
