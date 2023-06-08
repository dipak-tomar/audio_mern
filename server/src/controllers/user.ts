import { CreateUser } from "@/@types/user";
import User from "@/models/user";
import EmailVerificationToken from "@/models/emailVerificationToken";
import { generateToken } from "@/utils/helper";
import { MAIL_TRAP_PASSWORD, MAIL_TRAP_USER } from "@/utils/variables";
import { RequestHandler } from "express";
import nodemailer from "nodemailer";

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;
  //    const newUser = new User({email, password, name});
  //     newUser.save()

  const user = await User.create({ name, email, password });
  //Send verification email
  let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAIL_TRAP_USER,
      pass: MAIL_TRAP_PASSWORD,
    },
  });
  console.log("transport", transport);
  const token = generateToken(6);

  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  await transport.sendMail({
    from: user.email, // sender address
    to: "auth@myapp.com", // list of receivers
    subject: "Hello ✔", // Subject line

    html: `<h1>Your verification token is ${token}</h1>`, // html body
  });

  res.json({ user });
};
