import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './components/contactList';
import Dashboard from './components/dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/layout';
import ContactForm from './components/contactForm';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ContactList />} />
          <Route path="/create/:contactId" element={<ContactForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
    </Router>
    </QueryClientProvider>
  );
};

export default App;
