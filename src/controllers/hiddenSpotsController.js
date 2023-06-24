const HiddenSpot = require("../models/hiddenSpot");

exports.getHiddenSpot = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  HiddenSpot.findByPk(id)
    .then((hiddenSpot) => {
      if (hiddenSpot) {
        return res.status(200).json(hiddenSpot);
      } else {
        return res.status(200).json({ result: "There is no hidden spot" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ result: "Something went wrong" });
    });
};

exports.getHiddenSpots = (req, res) => {
  HiddenSpot.findAll()
    .then((hiddenSpots) => {
      if (hiddenSpots.length > 0) {
        return res.status(200).json(hiddenSpots);
      } else {
        return res.status(200).json({ result: "There is no hidden spot :c" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ result: "Something went wrong" });
    });
};
exports.postCreateHiddenSpot = (req, res) => {
  console.log("BODY", req.body);
  const name = req.body.name;
  const description = req.body.description;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const location = { type: "Point", coordinates: [lng, lat] };
  const tourismcategoryId = req.body.tourismcategoryId;
  const phisicalconditiontypeId = req.body.phisicalconditiontypeId;

  HiddenSpot.create({
    name,
    description,
    location,
    tourismcategoryId,
    phisicalconditiontypeId,
  })
    .then(() => {
      res.status(201).json({ result: "Created!" });
    })
    .catch((err) => {
      res.status(400).json({ result: "Something went wrong!" });
    });
};

exports.postDeleteHiddenSpot = async (req, res) => {
  const id = req.body.id;
  await HiddenSpot.findByPk(id)
    .then((hiddenSpot) => {
      hiddenSpot.destroy();
    })
    .then((result) => {
      return res.status(200).json({ result: "Deleted" });
    })
    .catch(() => {
      return res.status(400).json({ result: "Something went wrong!! " });
    });
};
