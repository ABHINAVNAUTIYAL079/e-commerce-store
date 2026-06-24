import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();

  const { data: customers, isLoading: loading } = useGetUsersQuery();

  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();

  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#0F766E"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#E5E7EB",
      },
      markers: {
        size: 4,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales (₹)",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
    },

    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (salesDetail) {
      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: salesDetail.map((item) => item._id),
          },
        },

        series: [
          {
            name: "Sales",
            data: salesDetail.map((item) => item.totalSales),
          },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-[#1F2937] text-white p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#0F766E] text-center p-3">
              ₹
            </div>

            <p className="mt-5">Sales</p>

            <h1 className="text-xl font-bold">
              {isLoading ? (
                <Loader />
              ) : (
                `₹ ${sales?.totalSales?.toFixed(2) || "0.00"}`
              )}
            </h1>
          </div>

          <div className="rounded-lg bg-[#1F2937] text-white p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#0F766E] text-center p-3">
              👥
            </div>

            <p className="mt-5">Customers</p>

            <h1 className="text-xl font-bold">
              {loading ? <Loader /> : customers?.length || 0}
            </h1>
          </div>

          <div className="rounded-lg bg-[#1F2937] text-white p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#0F766E] text-center p-3">
              📦
            </div>

            <p className="mt-5">All Orders</p>

            <h1 className="text-xl font-bold">
              {loadingTwo ? <Loader /> : orders?.totalOrders || 0}
            </h1>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="70%"
          />
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
