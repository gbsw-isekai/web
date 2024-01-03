import React, { useState } from 'react';
import Header from 'src/components/common/Header';

export default function Main() {
  const [activeToggle, setActiveToggle] = useState('beforeAdmission');

  const handleToggle = (toggleName) => {
    setActiveToggle(toggleName);
  };

  const toggles = [
    { name: 'beforeAdmission', label: '입학 전' },
    { name: 'afterAdmission', label: '입학 후' },
    { name: 'study', label: '공부' },
    { name: 'jobSearch', label: '취업준비' },
    { name: 'afterEmployment', label: '취업 후' },
  ];

  const toggleContents = {
    beforeAdmission: [
      '어떤 학과가 있나요?',
      '예습하고 들어가면 좋나요?',
      '입학 전에 공부해야할게 있나요?',
    ],
    afterAdmission: ['무엇을 공부하는게 가장 좋을까요?', '내신관리 어떻게 해야하나요?', '대회를 많이 참여하는게 좋을까요?'],
    study: ['자격증 따려고 하는데 어떻게 공부를 해야하나요?', '가장 많이 공부하는 언어가 어떤게 있나요?', '전공만 하고싶은데 일반과목을 굳이 해야하나요?'],
    jobSearch: ['어떤 회사가 좋은가요?', '인턴쉽을 어디로 가야할까요?', '포트폴리오 어떻게 작성해요?'],
    afterEmployment: ['회사 생활할 때 팁이 있을까요?'],
  };

  return (
    <div> 
      <Header />
      <div className='text-center mt-10 text-xl font-bold'>
        Q. 자주 묻는 질문
      </div>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-5 gap-6">
          {toggles.map((toggle) => (
            <button
              key={toggle.name}
              className={`w-32 h-14 px-4 py-2 rounded-2xl focus:outline-none transition duration-300 ${
                activeToggle === toggle.name
                  ? 'bg-gray-800 text-white'  
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white'
              }`}
              onClick={() => handleToggle(toggle.name)}
            >
              {toggle.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <div className="max-w-md mx-auto">
          {toggleContents[activeToggle].map((content, index) => (
          <div key={index} className="bg-white p-4 mb-4 rounded-md shadow-md">
            <p className="text-gray-600">{content}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};
