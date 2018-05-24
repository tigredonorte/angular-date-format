export function createAutoCorrectedDatePipe(dateFormat = 'YYYY-MM-DD', forceMask = false) {
  return function (conformedValue) {
    if (!forceMask) {
      const numbers = conformedValue.match(/\d+/g);
      if (!numbers) {
        return {
          value: '',
          indexesOfPipedChars: []
        };
      }
    }
    const indexesOfPipedChars = [];
    const dateFormatArray = dateFormat.split(/[^DMYHms]+/);
    const maxValue = { 'DD': 31, 'MM': 12, 'YY': 99, 'YYYY': 9999, 'HH': 23, 'mm': 59, 'ss': 59 }
    const minValue = { 'DD': 1, 'MM': 1, 'YY': 0, 'YYYY': 1, 'HH': 0, 'mm': 0, 'ss': 0 }
    const conformedValueArr = conformedValue.split('');
    const allIndexes = [];

    // Check first digit
    dateFormatArray.forEach((format) => {
      const position = dateFormat.indexOf(format);
      const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);
      allIndexes.push(position);
      if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
        conformedValueArr[position + 1] = conformedValueArr[position];
        conformedValueArr[position] = 0;
        indexesOfPipedChars.push(position);
      }
    });

    // Check for invalid date
    const assocFormat = {};
    const isInvalid = dateFormatArray.some((format) => {
      const position = dateFormat.indexOf(format);
      const length = format.length;
      const textValue = conformedValue.substr(position, length).replace(/\D/g, '');
      const value = parseInt(textValue, 10);

      assocFormat[format] = value;
      return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
    });

    if (isInvalid) {
      return false;
    }

    if (false === checkMonthConsistency(assocFormat)) {
      return false;
    }

    return {
      value: conformedValueArr.join(''),
      indexesOfPipedChars
    };
  }

  function checkMonthConsistency(assocFormat) {
    const d = assocFormat['DD'];
    const m = assocFormat['MM'];
    if (isNaN(m) || isNaN(d)) {
      return true;
    }
    if (m === 2) {
      return d <= 29;
    }
    if (m === 4 || m === 6 || m === 9 || m === 11) {
      return d <= 30 ? true : false;
    }
    return d <= 31 ? true : false;
  }
}
