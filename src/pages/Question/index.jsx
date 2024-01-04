import { useEffect, useState } from "react";
import { getQuestions } from "../../lib/question";
import Header from "src/components/common/Header";
import QuestionTopMenu from "src/components/Question/question-top-menu";
import QuestionItemCard from "src/components/Question/itemCard";
import QuestionItemList from "src/components/Question/itemList";
import QuestionItemListSkeleton from "src/components/Question/itemListSkeleton";
import { useSearchParams } from "react-router-dom";
import QuestionItemCardSkeleton from "src/components/Question/itemCardSkeleton";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get("order") ?? "latest";
  const viewType = searchParams.get("view") ?? "list";
  // const questionList = questions.map(({
  //   id,
  //   title,
  //   content
  // }) => (
  //   <QuestionItem key={id} id={id} title={title} content={content} />
  // ))

  useEffect(() => {
    async function wait() {
      try {
        setError(false);
        setLoad(true);
        setQuestions([]);
        const questions = await getQuestions(orderType);
        setQuestions(questions);
      } catch (error) {
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    wait();
  }, [orderType]);

  return (
    <div>
      <Header />
      <QuestionTopMenu orderType={orderType} viewType={viewType} />
      <div>
        {load &&
          (viewType === "list" ? (
            <>
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
              <QuestionItemListSkeleton />
            </>
          ) : (
            <>
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
              <QuestionItemCardSkeleton />
            </>
          ))}
        {error && <div className="text-center py-8">에러</div>}
        {questions.map(
          ({
            id,
            title,
            content,
            answers,
            writer,
            like,
            viewCount,
            createdAt,
          }) => {
            if (viewType === "list") {
              return (
                <QuestionItemList
                  key={id}
                  id={id}
                  viewCount={viewCount}
                  answers={answers.length}
                  like={like}
                  writer={writer.name}
                  profile={writer.profile}
                  title={title}
                  content={content}
                  createdAt={createdAt}
                />
              );
            } else {
              return (
                <QuestionItemCard
                  key={id}
                  id={id}
                  viewCount={viewCount}
                  answers={answers.length}
                  like={like}
                  writer={writer.name}
                  profile={writer.profile}
                  title={title}
                  content={content}
                  createdAt={createdAt}
                />
              );
            }
          }
        )}
      </div>
    </div>
  );
}

export default Questions;
