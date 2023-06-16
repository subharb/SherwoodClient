// import Montserrat from './fonts/Montserrat.woff2';
// const montserrat = {
//     fontFamily: 'Montserrat',
//     fontStyle: 'normal',
//     fontDisplay: 'swap',
//     fontWeight: 400,
//     src: `
//       local('Montserrat'),
//       local('Montserrat-Regular'),
//       url(${RalewayWoff2}) format('woff2')
//     `,
//     unicodeRange:
//       'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
//   };

const typography = {
  fontFamily: [
      "Montserrat",
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
  ].join(","),
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontSize: "2rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h2: {
    fontSize: "1.75rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h4: {
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.25,
  },
  h5: {
    fontSize: "1.0625rem",
    fontWeight: 500,
    lineHeight: 1.25,
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.25,
  },
  body1: {
    fontSize: 18,
  },
  button: {
    textTransform: "none",
  },
};

export default typography;
