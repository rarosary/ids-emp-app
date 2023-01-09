import EmployeeModel from '../models/Employee.js'
import xlsx from  'xlsx'

class EmployeeController {
  static createDoc = async (req, res) =>{
    try {
      const {name, email, mobile, gender, department, designation, salary, status}= req.body
      const doc = new EmployeeModel({
        name:name,
        email:email,
        mobile:mobile,
        gender:gender,
        department:department,
        designation:designation,
        salary:salary,
        status:status
      })
      const result = await doc.save()
      res.status(201).send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static getAllEmployees = async (req, res) =>{
    try {
        const result = await EmployeeModel.find()
      console.log(result)
      res.send(result)
      }
      catch (error) {
      console.log(error)
       }
  }

  static getSingleDocById = async (req, res) =>{
    try {
      const result = await EmployeeModel.findById(req.params.id)
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static getEmployeeByField = async (req, res) =>{
    try {
      console.log("testing query string")
  console.log(req.query)
  console.log(req.body)
  //?name=flavio&age=35
  //const fieldcriteria = req.query.field
//req.query.age
      //const {gender} = req.params
    //  const { field, svalue } = req.body
      
    //console.log('params ',field,svalue)
        const result = await EmployeeModel.find().where({field: svalue})
      res.send(result)
    } catch (error) {
      console.log(error)
    }
}

static getEmployeeByGender = async (req, res) =>{
  //const query = {gender: {req.params}}
  try {
    const {gender} = req.params
    console.log(req.params)
     const result = await EmployeeModel.find().where({gender:gender})//.select({ gender: req.params.gender})
     //const result = await EmployeeModel.find(query)
     console.log(result.length)
    res.send(result)
  } catch (error) {
    console.log(error)
  }
}

static getEmployeeByDepartment = async (req, res) =>{
  try {
    const {department} = req.params
   console.log(department)
     const result = await EmployeeModel.find().where({department: department})
    res.send(result)
  } catch (error) {
    console.log(error)
  }
}
static getEmployeeByDesignation = async (req, res) =>{
  try {
    const {designation} = req.params
    //console.log(designation)
     const result = await EmployeeModel.find().where({designation: designation})
    res.send(result)
  } catch (error) {
    console.log(error)
  }
}
  
// workbook.SheetNames.forEach(function (sheetName) {
//   var ws = workbook.Sheets[sheetName];
//   var json = XLSX.utils.sheet_to_json(ws);
//   if (json.length > 0) {
//       values.push(json);
//       res.json({success: true, message: 'Created ' + json.length + ' Users.'})
//   } else {
//       res.json({success: false, message: 'No records found'})
//  
// });

//upload file
// upload = multer({
//   storage:multer.diskStorage({
//       destination:(req,res,cb)=>{
//           cb(null,"uploads")
//       },
//       filename:(req,res,cb)=>{
//           cb(null,"xyz.xlsx")
//       }
//   })

// }).single("emp_file")

// router.post('/upload',Auth.authenticateToken,upload,async (req,res)=>{
//   console.log("file uploaded")
//   try {
//       var workbook = XLSX.readFile('./uploads/xyz.xlsx');
//       var sheet_name_list = workbook.SheetNames;
//       var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
//       console.log(xlData)
//       const dbResponse = await Employee.insertMany(xlData)
//       res.status(201).json({result:true,data:dbResponse , message:"data added successfully .!!"})
  
//   } catch (error) {

//   return res.status(400).json({result:false,message:"error -message ", error })
//   }
// })


  

  
} 
    


export default EmployeeController