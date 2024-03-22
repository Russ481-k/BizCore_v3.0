const excelUtil = {
  getExcelColumnString(columnNumber: number) {
    let columnName = [];
    while (columnNumber > 0) {
      let rem = columnNumber % 26;
      if (rem === 0) {
        columnName.push("Z");
        columnNumber = Math.floor(columnNumber / 26) - 1;
      } else {
        columnName.push(String.fromCharCode(rem - 1 + "A".charCodeAt(0)));
        columnNumber = Math.floor(columnNumber / 26);
      }
    }
    return columnName.reverse().join("");
  },
};

export default excelUtil;
