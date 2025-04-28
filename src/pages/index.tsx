"use client";

import React, { useState } from "react";

// FlipCard component for each table cell
function FlipCard({
  subject,
  question,
  value,
}: {
  subject: string;
  question: string;
  value: number;
}) {
  const [flipped, setFlipped] = useState(true);

  const cardStyle: React.CSSProperties = {
    width: "150px",
    height: "100px",
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
            <p>معلومات إضافية أو إجابة</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with table layout and column headers
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
    <div style={{ padding: "20px", direction: "rtl" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={subjectCellStyle}>الموضوع</th>
            {questions.map((question, idx) => (
              <th key={idx} style={tableHeaderStyle}>
                {question}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, colIndex) => (
            <tr key={colIndex}>
              <td style={subjectCellStyle}>{subject}</td>
              {questions.map((question, rowIndex) => (
                <td key={rowIndex} style={tableCellStyle}>
                  <FlipCard
                    subject={subject}
                    question={question}
                    value={scores[colIndex][rowIndex]}
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
  backgroundColor: "#90ee90", // أخضر فاتح
  color: "#000", // نص أسود أوضح
  fontWeight: "bold",
};
