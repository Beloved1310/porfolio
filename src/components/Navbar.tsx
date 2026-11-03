import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { scrollToId } from '../utils/scroll';

const navItems = [
  { name: 'Work', to: '/projects' },
  { name: 'Speaking', to: '/speaking' },
  { name: 'My Story', to: '/album' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleAnchorClick = (e: React.MouseEvent, to: string) => {
    const [path, hash] = to.split('#');
    if (!hash) return;
    if (location.pathname === (path || '/')) {
      e.preventDefault();
      scrollToId(hash);
    } else {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference pointer-events-none [&_:focus-visible]:outline-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-24 flex items-center justify-between text-white pointer-events-auto">
        <Link
          to="/#hero"
          onClick={(e) => handleAnchorClick(e, '/#hero')}
          className="font-bold tracking-tighter text-xl md:text-2xl group flex items-center gap-2"
        >
          <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm transition-transform group-hover:rotate-12">
            A
          </span>
          <span className="hidden sm:inline">ADEFISAYO</span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em]"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={(e) => handleAnchorClick(e, item.to)}
              className="hover:opacity-70 transition-opacity"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/#contact"
            onClick={(e) => handleAnchorClick(e, '/#contact')}
            className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-all"
          >
            Connect
          </Link>
          <button
            onClick={toggleTheme}
            className="p-1.5 flex"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
          </button>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black text-white pointer-events-auto"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={(e) => {
                    handleAnchorClick(e, item.to);
                    setIsOpen(false);
                  }}
                  className="block px-2 py-2 text-sm font-bold uppercase tracking-widest"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/#contact"
                onClick={(e) => {
                  handleAnchorClick(e, '/#contact');
                  setIsOpen(false);
                }}
                className="block px-2 py-2 text-sm font-bold uppercase tracking-widest"
              >
                Connect
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-2 py-2 text-sm font-bold uppercase tracking-widest"
              >
                {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />} Theme
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
