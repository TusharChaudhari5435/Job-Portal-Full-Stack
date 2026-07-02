import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";``
import { COMPANY_API_ENDPOINT } from "../utils/constant";

const useGetSingleCompany = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/getCompany/${id}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error("Error fetching company:", error);
            }
        };
        fetchSingleCompany();

    }, [id, dispatch]);
}

export default useGetSingleCompany;