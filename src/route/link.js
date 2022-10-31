const {
  createLink,
  getLink,
  updateLink,
  deleteLink,
} = require("../service/linkService");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const linkId = await createLink(req.body);
    res.send({
      success: true,
      data: {
        linkId,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:linkId", async (req, res, next) => {
  try {
    const link = await getLink(req.params.linkId);
    res.send({
      success: true,
      data: link,
    });
  } catch (e) {
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const link = await updateLink(req.body);
    res.send({
      success: true,
      data: link,
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:linkId", async (req, res, next) => {
  try {
    await deleteLink(req.params.linkId);
    res.send({
      success: true,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
