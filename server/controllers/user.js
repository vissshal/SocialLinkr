import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(404).json({ message: "InValid Credential" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log(existingUser);
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const signup = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(404).json("User Already Exist");
    if (password !== confirmPassword)
      res.status(404).json("Password must same as confirm Password");
    const hashPassword = await bcryptjs.hash(password, 12);
    const result = await User.create({
      name: `${firstname} ${lastname}`,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    console.log(result);

    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const googleLogin = async (request, res) => {
  // console.log("request se data aar ahi \t", request.body);
  // const existingUser = await User.findOne({ email });
  const userfound = await User.findOne({ email: request.body.email });

  if (userfound) {
    // response.send(userfound);
    const token = jwt.sign(
      { email: userfound.email, id: userfound._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log(userfound);
    res.status(200).json({ result: userfound, token });
  } else {
    const hashPassword = await bcryptjs.hash("1234", 12);
    const signUpUser = new User({
      name: `${request.body.given_name} ${request.body.family_name}`,
      password: hashPassword,
      email: request.body.email,
    });
    signUpUser
      .save()
      .then((result1) => {
        const token = jwt.sign(
          { email: result1.email, id: result1._id },
          "test",
          { expiresIn: "1h" }
        );
        console.log(result1);
        res.status(200).json({ result: result1, token });
      })
      .catch((error) => {
        response.send(error);
      });
  }
};
