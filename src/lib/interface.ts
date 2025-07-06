export interface Profile {
  username: string;
  name: string;
  birthday?: string;
  gender?: string;
  age?: number;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  image?: string;
  weight?: number;
  interests: string[];
}

export interface ProfileCardProps {
  username: string;
  name: string;
  birthday?: string;
  gender?: string;
  age?: number;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
  image?: string;
  interests?: string[];
  onEdit?: () => void;
  isSaving?: boolean;
}

export interface InterestCardProps {
  interests: string[];
  onEdit?: () => void;
}