import React from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai'
import Buttons from '../Post/Buttons';
export default function Page({pagenation,onPagenation}) {
    const {page,totalElements,totalPages} = pagenation
    const handleLeftPage = () => {
        if(page === 1) return ;
        onPagenation({...pagenation,page:page-1})
    }
    const handleRightPage = () => {
        if(page === totalPages) return ;
        onPagenation({...pagenation,page:page+1})
    }
    return (
        <div className='flex justify-between w-full mt-5 basis-1/12'>
           <Buttons
            text={<AiOutlineArrowLeft
                className='text-3xl'/>}
            onClick={handleLeftPage}
                />
            <div>
           <ul className='flex gap-3'>
                {Array(totalPages).fill().map((page,idx)=>
                    <li
                    key={idx}
                    className='list-none'
                    onClick={()=>onPagenation({...pagenation,page:idx+1})}
                    >
                        <Buttons text={idx+1}>
                        </Buttons>
                    </li>)}
           </ul>
            </div> 
           <Buttons
            text={<AiOutlineArrowRight
                className='text-3xl'/>}
            onClick={handleRightPage}    
                />
         </div>  
    );
}

