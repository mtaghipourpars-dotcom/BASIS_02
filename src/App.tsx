import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Shell } from './components/layout/Shell';
import { HomePage } from './components/pages/HomePage';
import { LandscapePage } from './components/pages/LandscapePage';
import { PerformancePage } from './components/pages/PerformancePage';
import { JobsProcessesPage } from './components/pages/JobsProcessesPage';
import { DatabasePage } from './components/pages/DatabasePage';
import { SecurityPage } from './components/pages/SecurityPage';
import { AlertsEventsPage } from './components/pages/AlertsEventsPage';
import { InterfacesConnectivityPage } from './components/pages/InterfacesConnectivityPage';
import { TransportsPage } from './components/pages/TransportsPage';
import { BackupRecoveryPage } from './components/pages/BackupRecoveryPage';
import { SystemOperationsPage } from './components/pages/SystemOperationsPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { SettingsPage } from './components/pages/SettingsPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <Shell>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'landscape' && <LandscapePage />}
      {currentPage === 'performance' && <PerformancePage />}
      {currentPage === 'jobs-processes' && <JobsProcessesPage />}
      {currentPage === 'database' && <DatabasePage />}
      {currentPage === 'security' && <SecurityPage />}
      {currentPage === 'alerts-events' && <AlertsEventsPage />}
      {currentPage === 'interfaces-connectivity' && <InterfacesConnectivityPage />}
      {currentPage === 'transports' && <TransportsPage />}
      {currentPage === 'backup-recovery' && <BackupRecoveryPage />}
      {currentPage === 'system-operations' && <SystemOperationsPage />}
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
