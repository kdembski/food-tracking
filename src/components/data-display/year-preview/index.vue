<script lang="ts">
import CSkeletonLoader from "@/components/feedback/skeleton-loader/index.vue";

export default {
  name: "CYearPreview",
  components: { CSkeletonLoader },
};
</script>

<script setup lang="ts">
import { subMonths } from "date-fns";
import { useDateHelpers } from "@/composables/date-helpers/index";
import { useWindowSize } from "@/composables/window-size";

const { getFormattedDate } = useDateHelpers();
const { isMobile } = useWindowSize();

const props = defineProps({
  months: {
    type: Array as () => Date[][],
    default: () => [],
  },
});

const getMonthsShortcuts = () => {
  const shortcuts: string[] = [];

  for (let i = 11; i >= 0; i--) {
    const today = new Date();
    const date = subMonths(today, i);

    shortcuts.push(getFormattedDate(new Date(date), "MMM"));
  }

  return shortcuts;
};

const getChartHeight = () => {
  if (isMobile.value) {
    return 90;
  }
  return 50;
};

const getPath = () => {
  const points = getPoints();
  points?.unshift([0, getChartHeight()]);
  points?.push([220, getChartHeight()]);

  return points?.reduce((accum, point, index, array) => {
    if (index === 0) {
      return "M " + point[0] + " " + point[1];
    }
    return accum + " " + buildBezierForPoint(point, index, array);
  }, "");
};

const buildBezierForPoint = (
  point: number[],
  index: number,
  array: number[][]
) => {
  const [startControlPointX, startControlPointY] = getControlPoint(
    array[index - 1],
    array[index - 2],
    point
  );

  const [endControlPointX, endControlPointY] = getControlPoint(
    point,
    array[index - 1],
    array[index + 1],
    true
  );
  return `C ${startControlPointX} ${startControlPointY} ${endControlPointX} ${endControlPointY} ${point[0]} ${point[1]}`;
};

const getControlPoint = (
  current: number[],
  previous: number[],
  next: number[],
  reverse?: boolean
) => {
  previous = previous || current;
  next = next || current;

  const smoothing = 0.2;
  const opposedLine = getLine(previous, next);

  const angle = opposedLine.angle + (reverse ? Math.PI : 0);
  const length = opposedLine.length * smoothing;

  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

const getLine = (pointA: number[], pointB: number[]) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const getPoints = () => {
  return props.months.map((month, index) => {
    const datesLength = month.length;
    const x = index * 20;
    const y = getChartHeight() - datesLength * (getChartHeight() / 10);
    return [x, y];
  });
};
</script>

<template src="./template.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
