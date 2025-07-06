"use client";
import { ArrowLeft } from "lucide-react";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import useProfileHook from "@/hooks/profileHook";
import { profileAPI } from "@/lib/api";

export default function InterestPage() {
  const { error, loading, profile, router, setError, setProfile } =
    useProfileHook();
  const [isSaving, setIsSaving] = useState(false);
  const [interests, setInterests] = useState<string[]>(
    profile?.interests || []
  );
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fokus ke input saat halaman dimuat
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Format data sesuai API
      const profileData = {
        ...profile,
        interests,
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

      // Redirect ke home setelah update berhasil
      router.push("/");
    } catch (err: any) {
      console.error("Save profile error:", err);
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const addInterest = () => {
    if (
      inputValue.trim() &&
      !interests.includes(inputValue.trim()) &&
      interests.length < 20
    ) {
      setInterests((prev) => [...prev, inputValue.trim()]);
      setInputValue(""); // Reset input setelah ditambahkan
    }
  };

  const removeInterest = (index: number) => {
    setInterests((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      addInterest();
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      interests.length > 0
    ) {
      // Hapus interest terakhir jika backspace ditekan saat input kosong
      setInterests((prev) => prev.slice(0, -1));
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#09141A] to-[#1F4247]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#62CDCB]"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#09141A] to-[#1F4247]">
        <div className="text-center p-6 bg-[#0F191F] rounded-lg max-w-md mx-4">
          <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-white mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#62CDCB] text-black px-4 py-2 rounded-lg font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen p-4"
      style={{
        background:
          "radial-gradient(circle at left, #09141A, #0D1D23, #1F4247)",
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Header dengan tombol back dan Save & Update */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <button
            onClick={() => router.back()}
            className="text-white flex items-center"
          >
            <ArrowLeft className="mr-1" size={20} />
            <span className="text-sm">Back</span>
          </button>

          <h1 className="text-white text-xl font-bold">@{profile?.username}</h1>

          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className={`px-4 py-2 rounded-lg font-semibold ${
              isSaving ? "cursor-not-allowed" : " text-white hover:bg-[#383f42]"
            }`}
          >
            {isSaving ? "Saving..." : "Save & Update"}
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Tell everyone about yourself
          </h2>
          <h3 className="text-lg text-gray-300 mb-6">What interests you?</h3>

          {/* Container untuk menampilkan interest tags dan input */}
          <div
            className="min-h-[120px] bg-[#D9D9D90F] rounded-xl p-4 mb-6 flex flex-wrap gap-2 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Daftar interests */}
            {interests.map((interest, index) => (
              <div
                key={index}
                className="bg-[#4d4d4d] px-3 py-1 h-10 rounded-md flex items-center group"
              >
                <span>{interest}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeInterest(index);
                  }}
                  className="ml-1 font-bold opacity-70 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Input untuk menambahkan interest baru */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                interests.length === 0 ? "Type an interest and press Enter" : ""
              }
              className="flex-grow bg-transparent text-white min-w-[100px] focus:outline-none"
              maxLength={20}
            />
          </div>

          {/* Informasi jumlah interest */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-400">
              {interests.length}/20 interests added
            </p>
            <p className="text-sm text-gray-400">
              Max 20 characters per interest
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
