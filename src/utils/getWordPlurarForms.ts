export default function (
  singleForm: string,
  firstPlurarForm: string,
  seconPlurarForm: string,
  count: number
) {
  if (!count) {
    return "";
  }

  if (count === 1) {
    return "1 " + singleForm;
  }

  if (count >= 12 && count <= 14) {
    return count + " " + firstPlurarForm;
  }

  const countString = count?.toString();
  const firstDigit = parseInt(countString[countString?.length - 1]);

  if (firstDigit >= 2 && firstDigit <= 4) {
    return count + " " + seconPlurarForm;
  }

  return count + " " + seconPlurarForm;
}
