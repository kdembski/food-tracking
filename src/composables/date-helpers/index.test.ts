import { useDateHelpers } from ".";

describe("Date Helpers", () => {
  const {
    getFormattedDate,
    firstDateInMonth,
    allDatesInMonth,
    fullMonthGrid,
    incrementMonth,
    decrementMonth,
    firstDateInWeek,
    getWeekDays,
    allDatesInWeek,
    incrementWeek,
    decrementWeek,
  } = useDateHelpers(() => true);

  beforeEach(() => {
    firstDateInMonth.value = new Date(2000, 1, 1);
    firstDateInWeek.value = new Date(2000, 1, 7);
  });

  it("getFormattedDate should return formatted date in polish locale", () => {
    expect(getFormattedDate(new Date(2000, 1, 1), "d MMMM yyyy")).toEqual(
      "1 lutego 2000"
    );
  });

  it("fullMonthGrid should return month day with placeholders for previous and next month", () => {
    expect(fullMonthGrid.value).toStrictEqual([
      31,
      ...allDatesInMonth.value,
      1,
      2,
      3,
      4,
      5,
    ]);

    firstDateInMonth.value = new Date(2000, 9, 1);
    expect(fullMonthGrid.value).toStrictEqual([
      25,
      26,
      27,
      28,
      29,
      30,
      ...allDatesInMonth.value,
      1,
      2,
      3,
      4,
      5,
    ]);

    firstDateInMonth.value = new Date(2000, 3, 1);
    expect(fullMonthGrid.value).toStrictEqual([
      27,
      28,
      29,
      30,
      31,
      ...allDatesInMonth.value,
    ]);
  });

  it("incrementMonth should add one month to date", () => {
    incrementMonth();
    expect(firstDateInMonth.value).toEqual(new Date(2000, 2, 1));
  });

  it("decrementMonth should substract one month from date", () => {
    decrementMonth();
    expect(firstDateInMonth.value).toEqual(new Date(2000, 0, 1));
  });

  it("getWeekDays should return week days short names if fullNames parameter is false", () => {
    expect(getWeekDays()).toEqual([
      "pon",
      "wto",
      "śro",
      "czw",
      "pią",
      "sob",
      "nie",
    ]);
  });

  it("getWeekDays should return week days full names if fullNames parameter is true", () => {
    expect(getWeekDays(true)).toEqual([
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
      "niedziela",
    ]);
  });

  it("allDatesInWeek should return array of dates in week based on firstDateInWeek", () => {
    expect(allDatesInWeek.value).toEqual([
      new Date(2000, 1, 7),
      new Date(2000, 1, 8),
      new Date(2000, 1, 9),
      new Date(2000, 1, 10),
      new Date(2000, 1, 11),
      new Date(2000, 1, 12),
      new Date(2000, 1, 13),
    ]);
  });

  it("incrementWeek should add one week to date", () => {
    incrementWeek();
    expect(firstDateInWeek.value).toEqual(new Date(2000, 1, 14));
  });

  it("decrementWeek should substract one week from date", () => {
    decrementWeek();
    expect(firstDateInWeek.value).toEqual(new Date(2000, 0, 31));
  });
});
