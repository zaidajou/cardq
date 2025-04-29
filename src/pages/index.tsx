"use client";

import React, { useState } from "react";

function FlipCard({
  subject,
  question,
  value,
  onShowQuestion,
  isQuestionVisible,
  isSelected,
}: {
  subject: string;
  question: string;
  value: number;
  onShowQuestion: () => void;
  isQuestionVisible: boolean;
  isSelected: boolean;
}) {
  const cardStyle: React.CSSProperties = {
    width: "150px",
    height: "100px",
    perspective: "1000px",
    marginTop: "8px",
    cursor: "pointer",
    border: isSelected ? "2px solid #F08A5D" : "none",
  };

  const cardInnerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
    transform: isQuestionVisible ? "rotateY(180deg)" : "rotateY(0deg)",
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
    <div style={cardStyle} onClick={onShowQuestion}>
      <div style={cardInnerStyle}>
        <div style={frontStyle}>
          <div>
            <strong>{subject}</strong>
          </div>
        </div>
        <div style={backStyle}>
          <div>
            <p>{question}</p>
          </div>
        </div>
      </div>
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
    { q: "ما هو عدد أركان الإسلام؟", answer: "خمسة" },
    { q: "ما هي عاصمة الأردن؟", answer: "عمان" },
    { q: "ما هو ناتج 5 × 6؟", answer: "30" },
    { q: "ما هي حالات المادة؟", answer: "صلبة، سائلة، غازية" },
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
  const [visibleQuestions, setVisibleQuestions] = useState<{
    [key: string]: boolean;
  }>({});
  const [answeredCards, setAnsweredCards] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const currentQuestion = selectedCard
    ? questions.find((q) => q.q === selectedCard.split("-")[1])?.q
    : null;
  const currentValue = selectedCard
    ? scores[subjects.indexOf(selectedCard.split("-")[0])][
        questions.findIndex((q) => q.q === selectedCard.split("-")[1])
      ]
    : 0;

  function handleShowQuestion(subject: string, question: string) {
    const key = `${subject}-${question}`;
    setVisibleQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSelectedCard(key);
  }

  function handleShowAnswer() {
    if (!selectedCard) {
      return; // Should not happen if button is disabled correctly
    }
    const [subject, question] = selectedCard.split("-");
    const value =
      scores[subjects.indexOf(subject)][
        questions.findIndex((q) => q.q === question)
      ];

    const isCorrect = confirm(
      `السؤال: ${question}\n\nالإجابة الصحيحة: ${
        questions.find((q) => q.q === question)?.answer
      }\n\nهل أجبت بشكل صحيح؟`
    );

    if (isCorrect) {
      if (currentPlayer === 1) {
        setPlayerOneScore((prev) => prev + value);
      } else {
        setPlayerTwoScore((prev) => prev + value);
      }
    }

    setAnsweredCards((prev) => ({
      ...prev,
      [selectedCard]: true,
    }));
    setVisibleQuestions((prev) => ({
      ...prev,
      [selectedCard]: true, // Keep the card flipped
    }));
    setSelectedCard(null); // Reset selected card after answering

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
            {questions.map((_, idx) => (
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
              {questions.map((questionObj, rowIndex) => {
                const key = `${subject}-${questionObj.q}`;
                const isCardSelected = selectedCard === key;
                return (
                  <td key={rowIndex} style={tableCellStyle}>
                    <FlipCard
                      subject={subject}
                      question={questionObj.q}
                      value={scores[colIndex][rowIndex]}
                      onShowQuestion={() => handleShowQuestion(subject, questionObj.q)}
                      isQuestionVisible={visibleQuestions[key] || false}
                      isSelected={isCardSelected}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleShowAnswer}
        disabled={!selectedCard || answeredCards[selectedCard]}
        style={{
          marginTop: "20px",
          backgroundColor: selectedCard && !answeredCards[selectedCard] ? "#F08A5D" : "#ccc",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: selectedCard && !answeredCards[selectedCard] ? "pointer" : "not-allowed",
          fontSize: "16px",
        }}
      >
        {selectedCard && !answeredCards[selectedCard]
          ? "عرض الإجابة"
          : "اختر بطاقة"}
      </button>

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
          marginLeft: "10px",
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
  backgroundColor: "#f9f9f9",
};

const subjectCellStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "#e0f7fa",
  fontWeight: "bold",
};
