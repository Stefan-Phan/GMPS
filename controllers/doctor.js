const getAllDoctors = async (req, res) => {
  res.status(400).send("All doctors");
};

const getDoctor = async (req, res) => {
  res.status(400).send("doctor");
};

const createDoctor = async (req, res) => {
  res.status(400).send("Create doctor");
};

const updateDoctor = async (req, res) => {
  res.status(400).send("Update doctor");
};

const deleteDoctor = async (req, res) => {
  res.status(400).send("Delete doctor");
};

module.exports = {
  getAllDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
