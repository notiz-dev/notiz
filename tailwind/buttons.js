const plugin = require("tailwindcss/plugin");

const button = plugin(function ({ addComponents, theme }) {
  const buttons = {
    ".btn": {
      fontWeight: theme("fontWeight.medium"),
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
      border: "1px solid transparent",
      padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
      borderRadius: theme("borderRadius.md"),
      boxShadow: theme("boxShadow.md"),
      backgroundColor: theme("colors.white"),
      color: theme("colors.gray.900"),
      "&:hover:not(:disabled)": {
        backgroundColor: theme("colors.gray.100"),
      },
      "&:disabled": {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    ".btn-flat": {
      border: `1px solid ${theme("colors.gray.200")}`,
      boxShadow: "none",
      color: theme("colors.primary.DEFAULT"),
    },
    ".btn-secondary": {
      backgroundColor: "rgba(0, 118, 189,0.1)",
      color: theme("colors.primary.DEFAULT"),
      "&:hover:not(:disabled)": {
        backgroundColor: "rgba(0, 118, 189,0.2)",
      },
    },
    ".btn-danger": {
      backgroundColor: "rgba(153, 27, 27, 0.1)",
      color: theme("colors.red.800"),
      "&:hover:not(:disabled)": {
        backgroundColor: "rgba(153, 27, 27, 0.2)",
      },
    },
    ".btn-primary": {
      backgroundColor: theme("colors.primary.DEFAULT"),
      color: theme("colors.white"),
      "&:hover:not(:disabled)": {
        backgroundColor: theme("colors.primary.light"),
      },
    },
    ".btn-small": {
      padding: `${theme("spacing.1")} ${theme("spacing.2")}`,
      fontSize: theme("fontSize.sm"),
    },
    ".btn-big": {
      padding: `${theme("spacing.3")} ${theme("spacing.6")}`,
      fontSize: theme("fontSize.lg"),
    },
  };

  addComponents(buttons);
});

module.exports = button;
