import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PageNavigator from "./PageNavigator";

function App() {
  return (
    <BrowserRouter>
      <PageNavigator />
    </BrowserRouter>
  );
}

export default App;
