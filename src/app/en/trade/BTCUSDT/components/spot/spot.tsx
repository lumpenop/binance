'use client';
import React, { useEffect, useState } from 'react';
import { useTicker } from '~/hooks/use-ticker';
import SpotTransaction from '~/app/en/trade/BTCUSDT/components/spot/spot-transaction';

const Spot = () => {
  const { data, isLoading, error } = useTicker('BTCUSDT');
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [buyAmount, setBuyAmount] = useState<number>(0.0);
  const [sellAmount, setSellAmount] = useState<number>(0.0);
  const [buyTotal, setBuyTotal] = useState<number>(0.0);
  const [sellTotal, setSellTotal] = useState<number>(0.0);
  useEffect(() => {
    if (!data) return;
    const price = Number(Number(data).toFixed(2));
    setBuyPrice(price);
    setSellPrice(price);
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (error) throw new Error(error.message);
  if (!data) return <div>No data</div>;

  return (
    <div className={'w-full flex gap-8 justify-center px-12 py-4'}>
      <SpotTransaction
        type={'Buy'}
        price={buyPrice}
        setPrice={setBuyPrice}
        amount={buyAmount}
        total={buyTotal}
        setAmount={setBuyAmount}
        setTotal={setBuyTotal}
      />
      <SpotTransaction
        type={'Sell'}
        price={sellPrice}
        setPrice={setSellPrice}
        amount={sellAmount}
        total={sellTotal}
        setAmount={setSellAmount}
        setTotal={setSellTotal}
      />
    </div>
  );
};

export default Spot;
