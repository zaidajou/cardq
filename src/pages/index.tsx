"use client";

import React, { useState } from "react";

// FlipCard component
function FlipCard({
  subject,
  question,
  value,
}: {
  subject: string;
  question: string;
  value: number;
}) {
  const [flipped, setFlipped] = useState(false);

  const cardStyle: React.CSSProperties = {
    width: "250px",
    height: "150px",
    perspective: "1000px",
    marginTop: "8px",
    cursor: "pointer",
  };

  const cardInnerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
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
    fontSize: "16px",
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
    <div style={cardStyle} onClick={() => setFlipped(!flipped)}>
      <div style={cardInnerStyle}>
        <div style={frontStyle}>
          <div>
            <strong>{subject}</strong>
            <p>{question}</p>
          </div>
        </div>
        <div style={backStyle}>
          <div>
            <p>الدرجة: {value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function Index() {
  const subjects = [
    "التربية الإسلامية",
    "التربية الوطنية",
    "الرياضيات",
    "العلوم",
  ];
  const questions = [
    "السؤال الأول",
    "السؤال الثاني",
    "السؤال الثالث",
    "السؤال الرابع",
  ];
  const scores = [
    [10, 10, 10, 10],
    [20, 20, 20, 20],
    [30, 30, 30, 30],
    [40, 40, 40, 40],
  ];

  return (
    <div dir="rtl" style={{ padding: 24 }}>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            {subjects.map((subj, i) => (
              <th key={i}>{subj}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scores.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((score, colIndex) => (
                <td key={colIndex}>
                  <FlipCard
                    subject={subjects[colIndex]}
                    question={questions[rowIndex]}
                    value={score}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
