import React from "react";
import Header from "src/components/common/Header";

export default function Portfolio() {
  const data = [
    {
      name: "남세원",
      intro: "수정과 확장에 유연한 코드를 짜는 것에 관심이 많습니다.",
      category: "백엔드",
      tech: [
        "Java",
        "Spring Boot",
        "JPA",
        "querydsl",
        "JavaScript",
        "TypeScript",
        "Node.js",
      ],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/35437/%EB%82%A8%EC%84%B8%EC%9B%90",
      portfolio: "",
      blog: "",
    },
    {
      name: "김민재",
      intro:
        "현재의 쾌락보다는 지속 가능한 행복을 추구할 수있는 미래를 그리기위해 노력하는 개발자입니다.",
      category: "프론트엔드",
      tech: [
        "React",
        "JavaScript",
        "HTML/CSS",
        "redux-toolkit",
        "tailwind-css",
        "TypeScript",
      ],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/795910/%EA%B9%80%EB%AF%BC%EC%9E%AC",
      portfolio: "",
      blog: "https://crow07.tistory.com/",
    },
    {
      name: "김민재",
      intro:
        "현재의 쾌락보다는 지속 가능한 행복을 추구할 수있는 미래를 그리기위해 노력하는 개발자입니다.",
      category: "프론트엔드",
      tech: [
        "React",
        "JavaScript",
        "HTML/CSS",
        "redux-toolkit",
        "tailwind-css",
        "TypeScript",
      ],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/795910/%EA%B9%80%EB%AF%BC%EC%9E%AC",
      portfolio: "",
      blog: "https://crow07.tistory.com/",
    },
    {
      name: "김민재",
      intro:
        "현재의 쾌락보다는 지속 가능한 행복을 추구할 수있는 미래를 그리기위해 노력하는 개발자입니다.",
      category: "프론트엔드",
      tech: [
        "React",
        "JavaScript",
        "HTML/CSS",
        "redux-toolkit",
        "tailwind-css",
        "TypeScript",
      ],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/795910/%EA%B9%80%EB%AF%BC%EC%9E%AC",
      portfolio: "",
      blog: "https://crow07.tistory.com/",
    },
    {
      name: "남세원",
      intro: "수정과 확장에 유연한 코드를 짜는 것에 관심이 많습니다.",
      category: "백엔드",
      tech: [
        "Java",
        "Spring Boot",
        "JPA",
        "querydsl",
        "JavaScript",
        "TypeScript",
        "Node.js",
      ],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/35437/%EB%82%A8%EC%84%B8%EC%9B%90",
      portfolio: "",
      blog: "",
    },
    {
      name: "김민재",
      intro:
        "현재의 쾌락보다는 지속 가능한 행복을 추구할 수있는 미래를 그리기위해 노력하는 개발자입니다.",
      category: "프론트엔드",
      tech: [
        "React",
        "JavaScript",
        "HTML/CSS",
        "redux-toolkit",
        "tailwind-css",
        "TypeScript",
      ],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/795910/%EA%B9%80%EB%AF%BC%EC%9E%AC",
      portfolio: "",
      blog: "https://crow07.tistory.com/",
    },
    {
      name: "김민재",
      intro:
        "현재의 쾌락보다는 지속 가능한 행복을 추구할 수있는 미래를 그리기위해 노력하는 개발자입니다.",
      category: "프론트엔드",
      tech: [
        "React",
        "JavaScript",
        "HTML/CSS",
        "redux-toolkit",
        "tailwind-css",
        "TypeScript",
      ],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/795910/%EA%B9%80%EB%AF%BC%EC%9E%AC",
      portfolio: "",
      blog: "https://crow07.tistory.com/",
    },
    {
      name: "김민재",
      intro:
        "현재의 쾌락보다는 지속 가능한 행복을 추구할 수있는 미래를 그리기위해 노력하는 개발자입니다.",
      category: "프론트엔드",
      tech: [
        "React",
        "JavaScript",
        "HTML/CSS",
        "redux-toolkit",
        "tailwind-css",
        "TypeScript",
      ],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/795910/%EA%B9%80%EB%AF%BC%EC%9E%AC",
      portfolio: "",
      blog: "https://crow07.tistory.com/",
    },
  ];
  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto grid grid-cols-4 auto-rows-auto gap-y-5">
        {data.map(
          ({
            name,
            intro,
            resume,
            portfolio,
            blog,
            category,
            tech,
            career,
          }) => (
            <div className="w-60">
              <div className="w-full h-60 bg-slate-500 rounded-lg"></div>
              <div className="w-full">
                <div className="flex items-center gap-1 mt-2">
                  <div className="font-bold text-lg">{name}</div>
                  <div className="text-sm text-gray-600">{category}</div>
                </div>
                <div className="flex text-xs text-gray-500 mb-4">
                  <div>연차</div>
                  <div className="mr-1 ml-1">·</div>
                  <div>{career}</div>
                </div>
                <div className="w-full text-sm">
                  <div className="mb-1">{intro}</div>
                  <div className="w-full flex gap-1 text-[10px] font-bold overflow-hidden flex-wrap">
                    {tech.map((e) => (
                      <div className="bg-slate-200 text-gray-600 px-2 py-[2px] rounded-sm">
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
