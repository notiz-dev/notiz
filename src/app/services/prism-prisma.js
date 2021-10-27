(function (Prism) {
  Prism.languages.prisma = {
    comment: /\/\/\/?.*/,
    keyword: /\b(?:datasource|generator|model|enum)\b/,
    builtin: /\b(?:String|Int|Boolean|DateTime)\b/,
    boolean: /\b(true|false)\b/,
    'attr-value': /(@@?[\w\.]+)/,
  };
})(Prism);
