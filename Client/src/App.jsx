import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import TaskDetails from "./pages/TaskDetails"
import Tasks from "./pages/Tasks"
import Trash from "./pages/Trash"
import Users from "./pages/Users"
import { Toaster } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { setOpenSidebar } from "./redux/slices/authSlice"
import { IoClose } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"



function Layout() {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation()

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        {/**Sidebar */}
        <Sidebar />
      </div>

      {/**here  Mobile  Sidebar component*/}
      <MobileSidebar />


      <div className="flex-1 overflow-y-auto">
        {/**Navbar */}
        <Navbar />

        <div className="p-4  2xl:px-10">
          <Outlet /> {/**here inside outlet ,all other components works except sidebars and navbars */}
        </div>
      </div>


    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />  //The state prop is used to pass additional state information to the destination route(here login page).
    //location typically refers to the current location object,This is useful for keeping track of where the user was before being redirected.
    //The replace prop, when set to true, changes the navigation behavior. This means the user won't be able to navigate back to the previous page using the back button after being redirected to /log-in.
  )

};



const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };



  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="md:hidden w-full h-full bg-black/40 transition-all duration-700 transform"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{x: "100%"}}
              transition={{
                type: "tween",
                duration: 0.5,
              }}
              className="bg-white w-3/4 h-full"
            >
              <div className="w-full flex justify-end px-3 mt-5">
                <button onClick={closeSidebar} className="flex justify-end items-end">
                  <IoClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};




function App() {

  return (
    <main className='w-full sm:w-full  min-h-screen bg-primary'>

      <Routes>

          <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          </Route>

          <Route path="/log-in" element={<Login />} />


      </Routes>

      <Toaster richColors />

    </main>
  )
}

export default App
