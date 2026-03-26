// frontend/src/components/admin/analytics/OrdersChart.tsx
"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface OrdersChartProps {
  data: Array<{
    date: string;
    orders: number;
    revenue: number;
  }>;
}

export function OrdersChart({ data }: OrdersChartProps) {
  const chartData = data.map((item) => ({
    date: format(new Date(item.date), "MMM dd"),
    orders: item.orders,
    revenue: item.revenue,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Orders & Revenue Trend
      </h3>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No order data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "#111827", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="orders"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ fill: "#f97316", r: 4 }}
              activeDot={{ r: 6 }}
              name="Orders"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
              name="Revenue (₦)"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}