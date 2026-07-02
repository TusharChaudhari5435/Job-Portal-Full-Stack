import Job from "../models/job.model.js";
import Company from "../models/company.model.js";

const postJob = async (req,res)=>{
    try {
        const {title,description,requirements,experiencelevel,location,jobType,position,salary,companyId} = req.body;

        if(!title || !description || !requirements || !experiencelevel || !location || !jobType || !position || !salary || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        } 
        const userId = req.id;
        
        if(!userId){
            return res.status(401).json({
                message:"Unauthorized",
                success:false
            });
        }

        // Validate company exists
        const companyExists = await Company.findById(companyId);
        if(!companyExists){
            return res.status(400).json({
                message:"Company not found",
                success:false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            experiencelevel,
            location,
            jobType,
            position,
            salary,
            company:companyExists,
            created_by:userId
        });

        res.status(201).json({
            message:"Job posted successfully",
            job,
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

const getAllJobs = async (req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
            {title: { $regex: keyword, $options: "i" }},
            {description: { $regex: keyword, $options: "i" }},
            ]
        };

        const jobs = await Job.find(query).populate("company").populate("created_by").populate("applications");

        if(!jobs || jobs.length === 0){
            return res.status(400).json({
                message:"No jobs found",
                success:false
            });
        }

        res.status(200).json({
            message:"Jobs fetched successfully",
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
}

const getJobById = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("company").populate("created_by").populate("applications");
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            });
        }
        res.status(200).json({
            message:"Job fetched successfully",
            job,
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

const getAdminJobs = async (req,res)=>{
    try {
        const userId = req.id;
        const jobs = await Job.find({created_by:userId}).populate("company").populate("created_by").populate("applications");

        if(!jobs || jobs.length === 0){
            return res.status(400).json({
                message:"No jobs found",
                success:false
            });
        }
        res.status(200).json({
            message:"Jobs fetched successfully",
            jobs,
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

export {postJob,getAllJobs,getJobById,getAdminJobs};