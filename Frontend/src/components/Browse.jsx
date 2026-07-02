import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const {allJobs, searchQuery} = useSelector((store) => store.job);

    const filteredJobs = allJobs.filter((job) => {
        if (!searchQuery) {
            return true;
        }
        const query = searchQuery.toLowerCase();
        return (
            job?.title?.toLowerCase().includes(query) ||
            job?.jobType?.toLowerCase().includes(query) ||
            job?.description?.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({filteredJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse