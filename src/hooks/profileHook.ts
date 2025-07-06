import { profileAPI } from "@/lib/api";
import { Profile } from "@/lib/interface";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useProfileHook = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
      try {
        setLoading(true);
        const response = await profileAPI.getProfile();
  
        if (response.data) {
          setProfile(response.data.data);
        } else {
          throw new Error("Invalid profile data structure");
        }
      } catch (err: any) {
        console.error("Profile fetch error:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to fetch profile"
        );
  
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    }, [router]);
  
    useEffect(() => {
      fetchProfile();
    }, [fetchProfile, router]);

  return { profile, loading, error, router, setProfile, setError };
};

export default useProfileHook;
