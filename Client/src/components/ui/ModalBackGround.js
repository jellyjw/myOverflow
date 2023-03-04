import React from 'react';
export default function ModalBackGround({onClose,children,userRef}) {
    return (
        <div 
        className='fixed bg-opacity-80 top-0 left-0 z-10  
        flex justify-center items-center bg-slate-600 w-[100%] h-[100vh]'
        onClick={onClose}
        ref={userRef}
        >
          {children}
        </div>
    );
}

