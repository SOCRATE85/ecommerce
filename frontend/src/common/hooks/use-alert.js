export const useAlert = () => {
  const error = (message) => {
    console.log(message);
  };
  const success = (message) => {
    console.log(message);
  };
  return { error, success };
};
