import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

    return (
        <nav className='w-full bg-slate-50 shadow-md p-4 sticky top-0 left-0 z-10 rounded-b-xl'>
            <div className='container mx-auto flex justify-between items-center'>
                {/* Brand/Logo */}
                <a href="/" className='text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out'>
                    MaIA
                </a>

                {/* Mobile Menu Button (Hamburger) */}
                <div className='block lg:hidden'>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='text-gray-800 focus:outline-none focus:text-gray-600'
                        aria-label='Toggle navigation'
                    >
                        <svg
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            ) : (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;