const checkRecordsExist = async (ids, model) => {
  try {
    const records = await model.find({ _id: { $in: ids } });
    const fetchedIds = records.map((record) => record._id.toString());
    if (fetchedIds.length === ids.length) {
      return { allExist: true, missingIds: [] };
    } else {
      const missingIds = ids.filter(
        (id) => !fetchedIds.includes(id.toString())
      );
      return { allExist: false, missingIds };
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch records: ${err.message}`);
  }
};

export { checkRecordsExist };
