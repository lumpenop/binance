import React from 'react';

interface Props {
  type: 'Price' | 'Amount';
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  handleUp: (setPrice: React.Dispatch<React.SetStateAction<number>>) => void;
  handleDown: (setPrice: React.Dispatch<React.SetStateAction<number>>) => void;
}
const SpotTransactionButtonInput = ({
  type,
  price,
  setPrice,
  handleDown,
  handleUp,
}: Props) => {
  const result = type === 'Price' ? price.toFixed(2) : price.toFixed(5);
  return (
    <div
      className={
        'flex items-center border-[1px] rounded-lg border-stone-500 justify-between'
      }
    >
      <div className={'flex px-4 items-center justify-between w-full'}>
        <span className={'text-stone-400'}>{type}</span>
        <span>{result} USDT</span>
      </div>
      <div className={'flex flex-col border-l-[1px] border-stone-500'}>
        <button onClick={() => handleUp(setPrice)}>up</button>
        <span className={'h-[1px] w-full bg-stone-500'} />
        <button onClick={() => handleDown(setPrice)}>down</button>
      </div>
    </div>
  );
};

export default SpotTransactionButtonInput;
