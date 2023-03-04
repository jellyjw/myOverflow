import React, { useRef, useState } from 'react';
import Buttons from '../Post/Buttons';
export default function Modal({children,onClose}) {
    return (
            <div
             className='bg-slate-400 w-[40rem] rounded-2xl h-[50rem] relative'
             >
                <button
                 className='text-4xl absolute right-2 top-2'
                 variant='text'
                 size='large'
                 onClick={()=>{onClose(prev=>!prev)}}
                 >
                  X
                </button>
                <div>{children}</div>
            </div>
    );
}

