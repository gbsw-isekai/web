import React from "react";
import { Link } from "react-router-dom";
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
      portfolio: "https://github.com/nswon",
      blog: "https://skatpdnjs.tistory.com/",
      profile:
        "https://cdn.rallit.com/image/2023-12-14/v4Z0ZEKP_wsMCm5I9vfSC.jpeg?w=376",
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
      profile:
        "https://cdn.rallit.com/image/2023-12-22/hYQzHEqMkXqJG7XFAXQzy.jpeg?w=536",
    },
    {
      name: "박재욱",
      intro: "항상 고민하고 노력하는 긍정적인 신입 백엔드 개발자 박재욱입니다.",
      category: "백엔드",
      tech: ["Python", "Django", "Docker", "AWS", "MySQL", "unittest"],
      career: "신입",
      resume:
        "https://www.rallit.com/hub/resumes/1153069/%EB%B0%95%EC%9E%AC%EC%9A%B1",
      portfolio: "https://github.com/wodnrP/Recipe_project",
      blog: "https://velog.io/@wodnr_09/posts",
      profile:
        "https://cdn.rallit.com/image/2023-08-03/Ogcw0NqoW-5mHYTdmcidA.jpeg?w=536",
    },
    {
      name: "이석호",
      intro: "",
      category: "백엔드",
      tech: [
        "Node.js",
        "TypeScript",
        "Express",
        "NestJS",
        "TypeORM",
        "Prisma",
        "MySQL",
        "REST API",
        "AWS",
        "Terraform",
      ],
      career: "2년차, 1개 회사 근무",
      resume:
        "https://www.rallit.com/hub/resumes/277614/%EC%9D%B4%EC%84%9D%ED%98%B8",
      portfolio: "https://github.com/rrgks6221",
      blog: "",
      profile:
        "https://cdn.rallit.com/image/2023-03-30/dNM5PDCbqWUpQABsZzloI.png?w=376",
    },
    {
      name: "엄준서",
      intro:
        "안녕하세요, 탐구하고 확인하는것을 좋아하는 주니어 개발자 엄준서 입니다.",
      category: "백엔드",
      tech: ["Kotlin", "Java", "Android", "Spring Boot", "JPA"],
      career: "3년차, 1개 회사 근무",
      resume:
        "https://www.rallit.com/hub/resumes/6883/%EC%97%84%EC%A4%80%EC%84%9C",
      portfolio: "https://github.com/djawnstj",
      blog: "https://velog.io/@djawnstj/posts",
      profile:
        "https://cdn.rallit.com/image/2023-08-28/CK5R0KieVuqXMSoSH5lEZ.JPG?w=376",
    },
    {
      name: "김석규",
      intro: "언제나 더 좋은 방법을 탐구하는 Node.JS 개발자 김석규입니다.",
      category: "백엔드",
      tech: [
        "Node.js",
        "NestJS",
        "TypeScript",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "JavaScript",
        "AWS",
        "Docker",
        "Linux",
        "Express",
        "Git",
        "React",
        "HTML/CSS",
      ],
      career: "1년차 1개 회사 근무",
      resume:
        "https://www.rallit.com/hub/resumes/1138245/%EA%B9%80%EC%84%9D%EA%B7%9C",
      portfolio: "https://github.com/ksg9482",
      blog: "https://for-leaning.tistory.com/",
      profile:
        "https://cdn.rallit.com/image/2023-10-16/iKCmqtpa1OgoBv-JuPPt5.jpg?w=376",
    },
    {
      name: "박종하",
      intro:
        "안녕하세요 서비스 백엔드 개발자가 되고 싶은 21살 2년차 개발자 박종하입니다.",
      category: "백엔드",
      tech: [
        "Swift",
        "Java",
        "Spring Boot",
        "secure-coding",
        "C",
        "Linux",
        "MySQL",
        "Oracle",
        "AWS",
        "Azure",
        "Git",
        "devops",
        "PHP",
      ],
      career: "4년차 2개 회사 근무",
      resume:
        "https://www.rallit.com/hub/resumes/138813/%EB%B0%95%EC%A2%85%ED%95%98",
      portfolio: "https://github.com/archan0621",
      blog: "https://archanwriteup.tistory.com/",
      profile:
        "https://cdn.rallit.com/image/2023-05-18/Vs-ER1p7l5K-9fE-pddu_.png?w=376",
    },
    {
      name: "최파란별",
      intro:
        "다수의 해커톤 참여로 회사뿐만 아니라 다양한 직군과 협업 및 다양한 경험을 쌓아왔습니다.",
      category: "프론트엔드",
      tech: ["React", "Next.js", "tailwind-css", "TypeScript", "HTML/CSS"],
      career: "2년차 2개 회사 근무",
      resume:
        "https://www.rallit.com/hub/resumes/239826/%EC%B5%9C%ED%8C%8C%EB%9E%80%EB%B3%84",
      portfolio:
        "https://ssxst31.notion.site/ssxst31/Palanbyeol-Choi-d8a632bee1674153bc83995febfc58b0",
      blog: "",
      profile:
        "https://cdn.rallit.com/image/2023-11-30/OHI7FkRJgJKa8py_x_rv6.png?w=376",
    },
  ];
  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto mt-5 grid grid-cols-4 auto-rows-auto gap-y-5">
        {data.map(
          ({ name, intro, category, tech, career, resume, profile }) => (
            <Link to={resume} className="w-60">
              <div className="w-full h-60 bg-slate-500 rounded-lg">
                <img
                  src={profile}
                  alt="profile-img"
                  className="w-full h-60 bg-slate-500 rounded-lg"
                />
              </div>
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
            </Link>
          )
        )}
      </div>
    </div>
  );
}
