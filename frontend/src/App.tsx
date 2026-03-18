import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { ClientsPage } from './pages/clients/ClientsPage'
import { PetsPage } from './pages/pets/PetsPage'
import { NewPetPage } from './pages/pets/NewPetPage'
import { MedicationsPage } from './pages/medications/MedicationsPage'
import { NewMedicationPage } from './pages/medications/NewMedicationPage'
import { ReportsPage } from './pages/reports/ReportsPage'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/new" element={<NewPetPage />} />
          <Route path="/pets/:id/edit" element={<NewPetPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/medications/new" element={<NewMedicationPage />} />
          <Route path="/medications/:id/edit" element={<NewMedicationPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}
