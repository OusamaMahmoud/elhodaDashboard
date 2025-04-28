import { t } from "i18next";
import ImageInputWithHook from "./ImageInputWithHook";
import TextAreaWithHook from "./TextAreaWithHook";

const AddingReviewFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextAreaWithHook
        label={t("projects:projects.form.description")}
        name="descriptionAr"
        placeholder={t("projects:projects.form.placeholder.descriptionAr")}
      />
      <TextAreaWithHook
        label={t("projects:projects.form.description")}
        name="descriptionEn"
        placeholder={t("projects:projects.form.placeholder.descriptionEn")}
      />
      <ImageInputWithHook label={t("projects:projects.form.images")} />
    </section>
  );
};

export default AddingReviewFormUi;
