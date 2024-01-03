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
      '연애할 수 있을까요?',
      '경소고 선배 예쁜가요?',
      '경소고 사감 허리 괜찮은가요?',
    ],
    afterAdmission: ['집에 어떻게 가요?', '방에서 라면먹으면 안되나요?', '뭘 공부해야 하나요?'],
    study: ['뭐를 공부해야해요?', '보안할까요 코딩할까요?', '일반과목 어떻게 해요?'],
    jobSearch: ['회사 어디가 좋아요?', '돈 많이주는곳 가고싶어요'],
    afterEmployment: ['아 넣을 데이터가 없다'],
  };

  return (
    <div>
      <Header />
      <div className='text-center mt-10 text-xl font-bold'>
        자주 묻는 질문
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
            <p key={index} className="mb-2 text-gray-800">{content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
