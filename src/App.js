import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import BlogDetails from './screens/BlogDetails';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/blog/:id">
            <BlogDetails />
          </Route>
          <Route exact path="/" >
            <HomeScreen />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
