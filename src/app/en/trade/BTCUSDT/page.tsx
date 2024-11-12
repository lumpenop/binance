'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useKlines } from '~/hooks/use-klines';
const MainChart = dynamic(
  () => import('~/app/en/trade/BTCUSDT/components/main-chart'),
  {
    ssr: false,
  },
);

const Page = () => {
  const { data, isLoading, error } = useKlines('BTCUSDT', '1d', 60);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    throw new Error(error.message);
  }
  return (
    <div>
      <MainChart chartData={data} />
    </div>
  );
};

export default Page;
