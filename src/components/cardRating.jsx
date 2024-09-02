import { Rating, Typography } from '@material-tailwind/react';
import React from 'react';

export const CardRating = ({rating}) => {

    const borderColor = rating.color;

    return (
        <div className="bg-gray-100 w-full border-t-[15px]" style={{ borderTopColor: borderColor }}>
            <div className='flex justify-center items-center px-20 py-14'>
                <Typography 
                    color="gray" 
                    size="sm" 
                    className="font-popins text-center break-words break-all overflow-hidden"
                >
                    "{rating.feedback}""
                </Typography>            
            </div>
            <div className='border-t rounded-sm pb-14 pt-8 flex flex-col justify-center items-center gap-7'>
                <Typography color='gray' size='sm' className='font-popins text-center'> {rating.name} </Typography>
                <Rating value={rating.rating} readonly />
            </div>
        </div>
    );
};
