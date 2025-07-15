const QuestionsItemText = ({ text }) => {
  return (
    <p
      className={`questions-item__text`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default QuestionsItemText;
