const admin = require("firebase-admin");

var serviceAccount = require("../firebaselogin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  admin
    .auth()
    .verifyIdToken(token)
    .then(user => {
      const uid = user.uid;
      req.userId = uid;
      req.idToken = token;
      next();
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    });
};

module.exports = auth;
