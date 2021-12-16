const withOpacity = (cssVariable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(--${cssVariable}))`;
    }
    return `rgb(var(--${cssVariable}) / ${opacityValue})`;
  };
};

module.exports = withOpacity;
