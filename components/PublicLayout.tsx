
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatOverlay from './ChatOverlay';

interface PublicLayoutProps {
    onContactClick: () => void;
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
    onContactClick,
    isChatOpen,
    setIsChatOpen
}) => {
    return (
        <div className="app-wrapper flex flex-col min-h-screen">
            <Header onContactClick={onContactClick} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <ChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
};
