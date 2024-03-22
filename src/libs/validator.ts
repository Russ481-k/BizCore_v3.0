const validator = {
  isValidEmail(input: string | undefined | null) {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return input ? regExp.test(input) : false;
  },
  isExpression(input: string | undefined | null) {
    const regExp = /^\$\$.+\$\$$/;
    return input ? regExp.test(input) : false;
  },
};

export default validator;
