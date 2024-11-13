const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/api/v3/exchangeInfo`;
export const getExchangeInfo = async () => {
  try {
    const response = await fetch(`${END_POINT}`, {
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
