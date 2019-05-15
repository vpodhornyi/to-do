module.exports = {
  properties: {
    color: { allOf: [{ type: "string" }, { pattern: 'rgb\\((\\d{1,3}), (\\d{1,3}), (\\d{1,3})\\)' }] },
    title: { type: "string" },
    description: { type: "array" }
  }
};