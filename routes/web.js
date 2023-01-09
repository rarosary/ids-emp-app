import express from 'express';
const router = express.Router();
import EmployeeController from '../controllers/employeeController.js';
import UserController from '../controllers/userController.js';
import checkUserAuth from "../config/auth.js";
import EmployeeModel from '../models/Employee.js';
import multer from 'multer';
import XLSX from 'xlsx'

//protected routes
router.use('/employee', checkUserAuth)
router.use('/employee/', checkUserAuth)
router.use('/employee/gender/', checkUserAuth)
router.use('/employee/department', checkUserAuth)
router.use('/employee/designation', checkUserAuth)

router.post('/user/login', UserController.userLogin)
router.post('/user/signup', UserController.registerUser)


router.get('/employee', EmployeeController.getAllEmployees)
router.post('/employee', EmployeeController.createDoc)
router.get('/employee/:id', EmployeeController.getSingleDocById)
router.get('/employee/department/:department', EmployeeController.getEmployeeByDepartment)
router.get('/designation/:designation', EmployeeController.getEmployeeByDesignation)
router.get('/employee/gender/:gender', EmployeeController.getEmployeeByGender)

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,res,cb)=>{
            cb(null,"uploads")
        },
        filename:(req,res,cb)=>{
            cb(null,"employees.xlsx")
        }
    })

}).single("employees")

//post Employee -> 
router.post('/upload',checkUserAuth,upload,async (req,res)=>{
    console.log("file uploaded")
    try {
        var workbook = XLSX.readFile('./uploads/employees.xlsx');
        //console.log(workbook.data)
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        console.log(xlData)
        const dbResponse = await EmployeeModel.insertMany(xlData)
        res.status(201).json({result:true,data:dbResponse , message:"data added successfully .!!"})
    
    } catch (error) {

    return res.status(400).json({result:false,message:"error -message ", error })
    }
})


export default router 