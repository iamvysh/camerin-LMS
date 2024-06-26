const leaveReportModel=require("../model/leaveReportModel")
const studentModel=require("../model/studentModel")
const teacherModel=require("../model/teacherModel")

const addLeaveReport=async(req,res)=>{
    const id=req.params.id
    
    const student=await studentModel.findById(id)

    const leaveReport=new leaveReportModel({
        Date:req.body.Date,
        description:req.body.description,
        studentId:id,
        course:student.course,
        
    })
    await leaveReport.save()

    return res.status(201).json({
        message:"leavereport created successfull"
    })

}


const getLeaveReportofSpecificCourse=async(req,res)=>{
    const id=req.params.id

    const teacher=await teacherModel.findById(id)
    const leaveReports=await leaveReportModel.find({course:teacher.course,isApproved:false}).populate("studentId")
      
    return res.status(200).json({
        message:"success",data:leaveReports
    })

}

const ApproveLeaveRequests=async(req,res)=>{
    const id=req.params.id

    // Find the leave report by ID
    const leaveReport = await leaveReportModel.findById(id);

    // If leave report not found
    if (!leaveReport) {
        return res.status(404).json({ message: "Leave report not found" });
    }

    // Update isApproved field to true
    leaveReport.isApproved = true;

    // Save the updated leave report
    await leaveReport.save();

    // Send response
    res.status(200).json({ message: "Leave request approved successfully", leaveReport });
}

const deleteLeaveReport=async(req,res)=>{
    const id=req.params.id
    const leaveReport=await leaveReportModel.findByIdAndDelete(id)

    return res.status(200).json({
        message:"leave report deleted successfully"

    })
}


const getLeaveReoprtStatusToStudent=async(req,res)=>{
    const id=req.params.id

    const leaveReport=await leaveReportModel.find({studentId:id})

    return  res.status(200).json({
        message:"success",
        data:leaveReport
    })
}

module.exports={
    addLeaveReport,getLeaveReportofSpecificCourse,deleteLeaveReport,ApproveLeaveRequests,getLeaveReoprtStatusToStudent
}