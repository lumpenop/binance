'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useKlines } from '~/hooks/use-klines';
import Spot from '~/app/en/trade/BTCUSDT/components/spot/spot';
import ExchangeInfo from '~/app/en/trade/BTCUSDT/components/exchange/exchange-info';
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

  if (data.length === 0) return;
  return (
    <div className={'flex max-w-[1200px] min-w-[800px] justify-center'}>
      <div className={'w-[65%] '}>
        <MainChart chartData={data} />
        <Spot />
      </div>
      <div className={'w-[30%]'}>
        <ExchangeInfo />
      </div>
    </div>
  );
};

export default Page;
