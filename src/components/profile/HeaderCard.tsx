import { Profile, ProfileCardProps } from "@/lib/interface";
import { calculateAge } from "@/utils/zodiac";
import { useEffect, useState } from "react";

const HeaderCard: React.FC<ProfileCardProps> = ({
  username,
  name,
  gender,
  birthday,
  horoscope,
  zodiac,
  image,
}) => {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    if (birthday && birthday.length === 10) {
      const birthDate = new Date(birthday);
      setTimeout(() => {
        setAge(calculateAge(birthDate));
      }, 500);
    } else {
      setAge(null);
    }
  }, [birthday]);

  return (
    <article className="px-4 bg-[url(/testimage.jpg)] rounded-2xl flex items-center justify-between mb-6">
      {/* Header dengan background gambar profil */}
      <div
        className="h-60 bg-cover bg-center relative"
        style={{
          backgroundImage: image
            ? `url(/testimage.jpg)`
            : "linear-gradient(to bottom, #2D6A4F, #1D3557)",
        }}
      >
        <div className="absolute inset-0 left-20 bg-black/30 flex items-end text-left justify-center">
          {/* User Info Section */}
          <div className="text-left -mt-8 mb-6">
            <h1 className="text-xl font-bold text-white">@{username}</h1>
            <p className="text-gray-300 w-full">
              {name} {age && `, ${age}`}
              {gender &&
                ` • ${gender.charAt(0).toUpperCase() + gender.slice(1)}`}
            </p>
            {(horoscope || zodiac) && (
              <div className="flex justify-center mt-2">
                {horoscope && (
                  <span className="bg-gray-700 px-3 py-1 rounded-full text-sm mr-2">
                    {horoscope}
                  </span>
                )}
                {zodiac && (
                  <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {zodiac}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default HeaderCard;
