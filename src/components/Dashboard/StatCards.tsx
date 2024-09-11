import salesData, {
  getMonthWiseSalesTotals,
  getMostPopularItemForMonth,
  getMostRevenueItemForMonth,
  getTotalSales,
  getMinMaxAvgOrdersForMostPopularItem,
} from "@/constants/modifiedDataSet";
import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

type OrdersStaticsType = {
  [key: string]: {
    min: number;
    max: number;
    avg: number;
  };
};

export const StatCards = ({ selectedDate }: any) => {
  const [year, month, day] = selectedDate.split("-");
  const keyObject = `${year}-${month}`;

  const { totalQuantity, totalRevenue } = getTotalSales(salesData);

  const getMonthlySale = getMonthWiseSalesTotals(salesData, year, month);

  const getMonthlyPopular = getMostPopularItemForMonth(salesData, year, month);

  const getOrdersStatics:any = getMinMaxAvgOrdersForMostPopularItem(
    salesData,
    getMonthlyPopular
  );

  const { item: MostRevenueItem, revenue } = getMostRevenueItemForMonth(
    salesData,
    year,
    month
  );

  const key = Object.keys(getMonthlySale)[0];

  // Access values using the dynamic key
  const totalQuantityMonthly = getMonthlySale[key]?.totalQuantity;
  const totalRevenueMonthly = getMonthlySale[key]?.totalRevenue;

  // Find the corresponding month data
  const selectedData = getOrdersStatics[keyObject];

  console.log("selectedData");
  console.log(selectedData);
  return (
    <>
      <Card
        title="Total Store Sales"
        value={"₹" + totalRevenue}
        pillText="2.75%"
        trend="up"
        period=""
        product=""
        totalRevenue={totalRevenue}
        totalQuantity={totalQuantity}
      />
      <Card
        title="Monthly Sales Totals"
        value={"₹" + totalRevenueMonthly}
        pillText="1.01%"
        trend="up"
        period="Specified Month"
        product=""
        totalRevenue={totalRevenueMonthly}
        totalQuantity={totalQuantityMonthly}
      />
      <Card
        title="Most Popular Monthly Item Sold"
        value={getMonthlyPopular?.quantity}
        pillText="60.75%"
        trend="up"
        period="Specified Month"
        product={getMonthlyPopular?.item}
      />
      <Card
        title="Top Monthly Revenue Items"
        value={"₹" + revenue}
        pillText="60.75%"
        trend="up"
        period="Specified Month"
        product={MostRevenueItem}
      />
      <Card
        title="Popular Item Monthly Orders: Min/Max/Avg"
        min={selectedData?.min}
        max={selectedData?.max}
        avg={selectedData?.avg}
        pillText="60.75%"
        trend="up"
        period="Specified Month"
        value=""
        product={getMonthlyPopular?.item}
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
  min,
  max,
  avg,
  product,
  totalQuantity,
  totalRevenue,
}: {
  title: string;
  value: string | number;
  pillText: string;
  trend: "up" | "down";
  period: string;
  min?: string | number;
  max?: string | number;
  avg?: string | number;
  product?: string | number | any;
  totalQuantity?: string | number;
  totalRevenue?: number;
}) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 p-4 rounded border border-stone-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex mb-8 items-start justify-between">
          <div>
            <h3 className="text-stone-800 mb-2 text-sm">{title}</h3>
            {min && max && avg ? (
              <div className="space-y-4">
                <div className="flex space-x-12">
                  <p className="text-xl font-semibold">Min: {min}</p>
                  <p className="text-xl font-semibold">Max: {max}</p>
                  <p className="text-xl font-semibold">
                    Avg: {Number(avg).toFixed(2)}
                  </p>
                </div>
                {product && (
                  <p className="text-sm text-stone-500 mt-1">
                    Product: {product}
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="text-3xl font-semibold">{value}</p>
                {totalQuantity && (
                  <p className="text-sm text-stone-500 mt-1">
                    Total Quantity Sold: {totalQuantity}
                  </p>
                )}
                {totalRevenue && (
                  <p className="text-sm text-stone-500 mt-1">
                    Total Revenue Generated: ₹{totalRevenue}
                  </p>
                )}
                {product && (
                  <p className="text-sm text-stone-500 mt-1">
                    Product: {product}
                  </p>
                )}
              </>
            )}
          </div>

          <span
            className={`text-xs flex items-center gap-1 font-medium px-4 py-2 rounded ${
              trend === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
          </span>
        </div>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
