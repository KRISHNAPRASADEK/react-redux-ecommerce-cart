import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import CardDetailes from "./components/CardDetailes";
import Cards from "./components/Cards";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardDetailes />} />
      </Routes>
    </>
  );
}

export default App;
