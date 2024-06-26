const upload=require("../middlewares/multer")
const express=require("express")
const router=express.Router()
const tryCatch = require("../middlewares/tryCatch")
const exam=require("../controller/examController.js")

router.post("/addexam/:teacherId",upload.array("images",5),tryCatch(exam.addExam))
router.get("/getexam/:studentId",tryCatch(exam.examToStudent))
//route for get all exam created by a particulair teacher
router.get("/getallexams/:teacherId",tryCatch(exam.getAllExamsCreatedByTeacher))


module.exports=router
