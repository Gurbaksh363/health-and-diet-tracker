import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.navbar-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '/', type: 'route' },
        { name: 'Tracker', href: '/dashboard', type: 'route' },
        { name: 'Nutrition', href: '/nutrition', type: 'route' },
        { name: 'Workouts', href: '/workouts', type: 'route' },
        { name: 'Progress', href: '/goals', type: 'route' },
        { name: 'Settings', href: '/settings', type: 'route' },
    ];

    const handleLinkClick = (href, type) => {
        setIsOpen(false);
        
        if (type === 'anchor') {
            // For anchor links, navigate to home first if not there
            if (location.pathname !== '/') {
                navigate('/');
                // Wait for navigation, then scroll
                setTimeout(() => {
                    const element = document.querySelector(href);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                // Already on home, just scroll
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
            setActiveSection(href.slice(1));
        }
    };

    // Animation variants
    const navbarVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
            },
        },
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            x: '100%',
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                staggerChildren: 0.07,
                delayChildren: 0.1,
            },
        },
    };

    const menuItemVariants = {
        closed: {
            x: 50,
            opacity: 0,
        },
        open: {
            x: 0,
            opacity: 1,
        },
    };

    return (
        <motion.nav
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            className={`navbar-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-surface/80 backdrop-blur-lg shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <motion.div
                        className="flex items-center space-x-2"
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <Logo height={36} width={36} className="fill-primary" />
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-xl font-bold text-primary">
                                FitMind
                            </span>
                            <span className="text-xs text-text-secondary tracking-wide hidden sm:block">
                                Health & Diet
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link, index) => {
                            const isActive = link.type === 'route' 
                                ? location.pathname === link.href 
                                : activeSection === link.href.slice(1);
                            
                            const linkContent = (
                                <motion.div
                                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive ? 'text-primary' : 'text-text hover:text-primary'
                                    }`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            initial={false}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </motion.div>
                            );

                            return link.type === 'route' ? (
                                <Link key={link.name} to={link.href}>
                                    {linkContent}
                                </Link>
                            ) : (
                                <button
                                    key={link.name}
                                    onClick={() => handleLinkClick(link.href, link.type)}
                                >
                                    {linkContent}
                                </button>
                            );
                        })}

                        {/* Auth Buttons */}
                        <Link to="/login">
                            <motion.button
                                className="ml-3 px-5 py-2 text-primary font-medium hover:bg-primary/10 rounded-full transition-all"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: 'spring' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Login
                            </motion.button>
                        </Link>
                        <Link to="/signup">
                            <motion.button
                                className="ml-1 px-5 py-2 bg-primary text-white rounded-full font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, type: 'spring' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sign Up
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg bg-surface hover:bg-primary/10 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="w-5 flex flex-col items-center justify-center space-y-1.5">
                            <motion.span
                                className="w-full h-0.5 bg-primary rounded-full"
                                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="w-full h-0.5 bg-primary rounded-full"
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="w-full h-0.5 bg-primary rounded-full"
                                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden fixed left-0 right-0 bg-surface/98 backdrop-blur-xl z-40 h-dvh"
                        style={{ top: '64px', bottom: 0 }}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <div className="flex flex-col items-center justify-start py-6 px-4 space-y-2 h-full overflow-y-auto">
                            {navLinks.map((link) => {
                                const isActive = link.type === 'route' 
                                    ? location.pathname === link.href 
                                    : activeSection === link.href.slice(1);
                                
                                const linkContent = (
                                    <motion.div
                                        variants={menuItemVariants}
                                        className={`w-full max-w-sm px-5 py-3 rounded-lg text-center text-base font-medium transition-all ${
                                            isActive
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-bg hover:bg-primary/10 text-text'
                                        }`}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {link.name}
                                    </motion.div>
                                );

                                return link.type === 'route' ? (
                                    <Link 
                                        key={link.name} 
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full"
                                    >
                                        {linkContent}
                                    </Link>
                                ) : (
                                    <button
                                        key={link.name}
                                        onClick={() => handleLinkClick(link.href, link.type)}
                                        className="w-full"
                                    >
                                        {linkContent}
                                    </button>
                                );
                            })}

                            <div className="w-full max-w-sm border-t border-border pt-3 mt-3 space-y-2">
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <motion.button
                                        variants={menuItemVariants}
                                        className="w-full px-5 py-3 bg-bg hover:bg-primary/10 text-primary rounded-lg font-semibold text-base"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Login
                                    </motion.button>
                                </Link>

                                <Link to="/signup" onClick={() => setIsOpen(false)}>
                                    <motion.button
                                        variants={menuItemVariants}
                                        className="w-full px-5 py-3 bg-accent text-white rounded-lg font-semibold text-base shadow-md"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Sign Up
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navbar Bottom Line */}
            <motion.div
                className="h-0.5 bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: scrolled ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
            />
        </motion.nav>
    );
};

export default Navbar;
