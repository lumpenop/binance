import { useQuery } from '@tanstack/react-query';
import { getTicker } from '~/actions/get-ticker';

export const useTicker = (symbol: string) => {
  return useQuery({
    queryKey: ['ticker', symbol],
    queryFn: async () => {
      const res = await getTicker(symbol);
      if (res.status === 'error') {
        throw new Error(res.error);
      }
      return res.lastPrice;
    },
  });
};
