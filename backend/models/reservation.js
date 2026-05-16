import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [3, "First name must be at least 3 characters"],
    maxLength: [30, "First name cannot exceed 30 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [3, "Last name must be at least 3 characters"],
    maxLength: [30, "Last name cannot exceed 30 characters"],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email"],
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minLength: [10, "Phone number must contain at least 10 digits"],
    maxLength: [11, "Phone number must contain at most 11 digits"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);