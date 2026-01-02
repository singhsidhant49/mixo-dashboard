import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
