import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '../../utils/constant'
import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostJob = () => {
    const { companies } = useSelector((store) => store.company); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experiencelevel: "",
        position:"",
        companyId: ""
    });

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    };

    const changeCompanyHandler = (value) => {
        setInput({...input, companyId: value});
    };

    const postJobHandler=async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log("Error posting job", error);
            toast.error(error.response?.data?.message || "Failed to post job");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={postJobHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="experiencelevel"
                                value={input.experiencelevel}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type="number"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={changeCompanyHandler} name="companyId">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => (
                                                    <SelectItem
                                                        key={company._id}
                                                        value={company._id}
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))

                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div> 
                    {
                        loading ? (
                            <Button className="w-full my-4"> 
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Please wait 
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Post New Job
                            </Button>
                        )
                    }
                    {
                        companies.length === 0 && (
                            <p className='text-xs text-red-600 font-bold text-center my-3'>
                                *Please register a company first, before posting a jobs
                            </p>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob