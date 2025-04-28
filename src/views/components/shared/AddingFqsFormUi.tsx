import TextAreaWithHook from "./TextAreaWithHook";

const AddingFqsFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextAreaWithHook
        label={"Question(En)"}
        name="questionEn"
        placeholder={"Type your question here"}
      />
      <TextAreaWithHook
        label={"Question(Ar)"}
        name="questionAr"
        placeholder={"Type your question here"}
      />
      <TextAreaWithHook
        label={"Answer(En)"}
        name="answerEn"
        placeholder={"Type your answer here"}
      />
      <TextAreaWithHook
        label={"Answer(Ar)"}
        name="answerAr"
        placeholder={"Type your answer here"}
      />
    </section>
  );
};

export default AddingFqsFormUi;
