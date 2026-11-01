import { Route, Routes } from "react-router-dom";
import ShortenUrlPage from "./containers/LandingPage/ShortenUrlPage";
import PrivateRoute from "./PrivateRoute.jsx";
import LandingPage from "./containers/LandingPage/LandingPage";
import { endpoints } from "./constants/apiConstants";
import { authConstants } from "./constants/authConstants.js";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Dashboard from "./containers/Dashboard/Dashboard.jsx";
import { ErrorPage } from "./components/ErrorPage/ErrorPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
{/* <PrivateRoute publicPage={true}>
     <RegisterPage />
</PrivateRoute> */}
const AppRouter = () => {
  const hideHeaderFooter = location.pathname.startsWith("/s");
    return (
      <>
      {!hideHeaderFooter && <Navbar />}
      <Toaster position="center-bottom"/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/s/:url" element={<ShortenUrlPage />} />
          <Route path={endpoints.auth.login} element={<PrivateRoute publicPage={true}><LandingPage page={authConstants.loginConstants.LOGIN} /></PrivateRoute>} />
          <Route path={endpoints.auth.register} element={<PrivateRoute publicPage={true}><LandingPage page={authConstants.registerConstants.REGISTER} /></PrivateRoute>} />
          <Route path={endpoints.dashboard.url} element={<PrivateRoute publicPage={false}><Dashboard /></PrivateRoute>} />
          <Route path={endpoints.errorRedirect.url} element={<ErrorPage />} />
          <Route path="*" element={ <ErrorPage message="We can't seem to find the page you're looking for"/>} />
        </Routes>
      {!hideHeaderFooter && <Footer />}
      </>
    );
}
export default AppRouter;
export const SubDomainRouter = () => {
    return (
        <Routes>
          <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}
