import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();


    const registerCompanyHandler = async() => {
       try {
         const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, { companyName : companyName }, 
            { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        if(res?.data?.success){
            toast.success(res?.data?.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`);
        }
       } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
       }
    }

    return (
        <div>
            {/* Global Navigation */}
            <Navbar />

            <div className='max-w-4xl mx-auto px-4'>
                {/* Header Section */}
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>
                        What would you like to give your company name? You can change this later.
                    </p>
                </div>

                {/* Form Field */}
                <div className='space-y-2'>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                        id="company-name"
                        type="text"
                        className="my-2"
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="JobHunt, Microsoft etc."
                    />
                </div>

                {/* Navigation Actions */}
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button  className="bg-[#7209b7] hover:bg-[#5f32ad] text-white" onClick={registerCompanyHandler}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate