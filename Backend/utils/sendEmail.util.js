
import nodemailer from "nodemailer";

export async function sendEnrollmentEmail({ toEmail, studentId, lastName, tempPassword }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  
  const mailOptions = {
    from: `"QCU Registrar" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Enrollment Confirmation",
    text: `Good day, Mr./Ms. ${lastName},

    QCU Enrollment Confirmation & Reminder to logged Student Portal Account using the following credentials: 

    Student ID: ${studentId}
    Temporary Password: ${tempPassword}

    Note: The password is only temporary, you will be prompted to change the password once you logged in one of our systems.

    If you did not request this, contact the admin.
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendAdminEmail({ toEmail, adminId, role, lastName, tempPassword }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  
  const mailOptions = {
    from: `"Super Admin" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Admin Account Creation",
    text: `Good day, Mr./Ms. ${lastName},

    You are now being registered as ${role} in Enrollment Management System. Access the dashboard using the following credentials:

    Admin ID: ${adminId}
    Temporary Password: ${tempPassword}

    Note: The password is only temporary, you will be prompted to change the password once you logged in one of our systems.

    If you did not request this, contact the admin.
    `,
  };

  return transporter.sendMail(mailOptions);
}
