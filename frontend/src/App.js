import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Chatpage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/chats" component={Chatpage} exact />
      </Switch>
    </div>
  );
}

export default App;
