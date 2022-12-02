const getYearsOld = () => {
  const now = new Date();
  const birthdayDate = new Date(1996, 11, 29);
  const birthdayDateNow = new Date(
    now.getFullYear(),
    birthdayDate.getMonth(),
    birthdayDate.getDate()
  );
  const age = now.getFullYear() - birthdayDate.getFullYear();
  if (now < birthdayDateNow) {
    return age - 1;
  }
  return age;
};

const getWordEnding = number => {
  if (
    number
      .toString()
      .includes(number.toString().match(/^[2-9]?[2-4]$/gm))
  ) {
    return 'года';
  }
  if (
    number.toString().includes(number.toString().match(/^[2-9]?1$/gm))
  ) {
    return 'год';
  }
  return 'лет';
};

export { getYearsOld, getWordEnding };
