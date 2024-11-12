import { getKlines } from '~/actions/get-klines';
import { useQuery } from '@tanstack/react-query';

export const useKlines = (symbol: string, interval: string, limit: number) => {
  return useQuery({
    queryKey: ['klines', symbol, interval, limit],
    queryFn: async () => {
      const res = await getKlines(symbol, interval, limit);
      if (res.status === 'error') {
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};
