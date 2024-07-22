import { createBrowserRouter }  from "react-router-dom";
import { Layout }               from "../pages/layout/Layout";
import { DashboardPage }        from "../pages/dashboard/dashboardPage";
import { CreateEventForm }      from "../pages/create-event/CreateEventForm";
import { EventReportPage }      from "../pages/events-reports/EventReportPage";



const router  = createBrowserRouter([
  { path: '/',
    element: <Layout/>,
    children: [
      { path: '/dashboard',       element: <DashboardPage/>   },
      { path: '/form-banner',     element: <CreateEventForm/> },
      { path: '/events-report',   element: <EventReportPage/> },
      { path: '/form-banner/:id', element: <CreateEventForm/> },
    ]
  },
])

export default router