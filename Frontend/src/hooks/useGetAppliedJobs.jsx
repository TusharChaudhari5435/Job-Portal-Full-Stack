import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/getappliedjobs`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                dispatch(setAllAppliedJobs([]));
                console.error("Error fetching applied jobs:", error);
            }
        };
        fetchAppliedJobs();

    }, [dispatch]);
}

export default useGetAppliedJobs;