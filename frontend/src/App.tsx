import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { ClientsPage } from './pages/ClientsPage'
import { PetsPage } from './pages/PetsPage'
import { NewPetPage } from './pages/NewPetPage'
import { MedicationsPage } from './pages/MedicationsPage'
import { NewMedicationPage } from './pages/NewMedicationPage'
import { ReportsPage } from './pages/ReportsPage'

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
