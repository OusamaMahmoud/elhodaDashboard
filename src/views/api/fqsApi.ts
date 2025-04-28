import apiClient from "../services/api-client";

// GET Interfaces
export interface FetchProjectsResponse {
  data: Fqs[];
}
export interface FetchProjectResponse {
  data: Fqs;
}
export interface Fqs {
  id: number;
  question: { en: string; ar: string };
  answer: {
    ar: string;
    en: string;
  };
}

// POST Interfaces
export interface AddProjectResponse {
  data: any;
  status: string;
  error: string;
  code: number;
}

// DELETE Interfaces
export interface DeleteProjectResponse {
  data: any;
  status: string;
  error: string;
  code: number;
}

// API Endpoints
const FQS_API_ENDPOINT = "/api/dashboard/faqs";

// API Functions
export const getFqs = async () => {
  const res = await apiClient.get<FetchProjectsResponse>(FQS_API_ENDPOINT);
  return res.data.data;
};

// API Functions
export const getFq = async (projectId: string) => {
  console.log("any Body Here ?", projectId);
  const res = await apiClient.get<FetchProjectResponse>(
    `${FQS_API_ENDPOINT}/${projectId}`
  );
  console.log("coming from GET project by ID: ", res.data.data);
  return res.data.data;
};

export const addFqsMutation = async ({
  formData,
  projectId,
}: {
  formData: FormData;
  projectId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = projectId
    ? `${FQS_API_ENDPOINT}/${projectId}`
    : FQS_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

export const deleteFqMutation = async (fqId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${FQS_API_ENDPOINT}/${fqId}`, {
    _method: "delete",
  });
  return res.data.data;
};
