import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useState , useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useGetAllCompanies();

    useEffect(() => {
         dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);
       
    return (
        <div>
            <Navbar />

            <div className='max-w-6xl mx-auto my-10 px-4'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/create')}>New Company</Button>
                </div>

                <div className="mt-5">
                    <CompaniesTable />
                </div>

            </div>
        </div>
    )
}

export default Companies