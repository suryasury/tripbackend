exports.signUp = async (req, res, db) => {
  try {
    let userData = req.body;

    let admin = db.collection("admin");

    let isExistingUser = await admin.count({ email: userData.email });

    if (!isExistingUser) {
      let result = await admin
        .insertOne({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          mobileNumber: userData.phoneNumber,
        })
        .toObject();
      res.status(200).send({
        status: "OK",
        message: "Admin created successfully",
        data: result,
      });
    } else {
      res.status(409).send({
        status: "ERROR",
        message: "Admin already exists",
        data: {},
      });
    }
  } catch (err) {
    console.log(err);
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

    let admin = db.collection("admin");

    let adminDetails = await admin.findOne({ email: loginData.email });

    if (adminDetails) {
      if (adminDetails.password === loginData.password) {
        res.status(200).send({
          status: "OK",
          message: "Admin login successful",
          data: adminDetails,
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
    console.log(err);
    res.status(500).send({
      status: "ERROR",
      message: "something went wrong. please try again",
      data: err,
    });
  }
};

exports.createTripPlans = async (req, res, db) => {
  try {
    let tripData = req.body;

    let trip = db.collection("trips");

    let tripDetails = await trip.insertOne({
      place: tripData.place,
      description: tripData.description,
      image: tripData.image,
      month: tripData.month,
      budget: tripData.budget,      
    });

    res.status(200).send({
      status: "OK",
      message: "Trip created successful",
      data: tripDetails.ops,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "ERROR",
      message: "something went wrong. please try again",
      data: err,
    });
  }
};

exports.getTripsAdmin = async (req, res, db) => {
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
