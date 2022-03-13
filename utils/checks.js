function checkString(s) {
  if (!s) return false;
  if (s.length != 24)
    return false
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    if ((ch < '0' || ch > '9') &&
      (ch < 'a' || ch > 'f')) {
      return false;
    }
  }
  return true

}

module.exports = { checkString }