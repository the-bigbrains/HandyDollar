"use client";

interface props {
  data: any;
}

import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Graph1({ data }: props) {
  return (
    <>
      <div className="w-full h-[97%] flex justify-center outline-gray-500 outline rounded-xl mr-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={300}
            height={200}
            data={data}
            margin={{
              top: 40,
              right: 30,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{
                value: "Transaction dates",
                angle: 0,
                position: "bottom",
                offset: 0,
              }}
            />
            <YAxis
              dataKey="amount"
              label={{ value: "Amount ($)", angle: -90, position: "left" }}
              reversed
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="name"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="date"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="category"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
