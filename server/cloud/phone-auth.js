const debugCode = {
  '18768197608': '1234'
};

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData, options) {
  const {phone, code} = authData;
  return debugCode[phone] != null && String(code) === debugCode[phone] ? Promise.resolve() : Promise.reject();
}

// Returns a promise that fulfills iff this app id is valid.
function validateAppId(appIds, authData, options) {
  return Promise.resolve();
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData,
};
