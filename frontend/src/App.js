import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import AsciiForm from "./components/form/asciiForm";
import React from "react";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <AsciiForm />
      </div>
      <Footer />
    </>
  );
}

export default App;
