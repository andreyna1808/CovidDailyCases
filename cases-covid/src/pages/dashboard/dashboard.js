import React from "react";
import { Link } from "react-router-dom";
import { Button, DivContain, H1, Paragrafo, Span } from "./styleDashboard";

export default function Dashboard() {
  return (
  <DivContain>
    <H1>International information about <Span>COVID</Span></H1>
    <div>
    <Paragrafo>Get accurate results by region and time period. A fully functional and specific system.</Paragrafo>
    <Link to='/dashboard'><Button>See information &gt;</Button></Link>
    </div>
  </DivContain>
)
}