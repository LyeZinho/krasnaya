import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Automations } from './pages/Automations';
import { SystemMonitor } from './pages/SystemMonitor';
import { 
  Commands, 
  Economy, 
  Database, 
  AuditLedger, 
  RBAC 
} from './pages/Placeholders';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flows" element={<Automations />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/database" element={<Database />} />
          <Route path="/admin/system" element={<SystemMonitor />} />
          <Route path="/admin/ledger" element={<AuditLedger />} />
          <Route path="/admin/rbac" element={<RBAC />} />
        </Routes>
      </Layout>
    </Router>
  );
}
