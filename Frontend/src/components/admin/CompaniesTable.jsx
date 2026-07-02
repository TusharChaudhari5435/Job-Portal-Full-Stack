import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies } = useSelector((store) => store.company);
    const { searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompanies, setFilterCompanies] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
       const filteredCompany = companies.length >= 0 && companies.filter((company) =>{
        if(!searchCompanyByText){
            return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
       })

        setFilterCompanies(filteredCompany);
    }, [searchCompanyByText, companies]);
    
    
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompanies?.length > 0 ? (
                            filterCompanies?.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span onClick={() => navigate(`/admin/companies/${company._id}`)}>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">
                                    You haven't registered any company yet.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
