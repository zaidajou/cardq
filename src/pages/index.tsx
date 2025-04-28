"use client";

import React, { useState } from "react";

function FlipCard({
  subject,
  question,
  value,
  onShowAnswer,
  disabled,
}: {
  subject: string;
  question: string;
  value: number;
  onShowAnswer: () => void;
  disabled: boolean;
}) {
  const cardStyle: React.CSSProperties = {
    width: "150px",
    height: "100px",
    perspective: "1000px",
    marginTop: "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };

  const cardInnerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
    transform: disabled ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const cardFaceStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    fontSize: "14px",
    padding: "10px",
    textAlign: "center",
    color: "#fff",
  };

  const frontStyle: React.CSSProperties = {
    ...cardFaceStyle,
    backgroundColor: "#6A2C70",
  };

  const backStyle: React.CSSProperties = {
    ...cardFaceStyle,
    backgroundColor: "#F08A5D",
    transform: "rotateY(180deg)",
  };

  return (
    <div style={cardStyle}>
      <div style={cardInnerStyle}>
        <div style={frontStyle}>
          <div>
            <strong>{subject}</strong>
          </div>
        </div>
        {disabled && (
          <div style={backStyle}>
            <div>
              <p>تم عرض الإجابة</p>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onShowAnswer}
        disabled={disabled}
        style={{
          marginTop: "5px",
          width: "100%",
          backgroundColor: "#F08A5D",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px",
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: "12px",
        }}
      >
        عرض الإجابة
      </button>
    </div>
  );
}

export default function Index() {
  const subjects = [
    "التربية الإسلامية",
    "التربية الوطنية",
    "الرياضيات",
    "العلوم",
  ];
  const questions = [
    { q: "ما هو عدد أركان الإسلام؟" },
    { q: "ما هي عاصمة الأردن؟" },
    { q: "ما هو ناتج 5 × 6؟" },
    { q: "ما هي حالات المادة؟" },
  ];
  const scores = [
    [10, 10, 10, 10],
    [20, 20, 20, 20],
    [30, 30, 30, 30],
    [40, 40, 40, 40],
  ];

  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [disabledCards, setDisabledCards] = useState<{
    [key: string]: boolean;
  }>({});

  function handleShowAnswer(subject: string, question: string, value: number) {
    // عرض الإجابة
    const isCorrect = confirm(
      `السؤال: ${question}\n\nالإجابة الصحيحة: (أدخل هنا الإجابة النموذجية)\n\nهل أجبت بشكل صحيح؟`
    );

    if (isCorrect) {
      if (currentPlayer === 1) {
        setPlayerOneScore((prev) => prev + value);
      } else {
        setPlayerTwoScore((prev) => prev + value);
      }
    }

    setDisabledCards((prev) => ({
      ...prev,
      [`${subject}-${question}`]: true,
    }));

    // تبديل اللاعب
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  }

  function finishGame() {
    let winner = "تعادل!";
    if (playerOneScore > playerTwoScore) {
      winner = "اللاعب الأول فاز!";
    } else if (playerTwoScore > playerOneScore) {
      winner = "اللاعب الثاني فاز!";
    }
    alert(
      `اللعبة انتهت!\nالنتيجة:\n${winner}\n\nPlayer 1: ${playerOneScore} نقطة\nPlayer 2: ${playerTwoScore} نقطة`
    );
  }

  return (
    <div style={{ padding: "20px", direction: "rtl" }}>
      <h2>
        الدور الحالي: {currentPlayer === 1 ? "اللاعب الأول" : "اللاعب الثاني"}
      </h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={subjectCellStyle}>الموضوع</th>
            {questions.map((question, idx) => (
              <th key={idx} style={tableHeaderStyle}>
                السؤال {idx + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, colIndex) => (
            <tr key={colIndex}>
              <td style={subjectCellStyle}>{subject}</td>
              {questions.map((question, rowIndex) => {
                const key = `${subject}-${question.q}`;
                return (
                  <td key={rowIndex} style={tableCellStyle}>
                    <FlipCard
                      subject={subject}
                      question={question.q}
                      value={scores[colIndex][rowIndex]}
                      onShowAnswer={() =>
                        handleShowAnswer(
                          subject,
                          question.q,
                          scores[colIndex][rowIndex]
                        )
                      }
                      disabled={disabledCards[key] || false}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={finishGame}
        style={{
          marginTop: "20px",
          backgroundColor: "#6A2C70",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        إنهاء اللعبة
      </button>

      <div style={{ marginTop: "20px" }}>
        <p>نقاط اللاعب الأول: {playerOneScore}</p>
        <p>نقاط اللاعب الثاني: {playerTwoScore}</p>
      </div>
    </div>
  );
}

// Styles
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const tableHeaderStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "#6A2C70",
  color: "#fff",
};

const tableCellStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "#c4c4c4",
  color: "#fff",
};

const subjectCellStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "#90ee90",
  color: "#000",
  fontWeight: "bold",
};
