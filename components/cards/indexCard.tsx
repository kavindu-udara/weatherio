import React from "react";

interface Props {
  title: string;
  number: number;
}

const IndexCard: React.FC<Props> = ({ title, number }) => {
  return (
    <div>
      <div className="text-center uppercase text-lg">{title}</div>
      <div className="text-center">{number}</div>
    </div>
  );
};

export default IndexCard;
