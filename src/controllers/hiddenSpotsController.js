const cloudinary = require("cloudinary");
const HiddenSpot = require("../models/hiddenSpot");

//Controllador para obtener un hidden spot
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

//Controllador para obtener todos los hidden spot
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

//Controllador para crear un hidden spot
exports.postCreateHiddenSpot = (req, res) => {
  console.log("BODY", req.body);
  const name = req.body.name;
  const description = req.body.description;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const location = { type: "Point", coordinates: [lng, lat] };
  const tourismcategoryId = req.body.tourismcategoryId;
  const phisicalconditiontypeId = req.body.phisicalconditiontypeId;
  const imageUrl = req.body.imageUrl || null;
  const userId = req.body.userId;

  if (imageUrl === null) {
    HiddenSpot.create({
      name,
      description,
      location,
      imageUrl,
      tourismcategoryId,
      phisicalconditiontypeId,
      userId,
    })
      .then(() => {
        return res.status(201).json({ result: "Created!" });
      })
      .catch((err) => {
        console.log("CATCH ", err);
        return res.status(400).json({ result: "Something went wrong!" });
      });
  }

  imageUrl &&
    cloudinary.v2.uploader.upload(
      imageUrl,
      { public_id: name },
      function (error, result) {
        if (error) {
          console.log("ERROR ", error);
          return res.status(400).json({ result: "Something went wrong!" });
        }
        HiddenSpot.create({
          name,
          description,
          location,
          imageUrl: result.url,
          tourismcategoryId,
          phisicalconditiontypeId,
          userId,
        })
          .then(() => {
            return res.status(201).json({ result: "Created!" });
          })
          .catch((err) => {
            console.log("CATCH ", err);
            return res.status(400).json({ result: "Something went wrong!" });
          });
      }
    );
};

//Controllador para actualizar un hidden spot
exports.updateHiddenSpot = async (req, res) => {
  try {
    const hiddenSpotId = req.params.id;
    const newInfo = req.body;
    let spotToUpdate = await HiddenSpot.findByPk(hiddenSpotId);

    if (!spotToUpdate) {
      return res.status(404).json({ result: "Something went wrong" });
    }

    if (
      newInfo.imageUrl !== null &&
      spotToUpdate.imageUrl !== newInfo.imageUrl
    ) {
      cloudinary.v2.uploader.upload(
        newInfo.imageUrl,
        { public_id: newInfo.name },
        async function (error, result) {
          if (error) {
            console.log("ERROR ", error);
            return res.status(400).json({ result: "Something went wrong!" });
          }
          await spotToUpdate.update({ ...newInfo, imageUrl: result.url });
          await spotToUpdate.save();
          return res.status(200).json({ result: "Updated!" });
        }
      );
    } else {
      await spotToUpdate.update(newInfo);
      await spotToUpdate.save();
      return res.status(200).json({ result: "Spot updated successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ result: "Something went wrong" });
  }
};

//Controllador para eliminar un hidden spot
exports.postDeleteHiddenSpot = async (req, res) => {
  const id = req.params.id;
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
