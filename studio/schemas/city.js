export default {
  name: "city",
  type: "document",
  title: "City",
  fields: [
    {
      name: "name",
      type: "string",
      title: "City name"
    },
    {
      name: "county",
      type: "string",
      title: "County",
      description: "Fylke"
    },
    {
      name: "location",
      type: "geopoint"
    }
  ]
};
