import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EventTable from "./Pages/EventTable";
import { PageviewGenerator } from "./PageviewGenerator";

function App() {
  return (
    <div className="App">
      {/* <EventTable /> */}
      <Routes>
        <Route
          path="/"
          element={
            <header className="App-header">
              <PageviewGenerator />
            </header>
          }
        />
        <Route path="/table" element={<EventTable />} />
      </Routes>
    </div>
  );
}

export default App;
