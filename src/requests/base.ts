type Body = { query: string; variables?: Record<string, unknown> };
type ResponseData = {
  [key: string]: unknown
}

export const sendRequest = (body: Body): Promise<ResponseData> => {
  return new Promise((resolve, reject) => {
    fetch(process.env.API_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const { data, errors } = await response.json();

        if (errors) {
          reject(errors[0].message);
        }

        resolve(data);
      })
      .catch(() => {
        reject("Couldn't process your request. Please, try again later");
      });
  });
};
