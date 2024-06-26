import React, { useState } from "react";
import Header from "src/components/common/Header";
import "./style.css";
import { Input } from "src/components/ui/input";

export default function Main() {
  const [activeToggle, setActiveToggle] = useState("beforeAdmission");

  const handleToggle = (toggleName) => {
    setActiveToggle(toggleName);
  };

  const toggles = [
    { name: "beforeAdmission", label: "입학 전" },
    { name: "afterAdmission", label: "입학 후" },
    { name: "study", label: "공부" },
    { name: "jobSearch", label: "취업준비" },
    { name: "afterEmployment", label: "취업 후" },
  ];

  const toggleContents = {
    beforeAdmission: [
      "어떤 학과가 있나요?",
      "예습하고 들어가면 좋나요?",
      "입학 전에 공부해야할게 있나요?",
    ],
    afterAdmission: [
      "무엇을 공부하는게 가장 좋을까요?",
      "내신관리 어떻게 해야하나요?",
      "대회를 많이 참여하는게 좋을까요?",
    ],
    study: [
      "자격증 따려고 하는데 어떻게 공부를 해야하나요?",
      "가장 많이 공부하는 언어가 어떤게 있나요?",
      "전공만 하고싶은데 일반과목을 굳이 해야하나요?",
    ],
    jobSearch: [
      "어떤 회사가 좋은가요?",
      "인턴쉽을 어디로 가야할까요?",
      "포트폴리오 어떻게 작성해요?",
    ],
    afterEmployment: ["회사 생활할 때 팁이 있을까요?"],

    beforeAdmissionAnswers: [
      "현재까지는 소프트웨어개발과, 게임개발과, 인공지능과가 있습니다.",
      "매우좋습니다.",
      "html, css, javascript등 기초를 배우시고 오는것을 추천드립니다.",
    ],
    afterAdmissionAnswers: [
      "자신의 관심 분야와 목표에 따라 다릅니다.",
      "열심히 하시면 됩니다.",
      "포트폴리오로 작성할 수 있으므로 적당한 대회참가를 추천드립니다.",
    ],
    studyAnswers: [
      "CBT 사이트와 유튜브 강의 그리고 자격증 책으로 공부하시는 것을 추천드립니다.",
      "현재 프론트는 리액트를 백앤드로는 nodeJs와 spring을 가장 많이 사용하고 있습니다.",
      "전공도 중요하지만 일반과목도 적당히 공부하시는 것이 좋습니다.",
    ],
    jobSearchAnswers: [
      "저희 사이트를 활용해주세요!",
      "전 안가봐서 잘 모르겠습니다.",
      "다른 사람들이 작성하고 공유해놓은 포트폴리오를 참고하시는 것을 추천드립니다.",
    ],
    afterEmploymentAnswers: ["잘해보세요"],
  };

  return (
    <div>
      <Header />
      <div className="gradient-card flex flex-col w-full py-20 justify-center items-center gap-5">
        <div className="text-4xl font-bold text-white">
          경소고 생활의 지름길
        </div>
        <Input
          className="w-full max-w-lg outline-none"
          placeholder="궁금한 점을 입력해보세요"
        />
      </div>
      <div className="text-center mt-10 text-3xl font-bold text-gray-800">
        Q. 자주 묻는 질문
      </div>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-5 gap-6">
          {toggles.map((toggle) => (
            <button
              key={toggle.name}
              className={`w-32 h-14 px-4 py-2 rounded-2xl focus:outline-none transition duration-300 ${
                activeToggle === toggle.name
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white"
              }`}
              onClick={() => handleToggle(toggle.name)}
            >
              {toggle.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <div className="max-w-2xl mx-auto">
          {toggleContents[activeToggle].map((content, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-md shadow-md">
              <p className="text-gray-800 font-bold mb-2">Q. {content}</p>
              {toggleContents[activeToggle + "Answers"] && (
                <p className="text-gray-600">
                  A. {toggleContents[activeToggle + "Answers"][index]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
