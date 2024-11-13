import { useQuery } from '@tanstack/react-query';
import { getExchangeInfo } from '~/actions/get-exchange-info';

export interface SymbolInfo {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

export const useExchangeInfo = () => {
  return useQuery({
    queryKey: ['exchange'],
    queryFn: async () => {
      const res = await getExchangeInfo();
      if (res.status === 'error') {
        throw new Error(res.error);
      }
      const { symbols } = await res.data;
      if (!symbols) return [];
      return symbols
        .filter((symbolInfo: SymbolInfo) => symbolInfo.quoteAsset === 'USDT')
        .slice(0, 20)
        .map((symbolInfo: SymbolInfo) => symbolInfo.symbol);
    },
  });
};
