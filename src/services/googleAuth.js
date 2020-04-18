const { GoogleAuth } = require("google-auth-library");

const getAuth = () => {
  const auth = new GoogleAuth({
    scopes: [
      "https://www.googleapis.com/auth/documents.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });

  return auth;
};

module.exports = {
  getAuth,
};
