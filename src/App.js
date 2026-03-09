import React, { useState, useEffect } from 'react';

const API_KEY = "AIzaSyDEWoN5s2YXe68Onra-ZCiIPd46oTY7gYQ";
const PROJECT_ID = "atlantic-gateway-crm";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Firebase REST API functions
const firebaseAPI = {
  async addJob(job) {
    try {
      const response = await fetch(`${BASE_URL}/jobs?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: job })
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  },

  async getJobs() {
    try {
      const response = await fetch(`${BASE_URL}/jobs?key=${API_KEY}`);
      const data = await response.json();
      if (data.documents) {
        return data.documents.map(doc => ({
          id: doc.name.split('/').pop(),
          ...doc.fields
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting jobs:', error);
      return [];
    }
  },

  async deleteJob(jobId) {
    try {
      await fetch(`${BASE_URL}/jobs/${jobId}?key=${API_KEY}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  async addContainer(container) {
    try {
      const response = await fetch(`${BASE_URL}/containers?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: container })
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding container:', error);
      throw error;
    }
  },

  async getContainers() {
    try {
      const response = await fetch(`${BASE_URL}/containers?key=${API_KEY}`);
      const data = await response.json();
      if (data.documents) {
        return data.documents.map(doc => ({
          id: doc.name.split('/').pop(),
          ...doc.fields
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting containers:', error);
      return [];
    }
  },

  async deleteContainer(containerId) {
    try {
      await fetch(`${BASE_URL}/containers/${containerId}?key=${API_KEY}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting container:', error);
      throw error;
    }
  },

  async addCustomer(customer) {
    try {
      const response = await fetch(`${BASE_URL}/customers?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: customer })
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  },

  async getCustomers() {
    try {
      const response = await fetch(`${BASE_URL}/customers?key=${API_KEY}`);
      const data = await response.json();
      if (data.documents) {
        return data.documents.map(doc => ({
          id: doc.name.split('/').pop(),
          ...doc.fields
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting customers:', error);
      return [];
    }
  },

  async deleteCustomer(customerId) {
    try {
      await fetch(`${BASE_URL}/customers/${customerId}?key=${API_KEY}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  },

  async addLead(lead) {
    try {
      const response = await fetch(`${BASE_URL}/leads?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: lead })
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error;
    }
  },

  async getLeads() {
    try {
      const response = await fetch(`${BASE_URL}/leads?key=${API_KEY}`);
      const data = await response.json();
      if (data.documents) {
        return data.documents.map(doc => ({
          id: doc.name.split('/').pop(),
          ...doc.fields
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting leads:', error);
      return [];
    }
  },

  async deleteLead(leadId) {
    try {
      await fetch(`${BASE_URL}/leads/${leadId}?key=${API_KEY}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  },

  async addAccount(account) {
    try {
      const response = await fetch(`${BASE_URL}/accounts?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: account })
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding account:', error);
      throw error;
    }
  },

  async getAccounts() {
    try {
      const response = await fetch(`${BASE_URL}/accounts?key=${API_KEY}`);
      const data = await response.json();
      if (data.documents) {
        return data.documents.map(doc => ({
          id: doc.name.split('/').pop(),
          ...doc.fields
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting accounts:', error);
      return [];
    }
  },

  async deleteAccount(accountId) {
    try {
      await fetch(`${BASE_URL}/accounts/${accountId}?key=${API_KEY}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('admin@atlanticgateway.com');
  const [password, setPassword] = useState('admin123');
  const [tab, setTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  const [jobs, setJobs] = useState([]);
  const [containers, setContainers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [accounts, setAccounts] = useState([]);
  
  const [showJobModal, setShowJobModal] = useState(false);
  const [showContainerModal, setShowContainerModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  
  const [jobForm, setJobForm] = useState({ jobId: { stringValue: '' }, jobName: { stringValue: '' }, customer: { stringValue: '' }, status: { stringValue: 'active' }, assignedTo: { stringValue: '' } });
  const [containerForm, setContainerForm] = useState({
    containerId: { stringValue: '' }, containerName: { stringValue: '' }, size: { stringValue: '20ft' }, type: { stringValue: 'standard' }, status: { stringValue: 'active' },
    pol: { stringValue: '' }, pod: { stringValue: '' }, eta: { stringValue: '' }, blNumber: { stringValue: '' }, currentLocation: { stringValue: '' }
  });
  const [customerForm, setCustomerForm] = useState({ customerId: { stringValue: '' }, customerName: { stringValue: '' }, email: { stringValue: '' }, phone: { stringValue: '' }, country: { stringValue: '' } });
  const [leadForm, setLeadForm] = useState({ leadId: { stringValue: '' }, companyName: { stringValue: '' }, contactPerson: { stringValue: '' }, email: { stringValue: '' }, phone: { stringValue: '' }, status: { stringValue: 'new' } });
  const [accountForm, setAccountForm] = useState({ accountId: { stringValue: '' }, accountName: { stringValue: '' }, customer: { stringValue: '' }, balance: { doubleValue: 0 }, status: { stringValue: 'active' } });

  useEffect(() => {
    loadAllData();
  }, [user]);

  const loadAllData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const jobsData = await firebaseAPI.getJobs();
      const containersData = await firebaseAPI.getContainers();
      const customersData = await firebaseAPI.getCustomers();
      const leadsData = await firebaseAPI.getLeads();
      const accountsData = await firebaseAPI.getAccounts();
      
      setJobs(jobsData);
      setContainers(containersData);
      setCustomers(customersData);
      setLeads(leadsData);
      setAccounts(accountsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@atlanticgateway.com' && password === 'admin123') {
      setUser({ name: 'Admin User', role: 'admin' });
    } else if (email === 'staff@atlanticgateway.com' && password === 'staff123') {
      setUser({ name: 'Staff User', role: 'staff' });
    } else {
      alert('Invalid credentials');
    }
  };

  const addJob = async () => {
    if (!jobForm.jobId.stringValue || !jobForm.jobName.stringValue) {
      alert('Fill Job ID and Job Name');
      return;
    }
    try {
      await firebaseAPI.addJob(jobForm);
      const updatedJobs = await firebaseAPI.getJobs();
      setJobs(updatedJobs);
      setJobForm({ jobId: { stringValue: '' }, jobName: { stringValue: '' }, customer: { stringValue: '' }, status: { stringValue: 'active' }, assignedTo: { stringValue: '' } });
      setShowJobModal(false);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await firebaseAPI.deleteJob(jobId);
      setJobs(jobs.filter(j => j.id !== jobId));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const addContainer = async () => {
    if (!containerForm.containerId.stringValue || !containerForm.containerName.stringValue) {
      alert('Fill Container ID and Container Name');
      return;
    }
    try {
      await firebaseAPI.addContainer(containerForm);
      const updatedContainers = await firebaseAPI.getContainers();
      setContainers(updatedContainers);
      setContainerForm({
        containerId: { stringValue: '' }, containerName: { stringValue: '' }, size: { stringValue: '20ft' }, type: { stringValue: 'standard' }, status: { stringValue: 'active' },
        pol: { stringValue: '' }, pod: { stringValue: '' }, eta: { stringValue: '' }, blNumber: { stringValue: '' }, currentLocation: { stringValue: '' }
      });
      setShowContainerModal(false);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const deleteContainer = async (containerId) => {
    try {
      await firebaseAPI.deleteContainer(containerId);
      setContainers(containers.filter(c => c.id !== containerId));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const addCustomer = async () => {
    if (!customerForm.customerId.stringValue || !customerForm.customerName.stringValue) {
      alert('Fill Customer ID and Name');
      return;
    }
    try {
      await firebaseAPI.addCustomer(customerForm);
      const updatedCustomers = await firebaseAPI.getCustomers();
      setCustomers(updatedCustomers);
      setCustomerForm({ customerId: { stringValue: '' }, customerName: { stringValue: '' }, email: { stringValue: '' }, phone: { stringValue: '' }, country: { stringValue: '' } });
      setShowCustomerModal(false);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      await firebaseAPI.deleteCustomer(customerId);
      setCustomers(customers.filter(c => c.id !== customerId));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const addLead = async () => {
    if (!leadForm.leadId.stringValue || !leadForm.companyName.stringValue) {
      alert('Fill Lead ID and Company Name');
      return;
    }
    try {
      await firebaseAPI.addLead(leadForm);
      const updatedLeads = await firebaseAPI.getLeads();
      setLeads(updatedLeads);
      setLeadForm({ leadId: { stringValue: '' }, companyName: { stringValue: '' }, contactPerson: { stringValue: '' }, email: { stringValue: '' }, phone: { stringValue: '' }, status: { stringValue: 'new' } });
      setShowLeadModal(false);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const deleteLead = async (leadId) => {
    try {
      await firebaseAPI.deleteLead(leadId);
      setLeads(leads.filter(l => l.id !== leadId));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const addAccount = async () => {
    if (!accountForm.accountId.stringValue || !accountForm.accountName.stringValue) {
      alert('Fill Account ID and Name');
      return;
    }
    try {
      await firebaseAPI.addAccount(accountForm);
      const updatedAccounts = await firebaseAPI.getAccounts();
      setAccounts(updatedAccounts);
      setAccountForm({ accountId: { stringValue: '' }, accountName: { stringValue: '' }, customer: { stringValue: '' }, balance: { doubleValue: 0 }, status: { stringValue: 'active' } });
      setShowAccountModal(false);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      await firebaseAPI.deleteAccount(accountId);
      setAccounts(accounts.filter(a => a.id !== accountId));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0f172a, #1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', background: '#1e293b', padding: '40px', borderRadius: '8px', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', textAlign: 'center', margin: '0 0 8px 0' }}>Atlantic Gateway</h1>
          <p style={{ color: '#cbd5e1', textAlign: 'center', margin: '0 0 32px 0' }}>Shipping & Logistics CRM</p>
          
          <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }} />
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>Login</button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #334155' }}>
            <p style={{ color: '#cbd5e1', fontSize: '12px', margin: '0 0 8px 0' }}><strong>Demo:</strong></p>
            <p style={{ color: '#94a3b8', fontSize: '11px', margin: '0' }}>admin@atlanticgateway.com / admin123</p>
            <p style={{ color: '#94a3b8', fontSize: '11px', margin: '0' }}>staff@atlanticgateway.com / staff123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0f172a', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '256px', background: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ margin: '0 0 30px 0', color: 'white', fontSize: '20px' }}>AG CRM</h2>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['dashboard', 'jobs', 'containers', 'customers', 'leads', 'accounts'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 16px', background: tab === t ? '#2563eb' : 'transparent', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', textTransform: 'capitalize' }}>
              {t}
            </button>
          ))}
        </div>
        <button onClick={() => setUser(null)} style={{ padding: '12px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', textTransform: 'capitalize' }}>{tab} {loading && '(Loading...)'}</h1>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{user.name}</p>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px', textTransform: 'capitalize' }}>{user.role}</p>
          </div>
        </div>

        <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          {tab === 'dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[{ label: 'Total Jobs', value: jobs.length }, { label: 'Containers', value: containers.length }, { label: 'Customers', value: customers.length }, { label: 'Active Leads', value: leads.length }].map((stat, i) => (
                <div key={i} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <p style={{ color: '#94a3b8', margin: '0 0 12px 0', fontSize: '14px' }}>{stat.label}</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', margin: 0 }}>{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'jobs' && (
            <div>
              <button onClick={() => setShowJobModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>+ Add Job</button>
              {jobs.length === 0 ? <p style={{ color: '#94a3b8' }}>No jobs</p> : jobs.map(job => (
                <div key={job.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{job.jobName?.stringValue || job.jobName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {job.jobId?.stringValue || job.jobId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteJob(job.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showJobModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add Job</h2>
                    <input type="text" placeholder="Job ID" value={jobForm.jobId.stringValue} onChange={(e) => setJobForm({...jobForm, jobId: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Job Name" value={jobForm.jobName.stringValue} onChange={(e) => setJobForm({...jobForm, jobName: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer" value={jobForm.customer.stringValue} onChange={(e) => setJobForm({...jobForm, customer: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Assigned To" value={jobForm.assignedTo.stringValue} onChange={(e) => setJobForm({...jobForm, assignedTo: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={addJob} style={{ flex: 1, padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create</button>
                      <button onClick={() => setShowJobModal(false)} style={{ flex: 1, padding: '10px', background: '#475569', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'containers' && (
            <div>
              <button onClick={() => setShowContainerModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>+ Add Container</button>
              {containers.length === 0 ? <p style={{ color: '#94a3b8' }}>No containers</p> : containers.map(container => (
                <div key={container.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{container.containerName?.stringValue || container.containerName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {container.containerId?.stringValue || container.containerId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteContainer(container.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showContainerModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155', maxHeight: '90vh', overflow: 'auto' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add Container</h2>
                    <input type="text" placeholder="Container ID" value={containerForm.containerId.stringValue} onChange={(e) => setContainerForm({...containerForm, containerId: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Container Name" value={containerForm.containerName.stringValue} onChange={(e) => setContainerForm({...containerForm, containerName: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="POL" value={containerForm.pol.stringValue} onChange={(e) => setContainerForm({...containerForm, pol: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="POD" value={containerForm.pod.stringValue} onChange={(e) => setContainerForm({...containerForm, pod: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Current Location" value={containerForm.currentLocation.stringValue} onChange={(e) => setContainerForm({...containerForm, currentLocation: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={addContainer} style={{ flex: 1, padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create</button>
                      <button onClick={() => setShowContainerModal(false)} style={{ flex: 1, padding: '10px', background: '#475569', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'customers' && (
            <div>
              <button onClick={() => setShowCustomerModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>+ Add Customer</button>
              {customers.length === 0 ? <p style={{ color: '#94a3b8' }}>No customers</p> : customers.map(customer => (
                <div key={customer.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{customer.customerName?.stringValue || customer.customerName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {customer.customerId?.stringValue || customer.customerId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteCustomer(customer.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showCustomerModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add Customer</h2>
                    <input type="text" placeholder="Customer ID" value={customerForm.customerId.stringValue} onChange={(e) => setCustomerForm({...customerForm, customerId: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer Name" value={customerForm.customerName.stringValue} onChange={(e) => setCustomerForm({...customerForm, customerName: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="email" placeholder="Email" value={customerForm.email.stringValue} onChange={(e) => setCustomerForm({...customerForm, email: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="tel" placeholder="Phone" value={customerForm.phone.stringValue} onChange={(e) => setCustomerForm({...customerForm, phone: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={addCustomer} style={{ flex: 1, padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create</button>
                      <button onClick={() => setShowCustomerModal(false)} style={{ flex: 1, padding: '10px', background: '#475569', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'leads' && (
            <div>
              <button onClick={() => setShowLeadModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>+ Add Lead</button>
              {leads.length === 0 ? <p style={{ color: '#94a3b8' }}>No leads</p> : leads.map(lead => (
                <div key={lead.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{lead.companyName?.stringValue || lead.companyName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {lead.leadId?.stringValue || lead.leadId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteLead(lead.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showLeadModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add Lead</h2>
                    <input type="text" placeholder="Lead ID" value={leadForm.leadId.stringValue} onChange={(e) => setLeadForm({...leadForm, leadId: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Company Name" value={leadForm.companyName.stringValue} onChange={(e) => setLeadForm({...leadForm, companyName: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Contact Person" value={leadForm.contactPerson.stringValue} onChange={(e) => setLeadForm({...leadForm, contactPerson: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={addLead} style={{ flex: 1, padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create</button>
                      <button onClick={() => setShowLeadModal(false)} style={{ flex: 1, padding: '10px', background: '#475569', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'accounts' && (
            <div>
              <button onClick={() => setShowAccountModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>+ Add Account</button>
              {accounts.length === 0 ? <p style={{ color: '#94a3b8' }}>No accounts</p> : accounts.map(account => (
                <div key={account.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{account.accountName?.stringValue || account.accountName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {account.accountId?.stringValue || account.accountId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteAccount(account.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showAccountModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add Account</h2>
                    <input type="text" placeholder="Account ID" value={accountForm.accountId.stringValue} onChange={(e) => setAccountForm({...accountForm, accountId: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Account Name" value={accountForm.accountName.stringValue} onChange={(e) => setAccountForm({...accountForm, accountName: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer" value={accountForm.customer.stringValue} onChange={(e) => setAccountForm({...accountForm, customer: { stringValue: e.target.value }})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={addAccount} style={{ flex: 1, padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create</button>
                      <button onClick={() => setShowAccountModal(false)} style={{ flex: 1, padding: '10px', background: '#475569', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
