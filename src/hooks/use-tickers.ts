import { useQueries } from '@tanstack/react-query';
import { getTicker } from '~/actions/get-ticker';

export const useTicker = (symbols: string[]) => {
  const queries = symbols.map((symbol) => {
    return {
      queryKey: [symbol, symbol],
      queryFn: async () => {
        const res = await getTicker(symbol);
        if (res.status === 'error') {
          throw new Error(res.error);
        }
        return res.lastPrice;
      },
    };
  });
  return useQueries({ queries });
};
