import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';
import { useSelector } from 'react-redux';

const Applicants = () => {
    const params= useParams();
    const id = params.id;
    const dispatch = useDispatch();
    const {applicants} = useSelector((store) => store.application);

    useEffect(() => {
        const fetchApplicants = async() => {        
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/getapplicants/${id}`, {
                withCredentials: true,
            });
                dispatch(setAllApplicants(res.data.job));
        } catch (error) {
            console.error('Error fetching applicants:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch applicants');
        }
      }

       fetchApplicants();
    }, [id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4'>
                <h1 className='font-bold text-xl my-5'>
                    Applicants ({applicants?.applications?.length || 0})
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants