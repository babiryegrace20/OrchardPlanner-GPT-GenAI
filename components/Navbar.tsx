
import React from 'react';
import { Page } from '../types';
import HomeIcon from './icons/HomeIcon';
import TasksIcon from './icons/TasksIcon';
import LogIcon from './icons/LogIcon';
import AssistantIcon from './icons/AssistantIcon';
import AlertsIcon from './icons/AlertsIcon';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  label: string;
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ label, page, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-brand-green' : 'text-brand-text-secondary hover:text-brand-green'}`}
    >
      {children}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-brand-surface border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-3xl mx-auto flex justify-around">
        <NavItem label="Home" page={Page.Dashboard} currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <HomeIcon />
        </NavItem>
        <NavItem label="Tasks" page={Page.Tasks} currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <TasksIcon />
        </NavItem>
        <NavItem label="Log" page={Page.FieldLog} currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <LogIcon />
        </NavItem>
        <NavItem label="Assistant" page={Page.Assistant} currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <AssistantIcon />
        </NavItem>
        <NavItem label="Alerts" page={Page.Alerts} currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <AlertsIcon />
        </NavItem>
      </div>
    </footer>
  );
};

export default Navbar;
