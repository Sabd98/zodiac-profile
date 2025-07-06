import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  calculateZodiac,
  calculateHoroscope,
  calculateAge,
} from "@/utils/zodiac";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { ArrowLeft, Camera } from "lucide-react";
import { compressImage } from "@/utils/compressImg";
import useProfileHook from "@/hooks/profileHook";

interface EditProfileFormProps {
  initialData: {
    name?: string;
    birthday?: string;
    gender?: string;
    age?: number;
    horoscope?: string;
    zodiac?: string;
    height?: number;
    weight?: number;
    image?: string;
    interests: string[];
  };
  onSubmit: (data: any) => void;
  isSaving: boolean;
  onEdit: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  initialData,
  onSubmit,
  onEdit,
  isSaving,
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    birthday: initialData.birthday || "",
    gender: initialData.gender || "",
    horoscope: initialData.horoscope || "",
    zodiac: initialData.zodiac || "",
    height: initialData.height?.toString() || "",
    weight: initialData.weight?.toString() || "",
    image: initialData.image || "",
  });
  const [age, setAge] = useState<number | null>(null);

  const [profileImage, setProfileImage] = useState<string | null>(
    initialData.image || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.birthday && formData.birthday.length === 10) {
      const birthDate = new Date(formData.birthday);

      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          horoscope: calculateHoroscope(birthDate),
          zodiac: calculateZodiac(birthDate),
        }));
        setAge(calculateAge(birthDate));
      }, 500);
    } else {
      setAge(null);
    }
  }, [formData.birthday]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validasi ukuran file
      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        alert("Maksimal ukuran gambar 2MB");
        return;
      }

      try {
        // Kompres gambar: maksimal lebar 800px, kualitas 70%
        const compressedData = await compressImage(file, 800, 0.7);
        setProfileImage(compressedData);
      } catch (error) {
        console.error("Gagal mengkompres gambar:", error);
      }
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      image: profileImage,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = {
      ...formData,
      name: formData.name,
      birthday: formData.birthday,
      gender: formData.gender,
      height: formData.height ? Number(formData.height) : undefined,
      weight: formData.weight ? Number(formData.weight) : undefined,
      image: profileImage,
    };

    onSubmit(profileData);
  };

  return (
    <article className="max-w-md mx-auto mb-6">
      {/* Form Edit Profile */}
      <form
        id="profile-form"
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-2xl p-4 text-white"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">About</h2>
          <nav className="flex gap-2">
            <button onClick={onEdit} className="text-white flex items-center">
              <ArrowLeft className="mr-1" size={20} />
              <span className="text-sm">Back</span>
            </button>
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
          </nav>
        </div>

        {/* Section: Add Image */}
        <div className="mb-2 text-center">
          <div className="p-2 mb-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex justify-start items-center ">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden cursor-pointer bg-gray-700"
                onClick={handleImageClick}
              >
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="text-gray-400" size={30} />
                )}
              </div>
              <button
                type="button"
                onClick={handleImageClick}
                className="py-2 rounded-lg font-semibold w-1/2"
              >
                {profileImage ? "Change Image" : "Add Image"}
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <Input
            label="Display name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />

          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: "", label: "Select Gender" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />

          <Input
            label="Birthday"
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
          />

          {age !== null && (
            <Input
              label="Age"
              name="age"
              value={age}
              onChange={handleChange}
              disabled
            />
          )}

          <Input
            label="Horoscope"
            name="horoscope"
            value={formData.horoscope}
            onChange={handleChange}
            disabled
          />

          <Input
            label="Zodiac"
            name="zodiac"
            value={formData.zodiac}
            onChange={handleChange}
            disabled
          />
          <Input
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            placeholder="Add height"
            min="0"
            max="300"
          />

          <Input
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Add weight"
            min="0"
            max="500"
          />
        </div>
      </form>
    </article>
  );
};

export default EditProfileForm;
