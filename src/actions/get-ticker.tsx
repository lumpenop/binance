const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/api/v3/ticker`;
export const getTicker = async (symbol: string) => {
  const params = {
    symbol,
  };
  const queryString = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${END_POINT}?${queryString}`, {
      method: 'GET',
    });
    const data = response.json();
    if (!data) return { status: 'error', error: '데이터가 없습니다.' };
    const { lastPrice } = await data;
    return { status: 'success', lastPrice };
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
