import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const Loader = () => {
    return (
        <CircularProgress
            sx={{
                width:'100px',
                height:'100px',
                margin:'auto',
                display:'block',
            }}
        >
            <span className='sr-only'>Loading...</span>

       </CircularProgress>
    )
}

export default Loader
