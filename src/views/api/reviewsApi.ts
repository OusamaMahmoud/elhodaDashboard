import apiClient from "../services/api-client";

// GET Interfaces
export interface FetchProjectsResponse {
  data: Reviews[];
}
export interface FetchProjectResponse {
  data: Reviews;
}
export interface Reviews {
  id: number;
  text: {
    ar: string;
    en: string;
  };
  image: string;
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
const REVIEWS_API_ENDPOINT = "/api/dashboard/reviews";

// API Functions
export const getReviews = async () => {
  const res = await apiClient.get<FetchProjectsResponse>(REVIEWS_API_ENDPOINT);
  return res.data.data;
};

// API Functions
export const getReview = async (reviewId: string) => {
  console.log("any Body Here ?", reviewId);
  const res = await apiClient.get<FetchProjectResponse>(
    `${REVIEWS_API_ENDPOINT}/${reviewId}`
  );
  console.log("coming from GET project by ID: ", res.data.data);
  return res.data.data;
};

export const addReviewMutation = async ({
  formData,
  reviewId,
}: {
  formData: FormData;
  reviewId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = reviewId
    ? `${REVIEWS_API_ENDPOINT}/${reviewId}`
    : REVIEWS_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

export const deleteReviewMutation = async (reviewId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${REVIEWS_API_ENDPOINT}/${reviewId}`, {
    _method: "delete",
  });
  return res.data.data;
};
