const { google } = require("googleapis");

module.exports = {
  fetchDoc: async (id, auth) => {
    const gDocApi = google.docs({ version: "v1", auth });
    return gDocApi.documents.get({ documentId: id });
  },
};
