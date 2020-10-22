const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
let upload = require('../config/multer.config.js');
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup

  );



  app.post('/api/auth/upload', upload.single("file"), controller.uploadFile);
  app.get('/api/auth/all', controller.listAllFiles);
  app.get('/api/auth/:id', controller.downloadFile);
  app.post("/api/auth/signin", controller.signin);
};
