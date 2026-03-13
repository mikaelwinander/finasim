import React from 'react';
import { Icons } from '../ui/Icons';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  
  // A simple array to map through our links cleanly
  const navItems = [
    { name: 'Start', icon: Icons.Start },
    { name: 'Data', icon: Icons.Data },
    { name: 'Import', icon: Icons.Import },
    { name: 'Settings', icon: Icons.Settings },
  ];

  return (
    <aside 
      className={`bg-surface border-r border-gray-200 transition-all duration-300 flex flex-col relative ${
        isOpen ? 'w-50' : 'w-20'
      }`}
    >
      <nav className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => (
          <a 
            key={item.name}
            href="#" 
            className="flex items-center gap-4 px-6 py-3 mx-2 rounded text-textColor-muted hover:bg-background hover:text-primary font-medium transition-colors group"
            title={!isOpen ? item.name : undefined}
          >
            <item.icon className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
            <span className={`${isOpen ? 'block' : 'hidden'} whitespace-nowrap`}>
              {item.name}
            </span>
          </a>
        ))}
      </nav>

      {/* The Toggle Button pushed to the bottom */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button 
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded text-textColor-muted hover:bg-background hover:text-primary transition-colors focus:outline-none"
          aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isOpen ? (
            <Icons.ChevronLeft className="w-6 h-6" />
          ) : (
            <Icons.ChevronRight className="w-6 h-6" />
          )}
        </button>
      </div>
    </aside>
  );
};