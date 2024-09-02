const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllBookings = (req, res) => {
  console.log("HEY");
};

const getBooking = (req, res) => {
  console.log("HEY");
};

const createBooking = (req, res) => {
  console.log("HEY");
};

const deleteBooking = (req, res) => {
  console.log("HEY");
};

const updateBookings = (req, res) => {
  console.log("HEY");
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBookings,
};
