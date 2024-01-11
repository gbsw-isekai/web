import React, { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { useNavigate, useParams } from "react-router-dom";
import {
  companyViewCount,
  createCompanyComment,
  createCompanyReview,
} from "src/lib/company";
import Header from "src/components/common/Header";
import { Briefcase, MapPin } from "lucide-react";
import CompanyReview from "src/components/company/review";
import CompanyCommentForm from "src/components/company/Form/CompanyCommentForm";
import useSWR from "swr";
import { fetcher } from "src/lib/fetcher";
import CompanyCommentList from "src/components/company/CompanyCommentList";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  LineController,
} from "chart.js";
import { Button } from "src/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "src/components/ui/alert-dialog";
import EmployeeGraph from "../../components/company/emploteeGraph";
import AddReviewForm from "../../components/company/Form/addReviewForm";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController
);

const Detail = () => {
  const navigate = useNavigate();
  const [token, userId] = useToken();
  const { companiesId } = useParams();

  const [reviewData, setReviewData] = useState({
    title: "",
    pro: "",
    con: "",
    welfareAndSalaryRating: 0,
    atmosphereRating: 0,
    workloadRating: 0,
    transportationRating: 0,
  });

  const {
    data: company,
    isLoading: isCompanyLoading,
    error: companyError,
    mutate: mutateCompany,
  } = useSWR(`/companies/${companiesId}`, fetcher);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
    mutate: mutateComments,
  } = useSWR(`/companies/${companiesId}/comments`, fetcher);

  const handleCommentSubmit = async (content) => {
    try {
      if (content === "") {
        alert("댓글을 입력해주세요");
        return false;
      }
      const response = await createCompanyComment(
        companiesId,
        { content },
        token
      );
      if (response.status === 200) {
        mutateComments();
      } else {
        alert("댓글 등록 실패:" + response.status);
      }
    } catch (error) {
      alert("댓글 등록중 오류가 발생했습니다.");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await createCompanyReview(
        companiesId,
        reviewData,
        token
      );
      if (response.status === 200) {
        mutateCompany();
        setReviewData({
          title: "",
          pro: "",
          con: "",
          welfareAndSalaryRating: 0,
          atmosphereRating: 0,
          workloadRating: 0,
          transportationRating: 0,
        });
      } else {
        alert("리뷰 등록 실패:" + response.status);
      }
    } catch (error) {
      alert("리뷰 등록중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const companyView = async () => {
      try {
        await companyViewCount(companiesId, token);
      } catch (error) {
        console.error("조회수 업데이트 중 오류가 발생했습니다.", error);
      }
    };
    if (!token || !userId) {
      alert("로그인을 하셔야 회사 정보를 조회할 수 있습니다.");
      navigate("/auth/login");
    }
    companyView();
  }, [token, userId, navigate]);

  if (isCompanyLoading) {
    return <div className="text-center">조회중...</div>;
  }

  if (companyError) {
    return (
      <div className="text-center text-red-500">
        ERROR STATE: [{companyError.toString()}]
      </div>
    );
  }

  if (isCommentsLoading) {
    return <div className="text-center">조회중...</div>;
  }

  if (commentsError) {
    return (
      <div className="text-center text-red-500">
        ERROR STATE: [{commentsError.toString()}]
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="w-full max-w-3xl mx-auto pt-8 px-4 mb-10 flex flex-col gap-8">
        <div className="border rounded-md p-8 relative flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{company.name}</h1>
          <div className="flex">
            <div className="">
              <p className="text-sm flex">
                <Briefcase size={20} strokeWidth={1.75} className="mr-1" />
                {company.industry.replaceAll("그 외 기타", "")}
              </p>
            </div>
            <div className="ml-4 flex">
              <MapPin size={20} strokeWidth={1.75} className="mr-1" />
              <p className="text-sm">{company.address.split(" ")[0]}</p>
            </div>
          </div>
          <div className="text-sm absolute top-8 right-8">
            <p>조회수: {company.viewCount}</p>
          </div>
        </div>
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full ">
            <tbody>
              <tr>
                <td className="border p-2">
                  <span className="font-bold">상세 주소</span>
                </td>
                <td className="border p-2">{company.address}</td>
                <td className="border p-2">
                  <span className="font-bold">우편번호</span>
                </td>
                <td className="border p-2">{company.postalCode}</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <span className="font-bold">사업자 번호</span>
                </td>
                <td className="border p-2" colSpan={3}>
                  {company.registrationNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <span className="font-bold">사원 수</span>
                </td>
                <td className="border p-2">{company.employeeCount ?? "-"}명</td>
                <td className="border p-2">
                  <span className="font-bold">평균 월급</span>
                </td>
                <td className="border p-2">
                  {new Intl.NumberFormat().format(company.averageYearPrice) ??
                    "-"}
                  원
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border rounded-md p-4 flex flex-col gap-2">
          <div className="text-xl font-bold">월 직원수/평균 월급 추이</div>
          <EmployeeGraph
            companyNpsEmployeeData={company.companyNpsEmployeeData}
          />
        </div>
        {/* 소셜 */}
        <div className="border rounded-md p-4 flex flex-col gap-2">
          <div className="text-lg font-bold">소셜</div>
          <CompanyCommentList
            comments={comments ?? []}
            companyId={company.id}
          />
          <CompanyCommentForm
            placeholder="댓글을 입력하세요."
            onSubmit={handleCommentSubmit}
          />
        </div>
        {/* 리뷰 */}
        <div className="w-full p-4 border rounded-md flex flex-col gap-4">
          <div className="flex">
            <div className="text-xl">리뷰</div>
            <div className="flex-1"></div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">리뷰 추가하기</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>리뷰 추가하기</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="h-80 overflow-y-scroll">
                        <AddReviewForm
                          data={reviewData}
                          onDataChange={(e) => setReviewData(e)}
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReviewSubmit}>
                      리뷰 달기
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <CompanyReview reviews={company.reviews} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
