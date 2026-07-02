import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState , useEffect } from 'react'
import { COMPANY_API_ENDPOINT } from '../../utils/constant'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetSingleCompany from '../../hooks/useGetSingleCompany'

const CompanySetup = () => {
     const params = useParams();
     const id = params.id;
     const { singleCompany } = useSelector((store) => store.company);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     
     useGetSingleCompany(id);
     

     const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
     });

     const [loading, setLoading] = useState(false);
     

     const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
     }

     const fileChangeEventHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file: file });
     }

     const OnSubmitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if(input.file){
            formData.append("file", input.file);
        }

        try {
            const res = await axios.patch(`${COMPANY_API_ENDPOINT}/updateCompany/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
             });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/companies");
            }

        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Failed to update company information";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
     }

     useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.logo || null,
        });
     }, [id,dispatch, singleCompany]);

    return (
        <div>
            {/* Global Navigation */}
            <Navbar />

            <div className='max-w-xl mx-auto my-10 px-4'>
                <form onSubmit={OnSubmitHandler}>
                    {/* Header with Back Button */}
                    <div className='flex items-center gap-5 p-8'>
                        <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft className="w-4 h-4" />
                            <span onClick={() => window.history.back()}>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>

                    {/* Input Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input
                                name="name"
                                type="text"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Microsoft, Accenture, etc."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Input
                                name="description"
                                type="text"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Tell us about the company"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input
                                name="website"
                                type="text"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://www.example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                name="location"
                                type="text"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Pune, Bangalore, etc."
                            />
                        </div>
                        <div className="space-y-2 col-span-full">
                            <Label>Logo</Label>
                            <Input
                                name="file"
                                type="file"
                                onChange={fileChangeEventHandler}
                                accept="image/*"
                            />
                        </div>
                    </div>

                    {/* Submission Button */}
                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            Updating...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-[#7209b7] hover:bg-[#5f32ad] text-white">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup