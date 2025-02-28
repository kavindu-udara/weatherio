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
      <div className="flex justify-between items-center text-4xl mt-5 p-5">
        <div className="text-7xl">{icon}</div>
        <div>{precent}<sup>o</sup>c</div>
      </div>
    </div>
  );
};

export default LevelCard;
