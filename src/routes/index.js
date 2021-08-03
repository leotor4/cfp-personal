import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import ForgetPassword from '../pages/ForgetPassword';
import RedifinePassword from '../pages/RedifinePassword';
import ChangePassword from '../pages/ChangePassword';
import Subscription from '../pages/Subscription';
import Feedback from '../pages/Subscription/Feedback';
import About from '../pages/About';
import AboutLogged from '../pages/AboutLogged';

import Dashboard from '../pages/Dashboard';
import Relatories from '../pages/Relatories';
import RelatoriesModel from '../pages/RelatoriesModel';

import Courses from '../pages/Courses';
import AddCourse from '../pages/Courses/AddCourse';
import EditCourse from '../pages/Courses/EditCourse';

import Classes from '../pages/Classes';
import ManageClass from '../pages/Classes/ManageClass';
import AddClass from '../pages/Classes/AddClass';
import EditClass from '../pages/Classes/EditClass';

import Students from '../pages/Students';
import Certificate from '../pages/Students/Certificate';
import AddStudent from '../pages/Students/AddStudent';
import EditStudent from '../pages/Students/EditStudent';

import Instructors from '../pages/Instructors';

import Admins from '../pages/Admins';
import AddAdmin from '../pages/Admins/AddAdmin';
import EditAdmin from '../pages/Admins/EditAdmin';

import Certificates from '../pages/Certificates';
import AddInstructor from '../pages/Instructors/AddInstructor';
import EditInstructor from '../pages/Instructors/EditInstructor';
import GradesAndFrequency from '../pages/GradesAndFrequency';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/subscription" exact component={Subscription} />
      <Route path="/subscription-feedback" exact component={Feedback} />

      <Route path="/forget-password" exact component={ForgetPassword} />
      <Route path={`/forgot/:id`} component={RedifinePassword} />
      <Route path="/about" component={About} />

      <Route path="/change-password" component={ChangePassword} isPrivate />
      <Route path="/about-l" component={AboutLogged} isPrivate />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      {/* <Route path="/relatories" component={RelatoriesModel} isPrivate /> */}

      <Route path="/courses" exact component={Courses} isPrivate />
      <Route path="/courses/add-course" component={AddCourse} isPrivate />
      <Route path="/courses/edit-course" component={EditCourse} isPrivate />

      <Route path="/classes" exact component={Classes} isPrivate />
      <Route path="/classes/add-class" component={AddClass} isPrivate />
      <Route path="/classes/manage-class" exact component={ManageClass} isPrivate />
      <Route path="/classes/manage-class/add-student" component={AddStudent} isPrivate />
      <Route path="/classes/manage-class/grades-and-frequency" exact component={GradesAndFrequency} replace isPrivate />
      <Route path="/classes/manage-class/add-instructor" component={AddInstructor} isPrivate />
      <Route path="/classes/manage-class/edit-class" component={EditClass} isPrivate />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/certificate" component={Certificate} isPrivate />
      <Route path="/students/add-student" component={AddStudent} isPrivate />
      <Route path="/students/edit-student" component={EditStudent} isPrivate />

      <Route path="/instructors" exact component={Instructors} isPrivate />
      <Route path="/instructors/add-instructor" component={AddInstructor} isPrivate />
      <Route path="/instructors/edit-instructor" component={EditInstructor} isPrivate />

      <Route path="/admins" exact component={Admins} isPrivate />
      <Route path="/admins/add-admin" component={AddAdmin} isPrivate />
      <Route path="/admins/edit-admin" component={EditAdmin} isPrivate />

      <Route path="/certificates" component={Certificates} isPrivate />
    </Switch>
  );
}

export default Routes;