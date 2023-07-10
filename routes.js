const userController = require("./controller/user.controller");
const adminController = require("./controller/admin.controller");
module.exports = (app, db) => {
  var userRouter = require("express").Router();
  var adminRouter = require("express").Router();

  userRouter.post("/sign-up", (req, res) =>
    userController.signUp(req, res, db)
  );

  userRouter.post("/login", (req, res) => userController.logIn(req, res, db));
  userRouter.get("/get-trips", (req, res) =>
    userController.getTripsUser(req, res, db)
  );

  adminRouter.post("/sign-up", (req, res) =>
    adminController.signUp(req, res, db)
  );

  adminRouter.post("/login", (req, res) => adminController.logIn(req, res, db));
  adminRouter.post("/create-trip", (req, res) =>
    adminController.createTripPlans(req, res, db)
  );

  adminRouter.get("/get-trips", (req, res) =>
    adminController.getTripsAdmin(req, res, db)
  );

  app.use("/api/user", userRouter);
  app.use("/api/admin", adminRouter);
};
