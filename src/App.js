import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Students from './pages/Students';
import CreateStudent from './pages/CreateStudent';
import UpdateStudent from './pages/UpdateStudent';
import StudentDetails from './pages/StudentDetails';
import Mentors from './pages/Mentors';
import CreateMentor from './pages/CreateMentor';

import axios from 'axios';
import MentorDetails from './pages/MentorDetails';

axios.defaults.baseURL = process.env.REACT_APP_API;


function App() {
  return (
    <div className="App">
      <ToastContainer position='top-center' />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact><Redirect to="/students" /></Route>
          <Route path="/home" exact ><Redirect to="/students" /></Route>

          <Route path="/student/create" exact component={CreateStudent} />
          <Route path="/student/update/:id" exact component={UpdateStudent} />
          <Route path="/student/details/:id" exact component={StudentDetails} />
          <Route path="/students" exact component={Students} />
          <Route path="/mentor/create" exact component={CreateMentor} />
          <Route path="/mentor/details/:id" exact component={MentorDetails} />
          <Route path="/mentors" exact component={Mentors} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
