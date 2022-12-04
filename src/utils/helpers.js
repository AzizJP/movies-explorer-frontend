 export const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  }

  export const getYearsOld = () => {
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
  
  export const getWordEnding = number => {
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