import React from 'react';

const Footer = () => {
    return (
        <footer className="py-6 md:py-8 border-t-2 border-gray-800 text-center text-blue-300">
            <p className="text-sm md:text-base">© {new Date().getFullYear()} J N Antrow Jefin. All rights reserved.</p>
            <p className="text-xs md:text-sm mt-2">Full-Stack Developer • Game Developer • Chennai, India</p>
            <p className="text-xs mt-2 text-gray-500">Made with ♥ and React</p>
        </footer>
    );
};

export default Footer;
