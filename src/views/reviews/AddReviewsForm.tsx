import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import LoadingModal from "../../modals/LoadingModal";
import ImagesPreviewUi from "../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../components/shared/OldImagesPreviewUi";
import {
  updateReviewSchema,
  addReviewSchema,
  ReviewFormValues,
} from "../components/zod-schema/addReviewSchema";
import { useDeleteProjectImageMutation } from "../hooks/projects/useDeleteProjectImageMutation";
import { useAddReviewMutation } from "../hooks/reviews/useAddReviewMutation";
import { useFetchReview } from "../hooks/reviews/useFetchReview";
import AddingReviewFormUi from "../components/shared/AddingReviewFormUi";

const AddReviewsForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [reviewId, setReviewId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = reviewId ? updateReviewSchema : addReviewSchema;

  const methods = useForm<ReviewFormValues>({
    resolver: zodResolver(schema),
  });

  const images = methods.watch("images");
  const handleImagesChange = useCallback((images: File[] | null) => {
    if (images) {
      const urls = Array.from(images).map((img) => URL.createObjectURL(img));
      setImagesPreview(urls);

      // Clean up URLs when component unmounts or images change
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, []);

  useEffect(() => {
    const cleanup = handleImagesChange(images);

    // Cleanup on component unmount or when images change
    return () => cleanup && cleanup();
  }, [images, handleImagesChange]);

  const handleDeleteProjectImage = (ImageId: number) => {
    mutateImageDeletion(ImageId);
  };

  const {
    isError,
    isPending,
    mutateAsync: AddReviewMutation,
    error,
  } = useAddReviewMutation();

  const {
    isError: isDeleteImageError,
    isPending: isDeleteImageLoading,
    mutateAsync: mutateImageDeletion,
    error: deleteImageError,
  } = useDeleteProjectImageMutation();

  const {
    data: reviewData,
    isFetching: isProjectFetching,
    isError: isFetchProjectError,
    error: fetchProjectError,
  } = useFetchReview(reviewId || "");

  const onSubmit = (data: ReviewFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "text[en]", value: data.descriptionEn },
      { key: "text[ar]", value: data.descriptionAr },
    ];

    if (reviewId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // Ensure images are correctly appended
    if (Array.isArray(data.images)) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          console.log(`Appending image[${idx}]`, img);
          formData.append(`image`, img); // Append actual file
        } else {
          console.error(`Invalid file at index ${idx}`, img);
        }
      });
    } else {
      console.error("Images field is not an array!");
    }

    reviewId
      ? AddReviewMutation({ formData, reviewId })
      : AddReviewMutation({ formData });

    setTimeout(() => {
      methods.reset();
      navigate("/reviews");
    }, 2500);

    setImagesPreview([]);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setReviewId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (reviewId) {
      methods.reset({
        descriptionAr: reviewData?.text?.ar,
        descriptionEn: reviewData?.text?.en,
      });

      if (reviewData?.image) setOldImagesPreview(reviewData?.image);
    }
  }, [reviewData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchProjectError && (
          <p className="error-message">{fetchProjectError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isProjectFetching && <LoadingModal />}

        {/* Delete Image States */}
        {isDeleteImageLoading && <LoadingModal />}
        {isDeleteImageError && (
          <p className="error-message">{deleteImageError.message}</p>
        )}

        <h1 className="text-3xl font-serif font-semibold mb-4">Add Review</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingReviewFormUi />

          {imagesPreview.length > 0 && (
            <ImagesPreviewUi imagesPreviewUrls={imagesPreview} />
          )}

          {oldImagesPreview?.length > 0 && (
            <OldImagesPreviewUi
              oldImagesPreview={oldImagesPreview}
              onDeleteProjectImage={(id) => handleDeleteProjectImage(id)}
            />
          )}

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn bg-bruColorLight1 hover:bg-bruColorLight1 px-12 my-8"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddReviewsForm;
