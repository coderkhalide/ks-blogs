import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import BlogDetails from './screens/BlogDetails';
import HomeScreen from './screens/HomeScreen';
import CreateBlogScreen from './screens/CreateBlogScreen';
import JoinScreen from "./screens/JoinScreen";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/blog/:id">
            <BlogDetails />
          </Route>
          <Route exact path="/create">
            <CreateBlogScreen />
          </Route>
          <Route exact path="/join">
            <JoinScreen />
          </Route>
          <Route exact path="/" >
            <HomeScreen />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
