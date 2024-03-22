const stringUtil = {
  escapeString(input: string) {
    let res = "";
    for (let i = 0; i < input.length; i++) {
      let c = input.charCodeAt(i);
      if (c < 256) res += encodeURIComponent(input[i]);
      else res += "%u" + c.toString(16).toUpperCase();
    }
    return res;
  },
  getByteLength(input: string) {
    let len = 0;
    for (let i = 0; i < input.length; i++) {
      if (this.escapeString(input.charAt(i)).length === 6) {
        len++;
      }

      len++;
    }

    return len;
  },
  padEndByByteLength(input: string, size: number) {
    let pos = 0;
    let i = 0;
    for (i = 0; i < input.length; i++) {
      pos += input.charCodeAt(i) > 128 ? 2 : 1;
    }
    if (pos >= size) {
      return input;
    }
    return input.padEnd(size - (pos - i));
  },
  subStringByByteLength(input: string, start: number, size: number) {
    let i = 0;
    let lim = 0;
    let pos = 0;
    let beg = 0;
    let len = this.getByteLength(input);

    for (i = 0; pos < start; i++) {
      pos += input.charCodeAt(i) > 128 ? 2 : 1;
    }

    beg = i;

    for (i = beg; i < len; i++) {
      lim += input.charCodeAt(i) > 128 ? 2 : 1;

      if (lim > size) {
        break;
      }
    }

    return input.substring(beg, i);
  },
};

export default stringUtil;
