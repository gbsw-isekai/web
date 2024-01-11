import { Line } from "react-chartjs-2";

export default function EmployeeGraph({ companyNpsEmployeeData }) {
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
}
