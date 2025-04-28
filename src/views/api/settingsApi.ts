import apiClient from "../services/api-client";

export interface FetchSettingsResponse {
  data: Settings[];
}

export interface FetchSettingResponse {
  data: Settings;
}

// Interface for the `title` object
interface Title {
  en: string;
  ar: string;
}

// Interface for the `address` object
interface Address {
  en: string;
  ar: string;
}

// Interface for the `phones` object
interface Phones {
  phones: string[];
  mobiles: string[];
}

// Interface for the `social_media` object
interface SocialMedia {
  linkedin: string;
  facebook: string;
  x: string;
  tiktok: string;
  instagram: string;
  YouTube: string;
}

export interface Settings {
  id: number;
  title: Title;
  email: string;
  address: Address;
  notes: { en: string; ar: string };
  phones: Phones;
  social_media: SocialMedia;
  long: string;
  lat: string;
  created_at: string;
  updated_at: string;
}

const SETTINGS_API_ENDPOINT = "/api/dashboard/settings/list";
// API Functions
export const getSettings = async () => {
  const res = await apiClient.get<Settings[]>(SETTINGS_API_ENDPOINT);
  console.log("i'm here prof.", res.data);
  return res.data;
};

export const addSettingMutation = async ({
  formData,
  payloadId,
}: {
  formData: FormData;
  payloadId?: number; // Make payloadId optional
}) => {
  // Determine the endpoint based on whether payloadId exists
  const endpoint = payloadId
    ? `/api/dashboard/settings/update/${payloadId}`
    : "/api/dashboard/settings/create";

  // Make the API request with the appropriate endpoint
  const res = await apiClient.post(endpoint, formData);
  console.log(res.data.data);
  return res.data.data;
};
