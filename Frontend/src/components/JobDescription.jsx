import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id; 
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { SingleJob } = useSelector((store) => store.job);
  const isInitiallyApplied = SingleJob?.applications?.some(application => application.applicant === user?._id) || false; 
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications?.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        
        console.error("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [jobId, dispatch, user?._id]);


  const applyJobHandler = async() => {
    try {
      const res = await axios.post(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {}, {
        withCredentials: true,
      });
      if(res.data.success){
        setIsApplied(true);
        const updatedSingleJob = {...SingleJob,
          applications: [...(SingleJob.applications || []), { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">{SingleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {SingleJob?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {SingleJob?.jobType}{" "}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {SingleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 text-lg">
        Job Description
      </h1>

      <div className="my-4">
        <h1 className="font-bold my-1 text-gray-900">
          Role:
          <span className="pl-4 font-normal text-gray-700">
            {SingleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900">
          Location:
          <span className="pl-4 font-normal text-gray-700">
            {SingleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900">
          Description:
          <span className="pl-4 font-normal text-gray-700">
            {SingleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900">
          Experience:
          <span className="pl-4 font-normal text-gray-700">
            {SingleJob?.experiencelevel} Years
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900">
          Salary:
          <span className="pl-4 font-normal text-gray-700">
            {SingleJob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900">
          Total Applicants: 
          <span className="pl-4 font-normal text-gray-700">
            {SingleJob?.applications ? SingleJob.applications.length : 0}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-900">
          Posted Date:
          <span className="pl-4 font-normal text-gray-700">
            {SingleJob?.createdAt
              ? new Date(SingleJob.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Loading date..."}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
