import React from 'react';
import { useAuth } from './hooks/useAuth';
import { GoogleAuth } from './features/auth/GoogleAuth';
import { MainLayout } from './components/layout/MainLayout';

const App: React.FC = () => {
  const { currentUser, loading } = useAuth();

  // Show a simple loading state while Firebase checks the user's session
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-textColor-muted">
        Checking authentication...
      </div>
    );
  }

  return (
    <>
      {currentUser ? (
        /* --- SECURE DASHBOARD VIEW WRAPPED IN YOUR NEW LAYOUT --- */
        <MainLayout>
          <div className="max-w-6xl mx-auto">
            
            <h2 className="text-2xl font-bold mb-4 text-textColor-main">Your Datasets</h2>
            
            {/* A nice little welcome banner so you can still see your Auth info */}
            <div className="bg-surface p-6 rounded-lg border border-gray-200 shadow-sm mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Welcome back, {currentUser.displayName || 'User'}!
                </h3>
                <p className="text-sm text-textColor-muted mt-1 font-mono">
                  UID: {currentUser.uid}
                </p>
              </div>
            </div>

            {/* Empty Main Area for your future Data Grid */}
            <div className="bg-surface border-2 border-dashed border-gray-200 rounded-lg p-16 text-center text-textColor-muted shadow-sm">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium text-textColor-main mb-1">No datasets uploaded yet</p>
              <p className="text-sm">We will add the upload button here next!</p>
            </div>

          </div>
        </MainLayout>
      ) : (
        /* --- LOGGED OUT VIEW --- */
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
          <h1 className="text-4xl font-bold mb-8 text-primary">My SaaS App</h1>
          <GoogleAuth />
        </div>
      )}
    </>
  );
};

export default App;