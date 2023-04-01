import React from 'react';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import Gallery from "./features/photos/Gallery";
import PhotosByUser from "./features/photos/components/PhotosByUser";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PhotoForm from "./features/photos/components/PhotoForm";

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl" sx={{mb: 5}}>
          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Gallery/>}/>
            <Route path="/users/:id" element={<PhotosByUser/>}/>
            <Route path="/new-photo" element={<ProtectedRoute isAllowed={Boolean(user)}><PhotoForm/></ProtectedRoute>}/>
            <Route path="/*" element={<h1>Not Found! This page does not exist!</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
