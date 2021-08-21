export const getJSON = async (path) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${path}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const postJSON = async (path, data) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

