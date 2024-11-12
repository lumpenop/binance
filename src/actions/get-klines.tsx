const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/api/v3/klines`;
export const getKlines = async (
  symbol: string,
  interval: string,
  limit: number,
) => {
  const endTime = Date.now();
  const startTime = endTime - limit * 24 * 60 * 60 * 1000;
  const params = {
    endTime: endTime.toString(),
    startTime: startTime.toString(),
    symbol,
    interval,
    limit: limit.toString(),
  };
  const queryString = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${END_POINT}?${queryString}`, {
      method: 'GET',
    });
    const data = response.json();
    return { status: 'success', data };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'error',
        error: error.message,
      };
    }

    return {
      status: 'error',
      error: '알 수 없는 에러가 발생했습니다.',
    };
  }
};
