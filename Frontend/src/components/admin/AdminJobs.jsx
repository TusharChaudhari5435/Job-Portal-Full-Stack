import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '../../redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const AdminJobs = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useGetAllAdminJobs();

  useEffect(() => {
    dispatch(setSearchJobByText(searchText));
  }, [searchText, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button onClick={() => { navigate('/admin/jobs/create') }}>New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs;