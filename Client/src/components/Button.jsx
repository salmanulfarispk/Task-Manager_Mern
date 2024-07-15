import clsx from 'clsx'
import React from 'react'

const Button = ({icon,className,type,label, onClick =()=> {}}) => {
  return (
    <button type={type || 'button'}
     className={clsx("px-3 py-2 outline-none",className)}
    >
      <span>{label}</span>
    {icon && icon}
    </button>
  )
}

export default Button