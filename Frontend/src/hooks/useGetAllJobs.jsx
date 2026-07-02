import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_ENDPOINT } from "../utils/constant";
import { useSelector } from "react-redux";
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((store) => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchAllJobs();

    }, [dispatch, searchQuery]);
}

export default useGetAllJobs;