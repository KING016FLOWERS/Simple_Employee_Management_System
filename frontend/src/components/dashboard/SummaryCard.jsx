import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="rounded-lg flex bg-white shadow-lg overflow-hidden">
      <div className={`text-3xl flex justify-center items-center ${color} text-white px-6 py-4`}>
        {icon}
      </div>
      
      <div className="pl-4 py-2 flex flex-col justify-center">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
