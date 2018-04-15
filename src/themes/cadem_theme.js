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

const azules = [
  "#71b0e5",
  "#95c7ce",
  "#aec5c1",
  "#b3aea4",
  "#d4cfc4",
  "#f0efeb"
];
const activeColor = "#0038f0";
const activeColor_alt = "#08009e";
const activeColor_alt_2 = "#1abc9c";

const semaforo = {
  rojo: ["#eb9d93", "#e74c3c"],
  amarillo: ["#f8d376", "#ffb800"],
  verde: ["#85d5cd", "#1abc9c"]
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
  padding: 50
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
          stroke: "#dcdcdc",
          strokeWidth: 0.4,
          pointerEvents: "painted",
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
      altColorScale: azules,
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
  linebar: assign(
    {
      colorScale: ["#8c8981", "#cccccc", "#555"],
      altColorScale: ["#95c7ce", "#ccc"]
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
      colorScale: ["#595753", "#d4cfc4", "#f0efeb", "#ccc"],
      altColorScale: ["#71b0e5", "#95c7ce", "#aec5c1", "#555"]
    },
    baseProps
  ),
  tooltip: {
    style: assign({}, centeredLabelStyles, {
      padding: 2,
      pointerEvents: "none"
    }),
    flyoutStyle: {
      stroke: "black",
      strokeWidth: 0.8,
      fill: "#f0f0f0",
      pointerEvents: "none"
    },
    cornerRadius: 1,
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
    hover_alt: activeColor_alt_2,
    active: activeColor,
    paleta: paleta
  }
};
