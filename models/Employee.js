import mongoose from "mongoose";



// Defining Schema
const employeeSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    gender: { type: String },
    department: { type: String},
    designation: { type: String },
    salary: { type: mongoose.Decimal128},
    status: { type: Boolean }
    })

// Model 
const EmployeeModel = mongoose.model("employee", employeeSchema)

export default EmployeeModel