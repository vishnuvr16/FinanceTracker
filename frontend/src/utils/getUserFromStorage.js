export const getUserFromStorage = () => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  return token;
};
