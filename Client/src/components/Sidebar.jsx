import React from 'react'
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
  } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';
import { motion } from 'framer-motion';


const linkData = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Tasks",
      link: "tasks",
      icon: <FaTasks />,
    },
    {
      label: "Completed",
      link: "completed/completed",
      icon: <MdTaskAlt />,
    },
    {
      label: "In Progress",
      link: "in-progress/in progress",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "To Do",
      link: "todo/todo",
      icon: <LuListTodo />,
    },
    {
      label: "Team",
      link: "team",
      icon: <FaUsers />,
    },
    {
      label: "Trash",
      link: "trashed",
      icon: <FaTrashAlt />,
    },
  ];



const Sidebar = () => {

    const {user}=useSelector((state)=> state.auth)

    const dispatch=useDispatch()
     const location=useLocation()
     const path=location.pathname.split("/")[1];  //it splits starts with fisrt"/" in routes .it array likes ["",jbsb,shds]as [0,1,2] 0 is a empty string
    

     const sidebarlinks= user?.isAdmin ? linkData : linkData.slice(0,7)

     const closeSidebar=()=>{
        dispatch(setOpenSidebar(false))
     }

     const NavLink=({elements})=>{
        return(
          <Link to={elements.link}
          
           onClick={closeSidebar}
           className={clsx(
            "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d] hover:text-[#2564ed]",
            path === elements.link.split("/")[0] || path === elements.link.split("/")[1] ? "bg-blue-600 text-slate-50" : ""
           )}  //routes path arrays first element not 0th === links with 0th element or 1st element .
          >
            {elements.icon}
            <span className='hover:text-[#2564ed]'>{elements.label}</span>
          </Link>
        )
     };



  return (
    <div className='w-full h-full flex flex-col gap-6 p-5 '>
         <h1 className='flex gap-1 items-center'>
           <motion.p className='bg-blue-600 p-2 rounded-full'
            initial={{opacity:0, y: -100}}
            animate={{opacity:1, y:0}}
            transition={{ type: "spring",damping:10, stiffness:260, delay: 0.2}}
           >
              <MdOutlineAddTask className='text-white text-2xl font-black'/>
           </motion.p>
           <motion.span className='text-2xl font-bold text-black'
            initial={{opacity:0,x: 100}}
            animate={{opacity:1 ,x: 0  }}
            transition={{
              type:"tween",
              ease: "linear",
              delay: 0.4
              
            }}
           >TaskMe</motion.span>
         </h1>

         <motion.div className='flex-1 flex flex-col gap-y-5 py-8'
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ 
            type:"tween",
            duration: 0.5 }}
         >
             {
                sidebarlinks.map((link)=>(
                    <NavLink elements={link} key={link.label}/>
                ))
             }
         </motion.div>

        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ 
            type:"tween",
            duration: 0.5 }}
        >
            <button className='flex gap-2 w-full p-2  items-center text-lg text-gray-800'>
                <MdSettings/>
                <span>Settings</span>
            </button>
        </motion.div>

    </div>
  )
}

export default Sidebar