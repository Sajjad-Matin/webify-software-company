import Message from "../models/Message.js";
import nodemailer from "nodemailer";

export async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).send(messages);
  } catch (error) {
    console.error("Error in getMessages Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createMessage(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      subject,
      message: messageBody,
    } = req.body;
    if (!firstName || !lastName || !email || !subject || !messageBody) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const created = await Message.create({
      firstName,
      lastName,
      email,
      subject,
      message: messageBody,
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${firstName} ${lastName}: ${subject}`,
      text: messageBody,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(201)
      .json({ message: "Message sent successfully", data: created });
  } catch (error) {
    console.error("Error in createMessage Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteMessage(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Message id required" });

    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });

    return res.status(200).json({ message: "Message deleted", data: deleted });
  } catch (error) {
    console.error("Error in deleteMessage Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
