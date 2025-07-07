//Home Page
"use client";
import ProfileCard from "@/components/profile/ProfileCard";
import InterestCard from "@/components/profile/InterestCard";
import { LogOut } from "lucide-react";
import useProfileHook from "@/hooks/profileHook";
import { useState } from "react";
import { profileAPI } from "@/lib/api";
import EditProfileForm from "@/components/profile/EditProfileForm";
import HeaderCard from "@/components/profile/HeaderCard";

export default function Home() {
  const { error, loading, profile, router, setProfile, setError } =
    useProfileHook();
  const [isSaving, setIsSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  //logout trigger
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  //handle send data request to API
  const handleSaveProfile = async (data: any) => {
    try {
      setIsSaving(true);
      setError(null);

      // Format data sesuai API
      const profileData = {
        name: data.name,
        birthday: data.birthday,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        interests: data.interests,
        image: data.image, // Base64 string
      };

      // Gunakan API yang sesuai
      const response = profile
        ? await profileAPI.updateProfile(profileData)
        : await profileAPI.createProfile(profileData);

      console.log("Save profile response:", response.data);

      // Perbarui state dengan data baru
      setProfile({
        ...(profile || {}),
        ...profileData,
        ...(response.data.data || {}),
      });
      setIsEdit((edited) => !edited);
      // Redirect ke home setelah update berhasil
      window.location.reload();
    } catch (err: any) {
      console.error("Save profile error:", err);
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  //Trigger edit button
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  //isLoading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">
          <p>Loading profile...</p>
          <div className="mt-4 w-12 h-12 border-t-2 border-[#545f64] border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Handle error jika terjadi kesalahan fetch
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <nav className="flex items-center justify-between mb-6">
          <button
            onClick={handleLogout}
            className="text-white flex items-center hover:text-red-500"
          >
            <LogOut />
            <span>Logout</span>
          </button>
          <h1 className="text-xl font-bold text-white">@{profile?.username}</h1>
          <div className="mr-16" />
        </nav>
        {/* Header Content */}
        <HeaderCard
          username={profile?.username}
          name={profile?.name || "No name provided"}
          birthday={profile?.birthday}
          gender={profile?.gender}
          horoscope={profile?.horoscope}
          age={profile?.age}
          zodiac={profile?.zodiac}
          height={profile?.height}
          weight={profile?.weight}
          image={profile?.image}
          interests={profile?.interests || []}
        />
        {/* ProfileComponent and EditProfileComponent, trigger with click edit icon */}
        {isEdit ? (
          <EditProfileForm
            initialData={{
              name: profile?.name || "",
              birthday: profile?.birthday || "",
              gender: profile?.gender || "",
              horoscope: profile?.horoscope || "",
              zodiac: profile?.zodiac || "",
              height: profile?.height || 0,
              weight: profile?.weight || 0,
              interests: profile?.interests || [],
            }}
            onSubmit={handleSaveProfile}
            isSaving={isSaving}
            onEdit={handleEdit}
          />
        ) : (
          <ProfileCard
            username={profile?.username}
            name={profile?.name || "No name provided"}
            birthday={profile?.birthday}
            gender={profile?.gender}
            horoscope={profile?.horoscope}
            age={profile?.age}
            zodiac={profile?.zodiac}
            height={profile?.height}
            weight={profile?.weight}
            image={profile?.image}
            interests={profile?.interests || []}
            isSaving={isSaving}
            onEdit={handleEdit}
          />
        )}
        <InterestCard
          interests={profile?.interests || []}
          onEdit={() => router.push("/interest")}
        />
      </div>
    </section>
  );
}
