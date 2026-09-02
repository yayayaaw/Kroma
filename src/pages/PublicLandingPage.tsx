import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { SignatureMenu } from '../components/SignatureMenu';
import { Gallery } from '../components/Gallery';
import { Experience } from '../components/Experience';
import { Reviews } from '../components/Reviews';
import { LocationContact } from '../components/LocationContact';
import { Footer } from '../components/Footer';
import { ReservationModal } from '../components/ReservationModal';
import { recordPageView } from '../../cms/data/analyticsStore';

export const PublicLandingPage: React.FC = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    recordPageView();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#FBFBF9] text-[#141416] selection:bg-[#141416] selection:text-[#FBFBF9] font-sans antialiased"
      style={{
        backgroundColor: 'var(--color-bg-main, #FBFBF9)',
        color: 'var(--color-text-main, #141416)',
      }}
    >
      {/* Sticky Header with Navigation */}
      <Navbar onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Main Sections */}
      <main id="main-content">
        <Hero onOpenReservation={() => setIsReservationOpen(true)} />
        <About />
        <SignatureMenu />
        <Gallery />
        <Experience />
        <Reviews />
        <LocationContact onOpenReservation={() => setIsReservationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Reservation WhatsApp Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
};

