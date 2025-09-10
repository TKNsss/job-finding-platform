// default of middleware function path is "/"
const notFound = (req, res) => res.status(404).send("Route does not exist");

export default notFound;