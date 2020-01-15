export default {
  name: "execution",
  type: "document",
  title: "Dødsstraff",
  fields: [
    {
      name: "prisoner",
      type: "prisoner",
      title: "Den dødsdømte"
    },
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
      type: "geopoint",
      title: "Henrettelsessted"
    },
    {
      name: "date",
      type: "string",
      title: "Dato for henrettelse",
      description: "Format: 23. februar 1736"
    },
    {
      name: "executioner",
      type: "reference",
      to: [{ type: "executioner" }],
      title: "Bøddel eller skarpretter"
    },
    {
      name:"method",
      type: "reference",
      to: [{ type: "method" }],
      title: "Henrettelsesmetode"
    },
    {
      name: "crime",
      type: "string",
      title: "Forbrytelse"
    }
  ]
};
