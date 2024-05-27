import React from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// Import the layouts
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'

// Import the components
import IndexPage from './pages/Index'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
import DashboardPage from './pages/Dashboard'

// This is alternate method
// const router = createBrowserRouter([
//   {
//     element: <RootLayout />,
//     children: [
//       { path: "/", element: <IndexPage /> },
//       { path: "/sign-in/*", element: <SignInPage /> },
//       { path: "/sign-up/*", element: <SignUpPage /> },
//       {
//         element: <DashboardLayout />,
//         path: "dashboard",
//         children: [
//           { path: "/dashboard", element: <DashboardPage /> }
//         ]
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<IndexPage />} />
      <Route path='/sign-in/*' element={<SignInPage />} />
      <Route path='/sign-up/*' element={<SignUpPage />} />
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<DashboardPage />}/>
      </Route>
    </Route>
  )
)

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App