const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/sendMessage", (req, res, next) => {
  const { who, whom, content } = req.body;

  console.log(who);
  console.log(whom);
  console.log(content);

  const insertQuery = `
  INSERT INTO message (
	    who,
        whom,
        content,
        createdAt
  ) VALUES (
	    ${who},
        ${whom},
        "${content}",
        now()
 )
  
  `;

  try {
    db.query(insertQuery, (err, rows) => {
      if (err) {
        throw "데이터베이스 접근 실패";
      }

      return res.status(201).send("성공");
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("메세지 전송에 실패하셨습니다.");
  }
});

router.post("/getMessage", (req, res, next) => {
  const { myId } = req.body;

  const selectquery = `
    SELECT A.id,
	       A.who,
           B.nickname     AS  whoName,
           A.whom,
           c.nickname     AS whomName,
           A.content,
           A.isRead,
           A.createdAt
      FROM message        A
     INNER
      JOIN user           B
        ON A.who = B.id
     INNER 
      JOIN user           c
  	    ON A.whom = c.id
     WHERE A.who = ${myId}
        OR A.whom = ${myId}
     ORDER BY createdAt DESC
  `;

  try {
    db.query(selectquery, (err, rows) => {
      if (err) {
        console.error(err);
        throw "쿼리 실행 실패";
      }

      return res.status(200).json(rows);
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("메세지 조회에 실패하셨습니다.");
  }
});

module.exports = router;
