const { v4: uuidv4 } = require('uuid');
const URL = require("../models/url");
const users=require("../models/user");

const shortID = require('short-id-gen')

async function handleGenerateNewShortURL(req, res) {
  console.log(shortID.generate(8))
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  // model.id = nanoid(8); 
  // const shortID = nanoid(8);
  // console.log(shortID);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    // createdBy: req.users._id,
  });




  




  return res.json({shortID});
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}







module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};













