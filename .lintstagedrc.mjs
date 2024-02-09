export default {
  "{src,test}/**/*.(t|j)s": [
    "eslint --ext .ts,.js --fix",
    "prettier --print-width 120 --arrow-parens avoid --write",
  ],
};
