import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../redux/jobSlice'

const HeroSection = () => {
    const [query, setQuery] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(setSearchQuery(query));
        navigate('/browse');
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p>Find the best career opportunities tailored for you. Start your journey today!</p>
                
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button className="rounded-r-full bg-[#6A38C2]" onClick={handleSearch}>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection