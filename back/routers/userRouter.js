const express = require("express");
const db = require("../db");
const nodemailer = require("nodemailer");
const smtpPool = require("nodemailer-smtp-pool");
const dotenv = require("dotenv");
dotenv.config();

const smtpTransport = nodemailer.createTransport(
  smtpPool({
    service: "Gmail",
    host: "localhost",
    port: "465",
    tls: {
      rejectUnauthorize: false,
    },

    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    maxConnections: 5,
    maxMessages: 10,
  })
);

const sendMail = async (email) => {
  await smtpTransport.sendMail(email, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email Send Success : ", info);
    }
  });
};

const router = express.Router();

router.post("/emailCheck", (req, res, next) => {
  const { email } = req.body;

  const searchQuery = `
  SELECT      id
    FROM      user
   WHERE      email = "${email}"
  `;

  db.query(searchQuery, (err, rows) => {
    if (rows.length === 0) {
      return res.status(400).json({ result: false });
    }

    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num3 = Math.floor(Math.random() * 10);
    const num4 = Math.floor(Math.random() * 10);

    const code = "" + num1 + num2 + num3 + num4;

    console.log(code);
    console.log(rows[0].id);

    const codeUpdateQuery = `
        UPDATE user
           SET secretCode =  "${code}", 
               updatedAt = now()
         WHERE id = "${rows[0].id}"; 
    
    `;

    db.query(codeUpdateQuery, (err, rows) => {
      if (err) {
        return res.status(400).json({ result: false });
      }

      const sendData = {
        from: "4leaf-edu.com",
        to: email,
        subject: "안녕하세요 Ruby-talk 로그인 보안코드 입니다.",
        html: `보안코드는 <h2>${code}</h2> 입니다.`,
      };

      sendMail(sendData);
    });
  });

  return res.status(200).send("로그인 확인");
});

router.post("/checkCode", (req, res, next) => {
  const { email, code } = req.body;

  try {
    const checkQuery = `
      SELECT  id,
              email,
              nickname,
              avatar,
              statusMsg
        FROM  user
       WHERE  email = "${email}"
         AND  secretCode = ${code}
    `;

    db.query(checkQuery, (err, rows) => {
      if (err) {
        return res.status(400).send("로그인을 다시 시도해주세요");
      }
      console.log(rows);

      return res.status(200).json(rows[0]);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("보안코드가 일치하지 않습니다.");
  }
});

router.post("/friend/list", (req, res, next) => {
  const { me } = req.body;

  console.log(me);

  try {
    const listQuery = `
      SELECT id,
             nickname,
             statusMsg,
             avatar
        FROM user
       WHERE id IN (
                      SELECT  whom
                        FROM  friend
                       WHERE  who = ${me}
                   )
    
    `;

    db.query(listQuery, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(400).send("친구목록을 불러오는데 실패하셨습니다.");
      }
      return res.status(200).json(rows);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("친구목록을 불러오는데 실패하엿습니다.");
  }
});

module.exports = router;
