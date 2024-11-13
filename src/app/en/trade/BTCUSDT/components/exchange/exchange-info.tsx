import React, { useState } from 'react';
import { useExchangeInfo } from '~/hooks/use-exchange-info';
import { useTicker } from '~/hooks/use-tickers';

const ExchangeInfo = () => {
  const { data, isLoading: isInfoLoading, error } = useExchangeInfo();
  const tickerData = useTicker(data || []);
  const isTickerLoading = tickerData.some((r) => r.isLoading);
  const [searchText, setSearchText] = useState<string>('');

  if (isInfoLoading || isTickerLoading) return <div>Loading...</div>;
  if (error) throw new Error(error.message);
  if (data.length === 0 || !data) return <div>No data</div>;

  const exchanges = data.map((name: string, index: number) => {
    return {
      name: name.split('USDT')[0],
      ticker: tickerData[index].data,
    };
  });

  return (
    <div className={'p-2 flex flex-col justify-center'}>
      <div
        className={'border-[1px] rounded-lg overflow-hidden px-4 py-1 w-[90%]'}
      >
        <input
          type="text"
          className={'bg-black'}
          value={searchText}
          placeholder={'Search'}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />
      </div>
      <ul>
        {exchanges.map((exchange: { name: string; ticker: number }) => {
          return (
            <li
              key={exchange.name}
              className={
                'flex justify-between items-center rounded-lg px-4 py-2 my-2'
              }
            >
              <span>{exchange.name}</span>
              <span>{exchange.ticker}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(ExchangeInfo);
