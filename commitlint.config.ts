module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "design",
        "comment",
        "rename",
        "remove",
        "!BREAKING CHANGE",
        "!HOTFIX",
      ],
    ],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\[?[A-Z]+-\d+\])?\s?(\w*):\s(.+)$/,
      headerCorrespondence: ["ticket", "type", "subject"],
    },
  },
};
