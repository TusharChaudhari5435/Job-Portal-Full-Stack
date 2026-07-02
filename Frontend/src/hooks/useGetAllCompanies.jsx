import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/companySlice";``
import { COMPANY_API_ENDPOINT } from "../utils/constant";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/getCompanies`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };
        fetchAllCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;
                   