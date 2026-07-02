import  Job from "../models/job.model.js";
import { Application } from "../models/applications.model.js";

const applyJob = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const userId = req.id;

        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false
            });
        }

        const alreadyApplied = await Application.findOne({job:jobId,applicant:userId});
        if(alreadyApplied){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            });
        }

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            });
        }

        const application = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(application._id);
        await job.save();

        res.status(200).json({
            message:"Applied for job successfully",
            application,
            success:true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
}

const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id;
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });

        if(!applications || applications.length === 0){
            return res.status(400).json({
                message:"No applications found",
                success:false
            });
        }

        res.status(200).json({
            applications,
            success:true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
            success:false
        }); 
    }
}

const getApplicants = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        });
        
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            });
        }

        return res.status(200).json({
            job,
            success:true,
            message:"Applicants Fetched Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
}

const updateStatus = async(req,res)=>{
    try {
        const {status}= req.body;
        const applictionId=req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }

        const application = await Application.findById({_id:applictionId});
        if(!application){
            return res.status(400).json({
                message:"Application not found",
                success:false
            });
        }
        application.status = status.toLowerCase();
        await application.save();
        res.status(200).json({
            message:"Application status updated successfully",
            application,
            success:true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
}

export {applyJob,getAppliedJobs,getApplicants,updateStatus};