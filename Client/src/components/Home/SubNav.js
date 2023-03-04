import React,{useState} from 'react';
import Stack from './Stack';
export default function SubNav({text,onFilter,filter,onClick,click}) {
    const isAll = text === '전체'
    const [toggle,setToggle] = useState(isAll ? true :false)
const handleClick = () => {
    onFilter(text)
    if(toggle) {
        setToggle(!toggle)
        isAll && onFilter('전체')
        isAll && onClick([]) 
        isAll || onClick(click.filter(stack =>stack !== text))
    }else{
        setToggle(!toggle)
        isAll && onFilter('전체') 
        isAll && onClick([]) 
        isAll ||  onClick([...click,text])
    }
    }
    return (
       <>
        <button 
                className={`border-2 border-gray-600 shadow-sm ${ ((isAll && toggle) || (!isAll && toggle)) && 'bg-slate-500 text-white'} rounded-full p-3 hover:scale-105 duration-300 shrink w-40
                             flex items-center justify-center ${isAll && 'mb-4 h-16'} ${((toggle === false) || (filter !== '전체' && toggle && isAll) || (filter ==='전체' && text !== '전체') || (isAll && click.length ===0)) && 'text-gray-600 bg-white'} `}
                onClick={handleClick}
                >
                {filter &&  <Stack stack={text}/>}
                <span 
                    className='font-semibold'>
                    {text}
                </span>
        </button> 
       </>
    );
}

