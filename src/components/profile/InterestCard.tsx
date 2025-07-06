import { InterestCardProps } from "@/lib/interface";
import { LucidePencilLine } from "lucide-react";
import React from "react";

const InterestCard: React.FC<InterestCardProps> = ({
  interests = [],
  onEdit,
}) => 
  
  {
  return (
    <article className="p-4 bg-gray-800 rounded-2xl">
      <div className="flex justify-between mx-3">
        <h2 className="text-lg font-semibold mb-4">Interests</h2>{" "}
        {onEdit && (
          <button
            onClick={onEdit}
            className=" text-white font-semibold hover:shadow-md"
          >
            <LucidePencilLine />
          </button>
        )}
      </div>

      {interests.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span
              key={index}
              className="bg-[#545f64] text-white px-3 py-1 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic">
          Add in your interest to find a better match
        </p>
      )}
    </article>
  );
};

export default InterestCard;
