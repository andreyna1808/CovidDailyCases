import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/dashboard";
import ErrorPage from "../pages/error/error";
import Home from "../pages/home/home";

export default function Rotas() {
  return (
  <div>
    <header>

    </header>
    <BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/dashboard" element={<Dashboard />} />
					<Route exact path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
    
</div>
)
}