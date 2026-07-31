import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollTopArrow from './components/ScrollTopArrow';
import CancelReservation from './pages/CancelReservation';

import Navbar   from './components/Navbar';
import Footer   from './components/Footer';   
import Home     from './pages/Home'       ;
import Services from './pages/Servicii'   ;
import Despre   from './pages/Despre'     ;
import Gallery  from './pages/Gallery'    ;
import Contact  from './pages/Contact'    ;

import Rezervare  from './pages/Rezervare'    ;

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ flex: '1' }}>
        <Routes>
          <Route path="/"         element={<Navigate to="/acasa" replace />} />
          <Route path="/acasa"    element={<Home />}     />
          <Route path="/servicii" element={<Services />} />
          <Route path="/despre"   element={<Despre />}    />
          <Route path="/galerie"  element={<Gallery />}  />
          <Route path="/contact"  element={<Contact />}  />
          <Route path="/rezervare"  element={<Rezervare />}  />
          <Route path="/cancel" element={<CancelReservation />} />
        </Routes>
      </main>
       <ScrollTopArrow />
       {/* <RezervationForm /> */}
      <Footer />
       {/* <StripeTest /> */}
    </Router>
    
  );
}
