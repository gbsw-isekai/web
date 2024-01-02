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

  return (
    <div>
      <Header />
      <div className='text-center mt-10 text-xl font-bold'>
        자주 묻는 질문
      </div>
      <div className="flex justify-center mt-8 h-screen">
        <div className="grid grid-cols-5 gap-4">
          {toggles.map((toggle) => (
            <button
              key={toggle.name}
              className={`w-32 h-14 px-4 py-2 rounded-2xl focus:outline-none transition duration-300 ${
                activeToggle === toggle.name
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-400 hover:text-white'
              }`}
              onClick={() => handleToggle(toggle.name)}
            >
              {toggle.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
