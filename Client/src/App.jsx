import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Toaster from "sonner"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import TaskDetails from "./pages/TaskDetails"
import Tasks from "./pages/Tasks"
import Trash from "./pages/Trash"
import Users from "./pages/Users"




function Layout(){
  const user ="";

  const location = useLocation()

  return  user ? (
      <div className="w-full h-screen flex flex-col md:flex-row">
        <div>
          
        </div>
      </div>
  ):(
    <Navigate to="/log-in" state={{from : location}} replace/>  //The state prop is used to pass additional state information to the destination route(here login page).
                                    //location typically refers to the current location object,This is useful for keeping track of where the user was before being redirected.
                                    //The replace prop, when set to true, changes the navigation behavior. This means the user won't be able to navigate back to the previous page using the back button after being redirected to /log-in.
  )


}









function App() {

  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>

      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />

        </Route>

             <Route path="/log-in" element={<Login />} />


      </Routes>

      <Toaster richColors/>

    </main>
  )
}

export default App
