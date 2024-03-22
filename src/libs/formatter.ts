const formatter = {
  contactFormatter(input: string | undefined | null) {
    if (input) {
      const contact = input.replace(/\D/g, "");
      if (contact.length === 8) {
        return contact.replace(/^(\d{4})(\d{4})$/, `$1-$2`);
      }
      return contact.replace(/^(\d{2,3})-?(\d{3,4})-?(\d{4})$/, `$1-$2-$3`);
    }
    return input ?? "";
  },
  currencyFormatter(input: string | undefined | null) {
    if (input) {
      const currency = input.replace(/\D/g, "");
      return Number(currency).toLocaleString();
    }
    return input ?? "";
  },
  dateFormatter(input: string | undefined | null) {
    if (input) {
      const date = input.replace(/\D/g, "");

      const dateRegExp = /^(\d{4})(\d{2})(\d{2})$/;
      if (dateRegExp.test(date)) {
        return date.replace(dateRegExp, `$1-$2-$3`);
      }
      const dateTimeRegExp = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
      if (dateTimeRegExp.test(date)) {
        return date.replace(dateTimeRegExp, `$1-$2-$3 $4:$5:$6`);
      }
      return date;
    }
    return input ?? "";
  },
  socialSecurityNumberFormatter(input: string | undefined | null) {
    if (input) {
      const ssn = input.replace(/[^\d*]/g, "");
      return ssn.replace(/^(\d{6})(\d{7}|\d{1}\*{6}|\*{7})$/, `$1-$2`);
    }
    return input ?? "";
  },
};

export default formatter;
