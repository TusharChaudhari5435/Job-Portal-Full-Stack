import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { USER_API_ENDPOINT } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from "@/redux/authSlice"
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'

const Signup = () => {
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    // UI-only state placeholder
      const [input, setInput] = useState({
        fullname: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "",
        file:""
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const changeFileHandler = (e) => {
        setInput({...input, file: e.target.files?.[0]});
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        // Placeholder for form submission logic
        const formData = new FormData();
        formData.append("fullName", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if(input.file){
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        });

        if(res.data.success){
            toast.success(res.data.message);
            navigate("/login");
        }
        console.log(res.data);
        } catch (error) {
           console.error(error); 
           toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
            dispatch(setLoading(false));
        }
    }

     useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            name="fullname"
                            type="text"
                            placeholder="Tushar Chaudhari"
                            value={input.fullname}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="chaudhari.tushar@gmail.com"
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            name="phoneNumber"
                            type="text"
                            placeholder="8080808080"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="********"
                            value={input.password}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>
                        
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                name="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Signup</Button>
                    )}
                    <span className='text-sm'>
                        Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup