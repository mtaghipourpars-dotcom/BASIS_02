import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Shell } from './components/layout/Shell';
import { HomePage } from './components/pages/HomePage';
import { OverviewPage } from './components/pages/OverviewPage';
import { SystemsPage } from './components/pages/SystemsPage';
import { LandscapePage } from './components/pages/LandscapePage';
import { AlertsEventsPage } from './components/pages/AlertsEventsPage';
import { PerformancePage } from './components/pages/PerformancePage';
import { JobsProcessesPage } from './components/pages/JobsProcessesPage';
import { DatabasePage } from './components/pages/DatabasePage';
import { TransportsPage } from './components/pages/TransportsPage';
import { SecurityPage } from './components/pages/SecurityPage';
import { BackupRecoveryPage } from './components/pages/BackupRecoveryPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { SettingsPage } from './components/pages/SettingsPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <Shell>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'overview' && <OverviewPage />}
      {currentPage === 'systems' && <SystemsPage />}
      {currentPage === 'landscape' && <LandscapePage />}
      {currentPage === 'alerts-events' && <AlertsEventsPage />}
      {currentPage === 'performance' && <PerformancePage />}
      {currentPage === 'jobs-processes' && <JobsProcessesPage />}
      {currentPage === 'database' && <DatabasePage />}
      {currentPage === 'transports' && <TransportsPage />}
      {currentPage === 'security' && <SecurityPage />}
      {currentPage === 'backup-recovery' && <BackupRecoveryPage />}
      {currentPage === 'reports' && <ReportsPage />}
      {currentPage === 'settings' && <SettingsPage />}
    </Shell>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
