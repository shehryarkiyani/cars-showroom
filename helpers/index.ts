export const validateEmail = (inputText: string) => {
  const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (regex.test(inputText)) {
    return true;
  } else {
    return false;
  }
};
