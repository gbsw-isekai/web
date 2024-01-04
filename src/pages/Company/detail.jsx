import React, { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { useNavigate, useParams } from "react-router-dom";
import {
  companyViewCount,
  getCompany,
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
import { Line } from "react-chartjs-2";
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
  LineController,
  BarController,
} from "chart.js";
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
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
      const response = await createCompanyComment(
        companiesId,
        { content },
        token
      );
      if (response.status == 200) {
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
      if (response.status == 200) {
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
    if (!token || !userId) {
      alert("로그인을 하셔야 회사 정보를 조회할 수 있습니다.");
      navigate("/auth/login");
    }
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
        <div className="border rounded-md p-4 flex flex-col gap-2">
          <div className="text-lg font-bold">소셜</div>
          <CompanyCommentList comments={comments ?? []} />
          <CompanyCommentForm
            placeholder="댓글을 입력하세요."
            onSubmit={handleCommentSubmit}
          />
        </div>
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

const EmployeeGraph = ({ companyNpsEmployeeData }) => {
  console.log(companyNpsEmployeeData);
  if (!companyNpsEmployeeData) {
    return <></>;
  }

  const months = companyNpsEmployeeData.map(
    (data) => `${data.year}-${data.month}`
  );
  const totalValues = companyNpsEmployeeData.map((data) => data.total);
  const monthlyPrices = companyNpsEmployeeData.map(
    (data) => data.monthlyPrice / 0.09 / data.total
  );

  console.log(companyNpsEmployeeData);

  const data = {
    labels: months,
    datasets: [
      {
        label: "직원 수",
        type: "bar",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: totalValues,
      },
      {
        label: "월 평균 월급",
        type: "line",
        yAxisID: "monthlyPrice",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: monthlyPrices,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "직원 수",
        },
      },
      monthlyPrice: {
        position: "right",
        title: {
          display: true,
          text: "월 평균 가격",
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

const AddReviewForm = ({
  data = {
    title: "",
    pro: "",
    con: "",
    welfareAndSalaryRating: 0,
    atmosphereRating: 0,
    workloadRating: 0,
    transportationRating: 0,
  },
  onDataChange,
}) => {
  const formData = data;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onAddReview(formData);
  //   // You can add additional logic here, like clearing the form or closing a modal
  // };

  return (
    <form>
      <div className="mb-4">
        <Label htmlFor="title" className="block font-bold mb-2">
          제목
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="pro" className="block font-bold mb-2">
          장점
        </Label>
        <Textarea
          id="pro"
          name="pro"
          value={formData.pro}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="con" className="block font-bold mb-2">
          단점
        </Label>
        <Textarea
          id="con"
          name="con"
          value={formData.con}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="welfareAndSalaryRating"
          className="block font-bold mb-2"
        >
          복지&급여
        </Label>
        <Input
          type="number"
          id="welfareAndSalaryRating"
          name="welfareAndSalaryRating"
          value={formData.welfareAndSalaryRating}
          onChange={handleInputChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="atmosphereRating" className="block font-bold mb-2">
          분위기
        </Label>
        <Input
          type="number"
          id="atmosphereRating"
          name="atmosphereRating"
          value={formData.atmosphereRating}
          onChange={handleInputChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="workloadRating" className="block font-bold mb-2">
          업무 정도/강도
        </Label>
        <Input
          type="number"
          id="workloadRating"
          name="workloadRating"
          value={formData.workloadRating}
          onChange={handleInputChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="transportationRating" className="block font-bold mb-2">
          교통
        </Label>
        <Input
          type="number"
          id="transportationRating"
          name="transportationRating"
          value={formData.transportationRating}
          onChange={handleInputChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>
      {/* <Button type="submit">리뷰 달기</Button> */}
    </form>
  );
};
