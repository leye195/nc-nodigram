import { adjWords, nounWords } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";
import "./env";

const MAILGUN_API = process.env.MAILGUN_API;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjWords.length);
  return `${adjWords[randomNumber]} ${nounWords[randomNumber]}`;
};

const sendMail = (email) => {
  const options = {
    auth: {
      api_key: MAILGUN_API,
      domain: MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(options));
  return client.sendMail(email, (err, info) => {
    if (err) console.log(err);
  });
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "admin@nodigram.com",
    to: address,
    subject: "Login Secret from Nodigram",
    html: `Hello! Your login Secret is <strong>${secret}</strong>.<br/> Copy paste on the App/Website to log in`,
  };
  return sendMail(email);
};

export const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY);
  return token;
};
