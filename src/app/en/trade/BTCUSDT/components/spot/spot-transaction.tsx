import React, { useEffect } from 'react';
import SpotTransactionButtonInput from '~/app/en/trade/BTCUSDT/components/spot/spot-transaction-button-input';
import { twMerge } from 'tailwind-merge';

interface Props {
  type: 'Buy' | 'Sell';
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  total: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}
const SpotTransaction = ({
  type,
  price,
  setPrice,
  amount,
  total,
  setTotal,
  setAmount,
}: Props) => {
  const checkZero = (num: number, func: () => number) => {
    console.log('num', num === 0);
    if (num === 0) return num;
    return func();
  };
  const handlePriceUp = (
    setPrice: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setPrice((prev) => (Math.round(prev * 100) + 1) / 100);
  };
  const handlePriceDown = (
    setPrice: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setPrice((prev) =>
      checkZero(prev, () => (Math.round(prev * 100) - 1) / 100),
    );
  };

  const handleAmountUp = (
    setPrice: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setPrice((prev) => (Math.round(prev * 100000) + 1) / 100000);
  };
  const handleAmountDown = (
    setPrice: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setPrice((prev) =>
      checkZero(prev, () => (Math.round(prev * 100000) - 1) / 100000),
    );
  };

  useEffect(() => {
    setTotal((price * (amount * 10000000)) / 10000000);
  }, [price, amount]);
  return (
    <div className={'flex flex-col gap-2 w-1/2'}>
      <SpotTransactionButtonInput
        type={'Price'}
        setPrice={setPrice}
        price={price}
        handleUp={handlePriceUp}
        handleDown={handlePriceDown}
      />
      <SpotTransactionButtonInput
        type={'Amount'}
        setPrice={setAmount}
        price={amount}
        handleUp={handleAmountUp}
        handleDown={handleAmountDown}
      />
      <div
        className={
          'flex items-center justify-between h-14 border-[1px] rounded-lg px-4 gap-4'
        }
      >
        <span className={'text-stone-400'}>Total</span>
        <div className={'flex gap-4'}>
          <span className={twMerge(total === 0 && 'text-stone-500')}>
            {total === 0 ? 'Minimum 5' : total.toFixed(7)}
          </span>
          USDT
        </div>
      </div>
      <button
        className={twMerge(
          `h-14 w-full rounded-xl font-bold text-lg`,
          type === 'Buy' ? 'bg-[#2ebd85]' : 'bg-[#f6465d]',
          total < 5 && 'filter grayscale-[20%] opacity-70',
        )}
        disabled={total < 5}
      >{`${type} BTC`}</button>
    </div>
  );
};

export default SpotTransaction;
