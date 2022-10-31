const { findUrl } = require("../service/linkService");

const express = require("express");
const router = express.Router();

router.get("/:linkId", async (req, res) => {
  try {
    const url = await findUrl(req.params.linkId);
    res.status(302).header("location", url).send();
  } catch (e) {
    console.error(e);
    res.status(404).send();
  }
});

module.exports = router;
