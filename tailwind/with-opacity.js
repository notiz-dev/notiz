const withOpacity = (cssVariable) => {
  return (t) => {
    console.log(t);
    if (t.opacityValue === undefined) {
      return `rgb(var(--${cssVariable}))`;
    }
    return `rgb(var(--${cssVariable}) / ${t.opacityValue})`;
  };
};

module.exports = withOpacity;
