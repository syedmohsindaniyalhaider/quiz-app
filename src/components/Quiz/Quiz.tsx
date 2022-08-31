import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./style.module.css";

const Quiz = (props: any) => {
  const [question, setQuestion] = useState<any>([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [questionOptions, setQuestionOptions] = useState<any>([]);
  const [correctOption, setCorrectOption] = useState<any>("");
  const [selectedValue, setSelectedValue] = useState<any>("");
  const [emptyError, setEmptyError] = useState<any>(false);
  const [toggle, setToggle] = useState<any>(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [allUserAnswers, setAllUserAnswers] = useState<any>([]);
  const [testEnd, setTestEnd] = useState<any>(false);
  const lastIndex = question.length;

  // start here => is the quiz timer

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);

  const { seconds, minutes, isRunning, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setTestEnd(true);
      setTimeout(() => {
        props.setStartQuiz(false);
      }, 5000);
    },
  });

  // timer <= ends here

  const loadQuiz = async () => {
    const res = await fetch(
      "https://orcalotest-default-rtdb.firebaseio.com/quizAppQuestions.json"
    );
    const data = await res.json();
    const questionKeys = Object.keys(data);
    const result = questionKeys.map((key) => {
      const value = data[key];
      return value;
    });
    setQuestion(result);
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  useEffect(() => {
    setQuestionOptions(question[nextIndex]?.options);
    setCorrectOption(question[nextIndex]?.correctOption);
  }, [questionOptions, question, nextIndex]);

  const userAnswers = {
    email: props.userEmail,
    score: `${correctAnswers}/10`,
    result: allUserAnswers,
  };

  const userEnteredDetails = {
    question: question[nextIndex]?.question,
    answerSelected: selectedValue,
    correctAnswer: correctOption,
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    if (selectedValue !== "") {
      setAllUserAnswers((prevValue: any) => [...prevValue, userEnteredDetails]);
      if (selectedValue.toLowerCase() === correctOption.toLowerCase()) {
        setCorrectAnswers((prevVal) => prevVal + 1);
      }
      if (nextIndex < lastIndex) {
        setNextIndex((prevIndex) => prevIndex + 1);
      }
      setSelectedValue("");
      setEmptyError(false);
    } else {
      setEmptyError(true);
    }
  };

  const addUserAnswers = async (userAnswers: any) => {
    await fetch(
      "https://orcalotest-default-rtdb.firebaseio.com/scoreCard.json",
      {
        method: "POST",
        body: JSON.stringify(userAnswers),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  };

  const onClickHandler = () => {
    addUserAnswers(userAnswers);
    pause();
  };

  return (
    <div className={styles.quiz}>
      {isRunning && (
        <div className="center">
          <div className={styles["fs-22"]}>
            <span>{minutes}</span>:<span>{seconds}</span>
          </div>
        </div>
      )}
      {!testEnd && (
        <>
          <div>
            {nextIndex < lastIndex && (
              <h2>
                Q#{nextIndex + 1} of {lastIndex}
              </h2>
            )}
          </div>
          <div>{question[nextIndex]?.question}</div>
          <form onSubmit={onSubmitHandler}>
            <div className={styles.flex}>
              {questionOptions?.map((ele: any) => (
                <div key={ele}>
                  <input
                    type="radio"
                    id={ele}
                    value={ele}
                    name="userAnswers"
                    onChange={(e) => {
                      setSelectedValue(e.target.value);
                    }}
                  />
                  <div>
                    <label>{ele}</label>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-20">
              {nextIndex < lastIndex - 1 && (
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.next}`}
                >
                  Next
                </button>
              )}
              {nextIndex === lastIndex - 1 && (
                <button
                  onClick={onClickHandler}
                  className={`${styles.btn} ${styles.submit}`}
                >
                  Submit
                </button>
              )}
              {emptyError && (
                <p className="mt-20">Select any option to proceed</p>
              )}
            </div>
          </form>
          {nextIndex >= lastIndex && nextIndex && (
            <>
              {!toggle && (
                <>
                  <h2>Congradulations for Completing your test!</h2>

                  <button
                    onClick={() => {
                      setToggle(true);
                      setTimeout(() => {
                        props.setStartQuiz(false);
                      }, 5000);
                    }}
                    className={`mt-20 ${styles.btn}  ${styles.submit}`}
                  >
                    See Result
                  </button>
                </>
              )}
              {toggle && (
                <p>
                  Your obtained marks out of 10 are{" "}
                  <strong>{correctAnswers}</strong>
                </p>
              )}
            </>
          )}
        </>
      )}
      {testEnd && <p> Oop's you ran out of time. Better luck next time. </p>}
    </div>
  );
};

export default Quiz;
