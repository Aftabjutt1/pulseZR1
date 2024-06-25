const validateUpsertCommunity = (req, res, next) => {
  const {
    user_id: userId,
    name,
    description,
    member_ids: memeberIds,
    admin_ids: adminIds,
  } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User Id is required for Community" });
  }
  if (!memeberIds) {
    return res
      .status(400)
      .json({ error: "Atleast 1 member is required for Community" });
  }
  if (!adminIds) {
    return res
      .status(400)
      .json({ error: "Atleast 1 admin is required for Community" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name is required for Community" });
  }
  if (!description) {
    return res
      .status(400)
      .json({ error: "Description is required for Community" });
  }

  next();
};
export { validateUpsertCommunity };