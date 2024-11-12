'use client';

import React from 'react';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
interface Props {
  chartData: number[][];
}
const MainChart = ({ chartData }: Props) => {
  return (
    <ApexChart
      type="candlestick"
      series={[
        {
          data: chartData.map((data) => [
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
          ]),
        },
      ]}
      width={'100%'}
      height={500}
      options={{
        theme: {
          mode: 'dark',
        },
        chart: {
          toolbar: {
            tools: {},
          },
          background: 'transparent',
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: 'datetime',
        },
      }}
    />
  );
};

export default MainChart;
