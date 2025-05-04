import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

const Performance = () => {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-semibold">Performance</h1>
        <img src="/moreDark.png" alt="More options" className="w-4 h-4" />
      </div>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="50%"
            innerRadius={70}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">9.2</h1>
        <p className="text-xs text-gray-400">of 10 max LTS</p>
      </div>

      {/* Footer Label */}
      <h2 className="absolute bottom-16 left-0 right-0 m-auto text-center font-medium">
        1st Semester - 2nd Semester
      </h2>
    </div>
  );
};

export default Performance;
