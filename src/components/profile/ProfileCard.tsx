import { ProfileCardProps } from "@/lib/interface";
import { LucidePencilLine } from "lucide-react";


const ProfileCard = ({
  birthday,
  horoscope,
  zodiac,
  height,
  weight,
  isSaving,
  onEdit,
}: ProfileCardProps) => {
  return (
    <article className="p-4 text-white bg-gray-800 rounded-2xl mb-6">
      <div className="flex justify-between mx-3">
        <h2 className="text-lg font-semibold mb-4">About</h2>
        {onEdit ? (
          <button
            onClick={onEdit}
            className="group relative p-2 rounded-full transition-all duration-300 "
            aria-label="Edit profile"
          >
            <LucidePencilLine
              className="text-white group-hover:text-yellow-400 transition-colors duration-300"
              size={20}
            />

            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 group-hover:animate-ping transition-opacity duration-500"></span>
          </button>
        ) : (
          <button
            type="submit"
            form="profile-form"
            disabled={isSaving}
            className={`px-4 py-2 rounded-lg font-semibold ${
              isSaving
                ? "cursor-not-allowed"
                : " text-white hover:text-[#383f42]"
            }`}
          >
            {isSaving ? "Saving..." : "Save & Update"}
          </button>
        )}
      </div>

      {birthday ? (
        <div className="space-y-3">
          <div className="flex">
            <span className="font-semibold w-24 text-gray-600">Birthday:</span>
            <span>{new Date(birthday).toLocaleDateString()}</span>
          </div>
          {horoscope && (
            <div className="flex">
              <span className="font-semibold w-24 text-gray-600">
                Horoscope:
              </span>
              <span>{horoscope}</span>
            </div>
          )}
          {zodiac && (
            <div className="flex">
              <span className="font-semibold w-24 text-gray-600">Zodiac:</span>
              <span>{zodiac}</span>
            </div>
          )}
          {height && (
            <div className="flex">
              <span className="font-semibold w-24 text-gray-600">Height:</span>
              <span>{height} cm</span>
            </div>
          )}
          {weight && (
            <div className="flex">
              <span className="font-semibold w-24 text-gray-600">Weight:</span>
              <span>{weight} kg</span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400 italic">
          Add in your about to help others know you better
        </p>
      )}
    </article>
  );
};

export default ProfileCard;
