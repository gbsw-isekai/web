import dayjs from "dayjs";
import { Star, StarHalf } from "lucide-react";
import React from "react";

export default function CompanyReview({ reviews }) {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <ReviewDetail review={review} />
      ))}
    </div>
  );
}

const ReviewDetail = ({ review }) => {
  return (
    <div className="border rounded-md p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold">{review.title}</h2>
      <div className="text-sm">
        {dayjs(review.createdAt).format("YYYY년 MM월")}
      </div>
      <div className="flex gap-8">
        <div>
          <div className="mb-2">
            <strong className="text-sm">복지 및 급여 평가</strong>{" "}
            <StarRating rating={review.welfareAndSalaryRating} />
          </div>
          <div className="mb-2">
            <strong className="text-sm">분위기 평가</strong>{" "}
            <StarRating rating={review.atmosphereRating} />
          </div>
          <div className="mb-2">
            <strong className="text-sm">업무량 평가</strong>{" "}
            <StarRating rating={review.workloadRating} />
          </div>
          <div className="mb-2">
            <strong className="text-sm">교통편 평가</strong>{" "}
            <StarRating rating={review.transportationRating} />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="mb-2">
            <div className="font-bold text-blue-600">장점</div>
            {review.pro}
          </div>
          <div className="mb-2">
            <div className="font-bold text-red-600">단점</div>
            {review.con}
          </div>
        </div>
      </div>
    </div>
  );
};

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className={`text-yellow-400 text-xs`}>
      {rating - index > 0 ? (
        rating - index > 0.5 ? (
          <Star
            className="w-5"
            fill="rgb(250 204 21 / var(--tw-text-opacity))"
          />
        ) : (
          <StarHalf
            className="w-5"
            fill="rgb(250 204 21 / var(--tw-text-opacity))"
          />
        )
      ) : (
        ""
      )}
    </div>
  ));

  return <div className="flex ">{stars}</div>;
};
