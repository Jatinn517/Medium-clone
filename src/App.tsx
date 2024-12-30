import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blogs from "./pages/Blogs"
import { Blog } from "./pages/Blog"
import { Publish } from "./pages/Publish"
import { AppBar } from "./component/AppBar"

export default function App() {

  return (
    <BrowserRouter>
      <AppBar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/publish' element={<Publish/>}/>
      </Routes>
    </BrowserRouter>
  )
}