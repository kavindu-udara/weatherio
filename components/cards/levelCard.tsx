import React, { ReactNode } from "react";

interface LevelCardProps {
  title: string;
  icon: ReactNode;
  precent: string;
}

const LevelCard: React.FC<LevelCardProps> = ({ title, icon, precent }) => {
  return (
    <div className="border rounded-lg p-5 shadow-md">
      <p>{title}</p>
      <div className="flex justify-between items-center text-6xl mt-3">
        <div className="text-8xl">{icon}</div>
        <div>{precent}</div>
      </div>
    </div>
  );
};

export default LevelCard;
