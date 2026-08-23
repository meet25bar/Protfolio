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
        className="fixed top-4 right-4 z-50 rounded-full border glass-card focus-visible:ring-2 focus-visible:ring-accent-cyan"
        style={{
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? 'rgba(12, 22, 40, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)',
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {isDark ? (
          <Sun size={18} color="rgba(251, 191, 36, 1)" />
        ) : (
          <Moon size={18} color="#1e293b" />
        )}
      </motion.button>

      {/* Bottom Tab Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{
          backgroundColor: isDark ? 'rgba(3, 8, 17, 0.92)' : 'rgba(255, 255, 255, 0.92)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(24px) saturate(150%)',
          boxShadow: isDark
            ? '0 -4px 20px rgba(0, 0, 0, 0.4)'
            : '0 -4px 20px rgba(0, 0, 0, 0.08)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="flex justify-around items-center px-1 py-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="flex flex-col items-center justify-center relative"
                style={{ minWidth: 44, minHeight: 44 }}
                aria-label={link.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <div
                  className={`p-2 rounded-xl transition-colors duration-300 ${
                    isActive
                      ? isDark
                        ? 'bg-white/10'
                        : 'bg-black/5'
                      : 'bg-transparent'
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    style={{
                      color: isActive
                        ? isDark
                          ? '#00d4ff'
                          : '#0284c7'
                        : isDark
                        ? 'rgba(255,255,255,0.55)'
                        : 'rgba(15,23,42,0.55)',
                      filter: isActive ? 'drop-shadow(0 0 6px rgba(0,212,255,0.3))' : 'none',
                    }}
                  />
                </div>
                <span
                  className="text-[10px] mt-0.5 font-medium tracking-wide transition-colors duration-300"
                  style={{
                    color: isActive
                      ? isDark
                        ? '#00d4ff'
                        : '#0284c7'
                      : isDark
                      ? 'rgba(255,255,255,0.55)'
                      : 'rgba(15,23,42,0.55)',
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
