import React from 'react';
import { auth } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';

// Notice we completely removed the HeaderProps interface!
export const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <header className="h-16 bg-surface border-b border-gray-200 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-primary">FINALYS</h1>
        <span className="text-sm font-medium text-textColor-muted hidden sm:inline-block">
          - AI powered financial analysis and simulation
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-textColor-muted hidden sm:inline-block">
          {currentUser?.email}
        </span>
        <button
          onClick={() => auth.signOut()}
          className="text-sm py-1.5 px-3 rounded font-medium text-status-error hover:bg-red-50 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};