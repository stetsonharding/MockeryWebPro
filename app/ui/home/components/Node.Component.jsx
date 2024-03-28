import React from "react";
import ReactFlow from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 100 },
    data: { label: "Start" },
    style: {
      background: "green",
      color: "#fff",
      borderRadius: "50%",
      width: 70,
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "2",
    position: { x: 150, y: 70 },
    data: { label: "Mockery UI" },
    style: {
      background: "skyblue",
      color: "#000",
      width: 120,
      height: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "3",
    position: { x: 400, y: 0 },
    data: {
      label: `{
      "id": "59d27f1e-c34d-4dfa-881e-c6ee463d3e3e",
      "apiKey": "API key generated",
      "workspaceId": "1151edf4-c7b6-4984-8747-69ee5796dc1e",
      "createdAt": "0001-01-01T00:00:00",
      "name": "Game Testing",
      "description": "Testing a new game",
      "tag": "v1",
      "host": "newGames.io",
      "method": "GET",
      "endpoint": "allGames/new",
      "content": "{}",
      "contentType": "application/json",
      "statusCode": 200
    }`,
    },
    style: {
      background: "blue",
      color: "#fff",
      width: 320,
      height: 320,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "4",
    position: { x: 650, y: -30 },
    data: {
      label: "Mocked data is created through the intuitive Mockery interface.",
    },
    style: {
      background: "orange",
      color: "#000",
      width: 120,
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "5",
    position: { x: 530, y: 690 },
    data: { label: "Mockery Service" },
    style: {
      background: 'skyblue', // Change background color to light blue
      color: '#000', 
      borderRadius: '50%', // Make it oval shaped by setting borderRadius to 50%
      width: 350, 
      height: 250, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize:'20px'
    },
  },
  {
    id: "6",
    position: { x: 720, y: 400 },
    data: { label: "The generated mock is seamlessly uploaded to Mockery and securely stored within our database for the user.  " },
    style: {
      background: "orange",
      color: "#000",
      width: 210,
      height: 210,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "7",
    position: { x: 460, y: 1110 },
    data: { label: "Service" },
    style: {
      background: "skyblue",
      color: "#000",
      width: 510,
      height: 110,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "8",
    position: { x: 440, y: 1110 },
    data: { label: "Headers" },
    style: {
      background: "blue",
      color: "#fff",
      width: 50,
      height: 110,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "9",
    position: { x: 950, y: 1110 },
    data: { label: "HTTP Handler" },
    style: {
      background: "blue",
      color: "#fff",
      width: 50,
      height: 110,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "10",
    position: { x: 1000, y: 1110 },
    data: { label: "HTTP Client" },
    style: {
      background: "grey",
      color: "#fff",
      width: 50,
      height: 110,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "11",
    position: { x: -300, y: 710 },
    data: { label: "Client sends X-Mock header with JSON payload that describes the endpoints that should be mocked." },
    style: {
      background: "orange",
      color: "#000",
      width: 210,
      height: 210,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "12",
    position: { x: 80, y: 780 },
    data: { label: "Client transmits  header containing mock selection criteria. Our middleware then utilizes these headers to match them with the appropriate endpoint, subsequently invoking Mockery to procure the corresponding mock data." },
    style: {
      background: "orange",
      color: "#000",
      width: 220,
      height: 220,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    id: "13",
    position: { x: -200, y: 980 },
    data: { label: "CLIENT: {ApiKey:1814811a-ada0-4efc-9536-885a5dfd5ae7,Endpoints:[{Host:Created Mock Edited,Method:PATCH,Endpoint:Created Mock Edited,Tag:Edited Mocks Tag}]}"},
    style: {
      background: "blue",
      color: "#fff",
      width: 360,
      height: 260,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e2-3", source: "4", target: "5", animated: true },
  { id: "e2-3", source: "4", target: "5", animated: true },
  { id: "e2-3", source: "8", target: "5", animated: true },
  { id: "e2-3", source: "9", target: "5", animated: true },
  { id: "e2-3", source: "11", target: "12", animated: true },
  { id: "e2-3", source: "13", target: "8", animated: true },
 
 
];

export default function FlowChart() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
       display:'flex',
       justifyContent: 'center',
       alignItems: 'center'
      }}
    >
      <ReactFlow nodes={initialNodes} edges={initialEdges}  
   
   zoom={.5}
      maxZoom={1}
      minZoom={.5}    />
    </div>
  );
}
