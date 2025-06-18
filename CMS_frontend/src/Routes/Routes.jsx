import { createBrowserRouter } from "react-router";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Dashboard from "../Layout/Dashboard";
import Messages from "../Pages/Dashboard/Messages/Messages";
import ConferenceList from "../Pages/Dashboard/ConferenceList/ConferenceList";
import SingleConference from "../Pages/Dashboard/SingleConference/SingleConference";
import Certificates from "../Pages/Dashboard/Certificates/Certificates";
import MyPaper from "../Pages/Dashboard/MyPaper/MyPaper";
import Abstracts from "../Pages/Dashboard/Abstracts/Abstracts";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import MyInvoice from "../Pages/Dashboard/MyInvoice/MyInvoice";
import Profile from "../Pages/MyProfile/Profile";
import AddAbstract from "../Pages/Dashboard/Abstracts/AddAbstract/AddAbstract";
import AdminConference from "../Pages/Dashboard/AdminConference/AdminConference";
import CreateConference from "../Pages/Dashboard/CreateConference/CreateConference";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<h1>Home</h1>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Registration/>
            }
        ]
    },
    {
        path:'admin',
        element:<Dashboard/>,
        children:[
            {
                path:'home',
                element:<DashboardHome/>
            },
            {   
                path:'abstract/',
                element:<Abstracts/>
            },
            {
                path:'abstract/add',
                element:<AddAbstract/>
            },
            {
                path:'my-paper',
                element:<MyPaper/>
            },
            {
                path:'invoice',
                element:<MyInvoice/>
            },
            {
                path:'conference-list',
                element:<ConferenceList/>
            },
            {
                path:'conference/:id',
                element:<SingleConference/>
            },
            {
                path:'certificates',
                element:<Certificates/>
            },
            {
                path:'messages',
                element:<Messages/>
            },
            {
                path:'profile',
                element:<Profile/>
            },
            {
                path:'conference',
                element:<AdminConference/>
            },
            {
                path:'create-conference',
                element:<CreateConference/>
            }
        ]
    }
])