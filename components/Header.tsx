
import React, { useState, useEffect } from 'react';

interface HeaderProps {
    activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About Us' },
        { href: '#products', label: 'Products' },
        { href: '#services', label: 'Services' },
        { href: '#clients', label: 'Clients' },
        { href: '#contact', label: 'Contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const linkClasses = (href: string) => 
        `block py-2 px-3 rounded md:p-0 transition-colors duration-300 ${
            activeSection === href.substring(1)
                ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700'
                : 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
        }`;

    return (
        <nav className={`fixed w-full z-20 top-0 left-0 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-800">Global Path Trades</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
                    <div className="hidden lg:flex items-center mr-4 text-sm text-gray-600">
                        <i className="fas fa-envelope mr-2 text-blue-600"></i>
                        <span>globalpathtrades@gmail.com</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <a href={link.href} className={linkClasses(link.href)} onClick={() => setIsOpen(false)}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
