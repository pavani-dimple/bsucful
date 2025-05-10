import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Users, 
  Settings, 
  X, 
  Folder, 
  BarChart2, 
  BookOpen, 
  Calendar, 
  Tag, 
  MessageSquare 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, exact = false }) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      className={`sidebar-link ${isActive ? 'active' : ''}`}
    >
      {icon}
      <span className="ml-3">{label}</span>
      {isActive && (
        <span className="absolute inset-y-0 left-0 w-1 bg-primary-500 rounded-r-md"></span>
      )}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary-600">PrismCMS</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-primary-500 focus:outline-none lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=256'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="overflow-hidden">
                <h3 className="text-sm font-medium text-gray-800 truncate">{user?.name}</h3>
                <p className="text-xs text-gray-500 truncate">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" exact />
            </div>

            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Content
              </h3>
              <div className="mt-2 space-y-1">
                <NavItem to="/content" icon={<FileText size={20} />} label="Articles" />
                <NavItem to="/media" icon={<Image size={20} />} label="Media Library" />
                <NavItem to="/pages" icon={<BookOpen size={20} />} label="Pages" />
                <NavItem to="/categories" icon={<Folder size={20} />} label="Categories" />
                <NavItem to="/tags" icon={<Tag size={20} />} label="Tags" />
                <NavItem to="/comments" icon={<MessageSquare size={20} />} label="Comments" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Management
              </h3>
              <div className="mt-2 space-y-1">
                <NavItem to="/users" icon={<Users size={20} />} label="Users" />
                <NavItem to="/analytics" icon={<BarChart2 size={20} />} label="Analytics" />
                <NavItem to="/schedule" icon={<Calendar size={20} />} label="Schedule" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                System
              </h3>
              <div className="mt-2 space-y-1">
                <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
              </div>
            </div>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">v1.0.0</span>
              <a
                href="#"
                className="text-xs text-primary-500 hover:text-primary-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;