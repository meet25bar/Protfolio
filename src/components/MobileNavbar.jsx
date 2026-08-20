import React from 'react';
import { Home, User, FolderGit2, Briefcase, Mail, Moon, Sun } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { path: '/',           icon: Home,       label: 'Home'       },
  { path: '/about',      icon: User,       label: 'About'      },
  { path: '/projects',   icon: FolderGit2, label: 'Projects'   },
  { path: '/experience', icon: Briefcase,  label: 'Experience' },
  { path: '/contact',    icon: Mail,       label: 'Contact'    },
];

export default function MobileNavbar() {
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Floating Theme Toggle (Top Right) */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={toggle}
        className="fixed top-4 right-4 z-50 p-3 rounded-full border glass-card"
        style={{
          backgroundColor: isDark ? 'rgba(12, 22, 40, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)',
        }}
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <Sun size={20} color="rgba(251, 191, 36, 1)" />
        ) : (
          <Moon size={20} color="#1e293b" />
        )}
      </motion.button>

      {/* Bottom Tab Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t pb-safe"
        style={{
          backgroundColor: isDark ? 'rgba(3, 8, 17, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px) saturate(150%)',
        }}
      >
        <div className="flex justify-around items-center px-2 py-3">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="flex flex-col items-center justify-center w-full relative"
                aria-label={link.label}
              >
                <div
                  className={`p-1.5 rounded-xl transition-colors duration-300 ${
                    isActive
                      ? isDark
                        ? 'bg-white/10'
                        : 'bg-black/5'
                      : 'bg-transparent'
                  }`}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                    style={{
                      color: isActive
                        ? isDark
                          ? '#00d4ff'
                          : '#0284c7'
                        : isDark
                        ? 'rgba(255,255,255,0.5)'
                        : 'rgba(15,23,42,0.5)',
                      filter: isActive ? 'drop-shadow(0 0 6px rgba(0,212,255,0.3))' : 'none',
                    }}
                  />
                </div>
                <span
                  className="text-[10px] mt-1 font-medium tracking-wide transition-colors duration-300"
                  style={{
                    color: isActive
                      ? isDark
                        ? '#00d4ff'
                        : '#0284c7'
                      : isDark
                      ? 'rgba(255,255,255,0.5)'
                      : 'rgba(15,23,42,0.5)',
                  }}
                >
                  {link.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
