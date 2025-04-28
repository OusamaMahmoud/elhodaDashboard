import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AddingFqsFormUi from "../../components/shared/AddingFqsFormUi";
import {
  addFqsSchema,
  FqsFormValues,
  updateFqsSchema,
} from "../../components/zod-schema/addFqsSchema";
import { useAddFqsMutation } from "../../hooks/fqs/useAddFqsMutation";
import { useFetchFq } from "../../hooks/fqs/useFetchFq";

const AddFqsForm: React.FC = () => {
  const [fqsId, setFqsId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = fqsId ? updateFqsSchema : addFqsSchema;

  const methods = useForm<FqsFormValues>({
    resolver: zodResolver(schema),
  });

  const {
    isError,
    isPending,
    mutateAsync: AddFqsMutation,
    error,
  } = useAddFqsMutation();

  const {
    data: fqData,
    isFetching: isFqFetching,
    isError: isFetchFqError,
    error: fetchFqError,
  } = useFetchFq(fqsId || "");

  const onSubmit = (data: FqsFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "question[en]", value: data.questionEn },
      { key: "question[ar]", value: data.questionAr },
      { key: "answer[en]", value: data.answerEn },
      { key: "answer[ar]", value: data.answerAr },
    ];

    if (fqsId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    fqsId
      ? AddFqsMutation({ formData, projectId: fqsId })
      : AddFqsMutation({ formData });

    methods.reset();

    setTimeout(() => {
      navigate("/fqs");
    }, 2500);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setFqsId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (fqsId) {
      methods.reset({
        questionAr: fqData?.question?.ar,
        questionEn: fqData?.question?.en,
        answerAr: fqData?.answer?.ar,
        answerEn: fqData?.answer?.en,
      });
    }
  }, [fqData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchFqError && (
          <p className="error-message">{fetchFqError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isFqFetching && <LoadingModal />}

        <h1 className="text-3xl font-serif font-semibold mb-4">Add Fqs</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingFqsFormUi />
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn bg-bruColorLight1 hover:bg-bruColorLight1 px-12 my-8"
            >
              Add Fqs
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddFqsForm;
