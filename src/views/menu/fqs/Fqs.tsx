import Modal from "../../components/modals/Modal";
import TableActions from "../../components/shared/TableActions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../components/modals/showModel";
import { useState } from "react";
import LoadingModal from "../../../modals/LoadingModal";
import { closeModal } from "../../components/modals/closeModal";
import { ToastContainer } from "react-toastify";
import FqsTable from "./FqsTable";
import { useFetchFqs } from "../../hooks/fqs/useFetchFqs";
import { useDeleteFqMutation } from "../../hooks/fqs/useDeleteFqMutation";

const Fqs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [projectId, setProjectId] = useState<number | null>(null);

  const { data, isLoading, error, isError } = useFetchFqs();

  // Define the columns : accessor is the key in the data object.
  const headers = ["ID", "Question", "Answer"];

  const handleProjectEditing = (id: number) => {
    navigate(`/fqs/add/${id}`);
  };
  const handleOpenDeletionModal = (id: number | null) => {
    if (id) setProjectId(id);
    showModal("fqs_deletion_model");
  };

  const {
    mutateAsync,
    isPending,
    isError: isDeleteMutationError,
    error: deleteMutationError,
  } = useDeleteFqMutation();

  const handlingProjectDeletion = () => {
    if (projectId) {
      // Call the delete mutation
      mutateAsync(projectId);
    }

    // Close the modal
    closeModal("fqs_deletion_model");
  };

  if (isLoading)
    return (
      <div className="flex  flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-56"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );

  if (isError)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! {error.message}</span>
      </div>
    );

  return (
    <div className="p-6">
      {isDeleteMutationError && (
        <p className="error-message">{deleteMutationError.message}</p>
      )}
      {isPending && <LoadingModal />}
      <ToastContainer />
      <Modal
        modal_id="fqs_deletion_model"
        onConfirm={handlingProjectDeletion}
        meta={{
          confirm: `${t("projects:projects.modal.confirm")}`,
          Cancel: `${t("projects:projects.modal.cancel")}`,
          label: `${t("projects:projects.modal.delete.message")}`,
        }}
      />
      <TableActions
        header={"Fqs"}
        add={t("add Fqs")}
        onAdd={() => navigate("/fqs/add")}
      />
      {!isLoading && !isError && (
        <FqsTable
          headers={headers}
          data={data!}
          lang="en"
          onEdit={handleProjectEditing}
          onDelete={handleOpenDeletionModal}
        />
      )}
    </div>
  );
};
export default Fqs;
