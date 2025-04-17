import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Pastes from './components/Pastes';
import Veiw_paste from './components/Veiw_paste';
import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';


const router=createBrowserRouter(
  [
    {
      path:'/',
      element: <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:'/pastes',
      element: <div>
        <Navbar />
        <Pastes />
      </div>
    },
    {
      path:'/pastes/:id',
      element: <div>
        <Navbar />
        <Veiw_paste />
      </div>
    },
  ]
);
function App() {
  const [count, setCount] = useState(0)


  return (
    <>

      <RouterProvider router={router}/>
    </>
  )
}

export default App
