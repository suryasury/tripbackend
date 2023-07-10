exports.signUp = async (req, res, db) => {
  try {
    let userData = req.body;

    let users = db.collection("users");

    let isExistingUser = await users.count({ email: userData.email });

    if (!isExistingUser) {
      let result = await users.insertOne({
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
      });
      res.status(200).send({
        status: "OK",
        message: "User created successfully",
        data: result,
      });
    } else {
      res.status(409).send({
        status: "ERROR",
        message: "User already exists",
        data: {},
      });
    }
  } catch (err) {
    res.status(500).send({
      status: "ERROR",
      message: "something went wrong. please try again",
      data: err,
    });
  }
};

exports.logIn = async (req, res, db) => {
  try {
    let loginData = req.body;

    let users = db.collection("users");

    let userDetails = await users.findOne({ email: loginData.email });

    if (userDetails) {
      if (userDetails.password === loginData.password) {
        res.status(200).send({
          status: "OK",
          message: "User login successful",
          data: userDetails,
        });
      } else {
        res.status(409).send({
          status: "ERROR",
          message: "Invalid email or password",
          data: {},
        });
      }
    } else {
      res.status(409).send({
        status: "ERROR",
        message: "Invalid email or password",
        data: {},
      });
    }
  } catch (err) {
    res.status(500).send({
      status: "ERROR",
      message: "something went wrong. please try again",
      data: err,
    });
  }
};

exports.getTripsUser = async (req, res, db) => {
  try {
    let trip = db.collection("trips");

    let tripDetails = await trip.find({}).toArray();

    res.status(200).send({
      status: "OK",
      message: "Trip details fetched successfully.",
      data: tripDetails,
    });
  } catch (err) {
    res.status(500).send({
      status: "ERROR",
      message: "something went wrong. please try again",
      data: err,
    });
  }
};
