import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/dashboard";
import ErrorPage from "../pages/error/error";
import Home from "../pages/home/home";
import { Container, Header, Img } from "./style";
import Logo from '../constants/imgs/logo.png'

export default function Rotas() {
  return (
  <Container>
    <Header>
			<Img src={Logo} alt="logo"/>
    </Header>
    <BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Dashboard />} />
					<Route exact path="/dashboard" element={<Home />} />
					<Route exact path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
    
	</Container>
)
}