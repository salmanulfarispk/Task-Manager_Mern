import React from 'react'
import clsx from "clsx"

 const  Textbox = React.forwardRef(({
     type,
     placeholder,
     label,
     className,
     register,
     error,
     name
},ref) => {
  return (
    <div className='w-full flex flex-col gap-1'>
        {label &&
            <label htmlFor={name} className='text-slate-800 py-1'>{label}</label> }

       <div>
        <input type={type}
         name={name}
          placeholder={placeholder}
          ref={ref}
          {...register}
          className={clsx(
            "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
            ,className)}
          aria-invalid={error ? "true" : "false"}  //if true,it tells users that the input value does not meet the required validation criteria.like form validation
        />
       </div>
       {error && (
        <span className='text-xs text-[#f64949fe] mt-0.5 '>
            {error}
        </span>
       )}
    

    </div>
  )
});

export default Textbox;