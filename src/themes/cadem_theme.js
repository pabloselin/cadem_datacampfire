import { assign } from "lodash";

// *
// * Colors
// *

const colors = [
  "#000000",
  "#363531",
  "#595753",
  "#8c8981",
  "#b3aea4",
  "#d4cfc4",
  "#f0efeb"
];

const azules = ["#08009e", "#71b0e5", "#95c7ce", "#aec5c1"];
const activeColor = "#0038f0";

const semaforo = {
  rojo: ["#e74c3c", "#eb9d93"],
  amarillo: ["#ffb800", "#f8d376"],
  verde: ["#1abc9c", "#85d5cd"]
};

const paleta = {
  escala_grises: colors,
  escala_azules: azules,
  escala_semaforo: semaforo,
  destacado: activeColor
};

const colors_b = [
  "#828282",
  "#969696",
  "#aaaaaa",
  "#bebebe",
  "#d2d2d2",
  "#dcdcdc"
];

const charcoal = "#252525";
//const green = "#1abc9c";

// *
// * Typography
// *
const sansSerif = "Asap";
const letterSpacing = "normal";
//const fontSize = 12;
// *
// * Layout
// *
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize: 10,
  letterSpacing,
  padding: 6,
  fill: charcoal,
  stroke: "transparent"
};

const tickLabelStyles = {
  fontSize: 12,
  fill: "#555",
  padding: 6,
  fontFamily: sansSerif
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);
// *
// * Strokes
// *
const strokeLinecap = "round";
const strokeLinejoin = "round";
const strokeDasharray = "10, 5";

export default {
  area: assign(
    {
      style: {
        data: {
          fill: charcoal
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  ),
  axis: assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: charcoal,
          strokeWidth: 1.5,
          strokeLinecap,
          strokeLinejoin
        },
        axisLabel: assign({}, centeredLabelStyles, {
          padding: 25
        }),
        grid: {
          fill: "none",
          stroke: "#ccc",
          strokeWidth: 0.4,
          pointerEvents: "painted",
          strokeDasharray,
          strokeLinejoin,
          strokeLinecap
        },
        ticks: {
          fill: "transparent",
          size: 1,
          stroke: "transparent"
        },
        tickLabels: tickLabelStyles
      }
    },
    baseProps
  ),
  bar: assign(
    {
      colorScale: colors,
      style: {
        data: {
          padding: 8,
          strokeWidth: 0
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  candlestick: assign(
    {
      style: {
        data: {
          stroke: charcoal,
          strokeWidth: 1
        },
        labels: centeredLabelStyles
      },
      candleColors: {
        positive: "#ffffff",
        negative: charcoal
      }
    },
    baseProps
  ),
  chart: baseProps,
  errorbar: assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: "transparent",
          stroke: charcoal,
          strokeWidth: 2
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  ),
  group: assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  line: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "#ccc",
        strokeWidth: 1
      },
      labels: centeredLabelStyles
    },
    colorScale: colors_b,
    width: 450,
    height: 300,
    padding: 20
  }),
  pie: {
    style: {
      data: {
        padding: 0,
        stroke: "transparent",
        strokeWidth: 1
      },
      labels: assign({}, baseLabelStyles, { padding: 10 })
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 0
  },
  scatter: assign(
    {
      style: {
        data: {
          fill: charcoal,
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: centeredLabelStyles
      }
    },
    baseProps
  ),
  stack: assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  tooltip: {
    style: assign({}, centeredLabelStyles, {
      padding: 2,
      pointerEvents: "none"
    }),
    flyoutStyle: {
      stroke: charcoal,
      strokeWidth: 0.5,
      fill: "#f0f0f0",
      pointerEvents: "none"
    },
    cornerRadius: 2,
    pointerLength: 6
  },
  voronoi: assign(
    {
      style: {
        data: {
          fill: "transparent",
          stroke: "transparent",
          strokeWidth: 0
        },
        labels: assign({}, centeredLabelStyles, {
          padding: 5,
          pointerEvents: "none"
        }),
        flyout: {
          stroke: charcoal,
          strokeWidth: 1,
          fill: "#f0f0f0",
          pointerEvents: "none"
        }
      }
    },
    baseProps
  ),
  legend: {
    colorScale: colors,
    gutter: 5,
    orientation: "vertical",
    titleOrientation: "top",
    style: {
      data: {
        type: "circle"
      },
      labels: baseLabelStyles,
      title: assign({}, baseLabelStyles, { padding: 5 })
    }
  },
  interactions: {
    hover: activeColor,
    active: activeColor,
    paleta: paleta
  }
};
