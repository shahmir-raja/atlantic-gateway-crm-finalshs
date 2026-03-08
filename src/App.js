import React, { useState, useEffect } from 'react';

// Simple localStorage for data persistence
const storage = {
  getJobs: () => JSON.parse(localStorage.getItem('jobs') || '[]'),
  setJobs: (jobs) => localStorage.setItem('jobs', JSON.stringify(jobs)),
  getContainers: () => JSON.parse(localStorage.getItem('containers') || '[]'),
  setContainers: (containers) => localStorage.setItem('containers', JSON.stringify(containers)),
  getCustomers: () => JSON.parse(localStorage.getItem('customers') || '[]'),
  setCustomers: (customers) => localStorage.setItem('customers', JSON.stringify(customers)),
  getLeads: () => JSON.parse(localStorage.getItem('leads') || '[]'),
  setLeads: (leads) => localStorage.setItem('leads', JSON.stringify(leads)),
  getAccounts: () => JSON.parse(localStorage.getItem('accounts') || '[]'),
  setAccounts: (accounts) => localStorage.setItem('accounts', JSON.stringify(accounts))
};

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('admin@atlanticgateway.com');
  const [password, setPassword] = useState('admin123');
  const [tab, setTab] = useState('dashboard');
  
  // All data states
  const [jobs, setJobs] = useState([]);
  const [containers, setContainers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [accounts, setAccounts] = useState([]);
  
  // Modal states
  const [showJobModal, setShowJobModal] = useState(false);
  const [showContainerModal, setShowContainerModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  
  // Form states
  const [jobForm, setJobForm] = useState({ jobId: '', jobName: '', customer: '', status: 'active', assignedTo: '' });
  const [containerForm, setContainerForm] = useState({
    containerId: '',
    containerName: '',
    size: '20ft',
    type: 'standard',
    status: 'active',
    inUseStatus: 'available',
    importVessel: '',
    eta: '',
    pol: '',
    pod: '',
    freeDays: 0,
    blNumber: '',
    dischargeDate: '',
    doIssueDate: '',
    gateOutDate: '',
    emptyReturnDate: '',
    importCountry: '',
    currentLocation: '',
    agent: '',
    remarks: ''
  });
  const [customerForm, setCustomerForm] = useState({ customerId: '', customerName: '', email: '', phone: '', address: '', country: '' });
  const [leadForm, setLeadForm] = useState({ leadId: '', companyName: '', contactPerson: '', email: '', phone: '', status: 'new', value: '' });
  const [accountForm, setAccountForm] = useState({ accountId: '', accountName: '', customer: '', balance: 0, status: 'active' });

  // Load data on mount
  useEffect(() => {
    setJobs(storage.getJobs());
    setContainers(storage.getContainers());
    setCustomers(storage.getCustomers());
    setLeads(storage.getLeads());
    setAccounts(storage.getAccounts());
  }, []);

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

  // Jobs functions
  const addJob = () => {
    if (jobForm.jobId && jobForm.jobName) {
      const newJobs = [...jobs, jobForm];
      setJobs(newJobs);
      storage.setJobs(newJobs);
      setJobForm({ jobId: '', jobName: '', customer: '', status: 'active', assignedTo: '' });
      setShowJobModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteJob = (jobId) => {
    const newJobs = jobs.filter(j => j.jobId !== jobId);
    setJobs(newJobs);
    storage.setJobs(newJobs);
  };

  // Containers functions
  const addContainer = () => {
    if (containerForm.containerId && containerForm.containerName) {
      const newContainers = [...containers, containerForm];
      setContainers(newContainers);
      storage.setContainers(newContainers);
      setContainerForm({
        containerId: '',
        containerName: '',
        size: '20ft',
        type: 'standard',
        status: 'active',
        inUseStatus: 'available',
        importVessel: '',
        eta: '',
        pol: '',
        pod: '',
        freeDays: 0,
        blNumber: '',
        dischargeDate: '',
        doIssueDate: '',
        gateOutDate: '',
        emptyReturnDate: '',
        importCountry: '',
        currentLocation: '',
        agent: '',
        remarks: ''
      });
      setShowContainerModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteContainer = (containerId) => {
    const newContainers = containers.filter(c => c.containerId !== containerId);
    setContainers(newContainers);
    storage.setContainers(newContainers);
  };

  // Customers functions
  const addCustomer = () => {
    if (customerForm.customerId && customerForm.customerName) {
      const newCustomers = [...customers, customerForm];
      setCustomers(newCustomers);
      storage.setCustomers(newCustomers);
      setCustomerForm({ customerId: '', customerName: '', email: '', phone: '', address: '', country: '' });
      setShowCustomerModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteCustomer = (customerId) => {
    const newCustomers = customers.filter(c => c.customerId !== customerId);
    setCustomers(newCustomers);
    storage.setCustomers(newCustomers);
  };

  // Leads functions
  const addLead = () => {
    if (leadForm.leadId && leadForm.companyName) {
      const newLeads = [...leads, leadForm];
      setLeads(newLeads);
      storage.setLeads(newLeads);
      setLeadForm({ leadId: '', companyName: '', contactPerson: '', email: '', phone: '', status: 'new', value: '' });
      setShowLeadModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteLead = (leadId) => {
    const newLeads = leads.filter(l => l.leadId !== leadId);
    setLeads(newLeads);
    storage.setLeads(newLeads);
  };

  // Accounts functions
  const addAccount = () => {
    if (accountForm.accountId && accountForm.accountName) {
      const newAccounts = [...accounts, accountForm];
      setAccounts(newAccounts);
      storage.setAccounts(newAccounts);
      setAccountForm({ accountId: '', accountName: '', customer: '', balance: 0, status: 'active' });
      setShowAccountModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteAccount = (accountId) => {
    const newAccounts = accounts.filter(a => a.accountId !== accountId);
    setAccounts(newAccounts);
    storage.setAccounts(newAccounts);
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0f172a, #1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', background: '#1e293b', padding: '40px', borderRadius: '8px', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', textAlign: 'center', margin: '0 0 8px 0' }}>Atlantic Gateway</h1>
          <p style={{ color: '#cbd5e1', textAlign: 'center', margin: '0 0 32px 0' }}>Shipping & Logistics CRM</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }}
            />
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              Login
            </button>
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
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '12px 16px',
                background: tab === t ? '#2563eb' : 'transparent',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                textTransform: 'capitalize',
                transition: 'background 0.2s'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <button onClick={() => setUser(null)} style={{ padding: '12px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }}>
          Logout
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', textTransform: 'capitalize' }}>{tab}</h1>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{user.name}</p>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px', textTransform: 'capitalize' }}>{user.role}</p>
          </div>
        </div>

        <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          {tab === 'dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[
                { label: 'Total Jobs', value: jobs.length },
                { label: 'Containers', value: containers.length },
                { label: 'Customers', value: customers.length },
                { label: 'Active Leads', value: leads.length }
              ].map((stat, i) => (
                <div key={i} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <p style={{ color: '#94a3b8', margin: '0 0 12px 0', fontSize: '14px' }}>{stat.label}</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', margin: 0 }}>{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'jobs' && (
            <div>
              <button onClick={() => setShowJobModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
                + Add Job
              </button>
              
              {jobs.length === 0 ? (
                <p style={{ color: '#94a3b8' }}>No jobs yet. Create your first job!</p>
              ) : (
                jobs.map(job => (
                  <div key={job.jobId} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{job.jobName}</h3>
                        <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px' }}>ID: {job.jobId}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Customer: {job.customer}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Assigned to: {job.assignedTo}</p>
                        <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>Status: <span style={{ color: job.status === 'active' ? '#10b981' : '#ef4444' }}>{job.status}</span></p>
                      </div>
                      {user.role === 'admin' && (
                        <button onClick={() => deleteJob(job.jobId)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}

              {showJobModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155', maxHeight: '90vh', overflow: 'auto' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Job</h2>
                    <input type="text" placeholder="Job ID" value={jobForm.jobId} onChange={(e) => setJobForm({...jobForm, jobId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Job Name" value={jobForm.jobName} onChange={(e) => setJobForm({...jobForm, jobName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer" value={jobForm.customer} onChange={(e) => setJobForm({...jobForm, customer: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Assigned To" value={jobForm.assignedTo} onChange={(e) => setJobForm({...jobForm, assignedTo: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <select value={jobForm.status} onChange={(e) => setJobForm({...jobForm, status: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Completed</option>
                    </select>
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
              <button onClick={() => setShowContainerModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
                + Add Container
              </button>
              
              {containers.length === 0 ? (
                <p style={{ color: '#94a3b8' }}>No containers yet. Add your first container!</p>
              ) : (
                containers.map(container => (
                  <div key={container.containerId} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{container.containerName}</h3>
                        <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px' }}>ID: {container.containerId}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                          <p style={{ color: '#cbd5e1', margin: 0 }}>Size: {container.size}</p>
                          <p style={{ color: '#cbd5e1', margin: 0 }}>Type: {container.type}</p>
                          <p style={{ color: '#cbd5e1', margin: 0 }}>POL: {container.pol}</p>
                          <p style={{ color: '#cbd5e1', margin: 0 }}>POD: {container.pod}</p>
                          <p style={{ color: '#cbd5e1', margin: 0 }}>ETA: {container.eta}</p>
                          <p style={{ color: '#cbd5e1', margin: 0 }}>BL: {container.blNumber}</p>
                          <p style={{ color: '#cbd5e1', margin: 0 }}>Location: {container.currentLocation}</p>
                          <p style={{ color: '#cbd5e1', margin: 0 }}>Status: {container.status}</p>
                        </div>
                      </div>
                      {user.role === 'admin' && (
                        <button onClick={() => deleteContainer(container.containerId)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}

              {showContainerModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '600px', border: '1px solid #334155', maxHeight: '90vh', overflow: 'auto' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Container</h2>
                    <input type="text" placeholder="Container ID" value={containerForm.containerId} onChange={(e) => setContainerForm({...containerForm, containerId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Container Name" value={containerForm.containerName} onChange={(e) => setContainerForm({...containerForm, containerName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <select value={containerForm.size} onChange={(e) => setContainerForm({...containerForm, size: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }}>
                      <option value="20ft">20ft</option>
                      <option value="40ft">40ft</option>
                      <option value="45ft">45ft</option>
                    </select>
                    <input type="text" placeholder="POL" value={containerForm.pol} onChange={(e) => setContainerForm({...containerForm, pol: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="POD" value={containerForm.pod} onChange={(e) => setContainerForm({...containerForm, pod: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="date" placeholder="ETA" value={containerForm.eta} onChange={(e) => setContainerForm({...containerForm, eta: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="number" placeholder="Free Days" value={containerForm.freeDays} onChange={(e) => setContainerForm({...containerForm, freeDays: parseInt(e.target.value) || 0})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="BL Number" value={containerForm.blNumber} onChange={(e) => setContainerForm({...containerForm, blNumber: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Current Location" value={containerForm.currentLocation} onChange={(e) => setContainerForm({...containerForm, currentLocation: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Agent/Customer" value={containerForm.agent} onChange={(e) => setContainerForm({...containerForm, agent: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <textarea placeholder="Remarks" value={containerForm.remarks} onChange={(e) => setContainerForm({...containerForm, remarks: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box', minHeight: '80px' }} />
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
              <button onClick={() => setShowCustomerModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
                + Add Customer
              </button>
              
              {customers.length === 0 ? (
                <p style={{ color: '#94a3b8' }}>No customers yet. Add your first customer!</p>
              ) : (
                customers.map(customer => (
                  <div key={customer.customerId} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{customer.customerName}</h3>
                        <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px' }}>ID: {customer.customerId}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Email: {customer.email}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Phone: {customer.phone}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Country: {customer.country}</p>
                      </div>
                      {user.role === 'admin' && (
                        <button onClick={() => deleteCustomer(customer.customerId)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}

              {showCustomerModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155', maxHeight: '90vh', overflow: 'auto' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Customer</h2>
                    <input type="text" placeholder="Customer ID" value={customerForm.customerId} onChange={(e) => setCustomerForm({...customerForm, customerId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer Name" value={customerForm.customerName} onChange={(e) => setCustomerForm({...customerForm, customerName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="email" placeholder="Email" value={customerForm.email} onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="tel" placeholder="Phone" value={customerForm.phone} onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Address" value={customerForm.address} onChange={(e) => setCustomerForm({...customerForm, address: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Country" value={customerForm.country} onChange={(e) => setCustomerForm({...customerForm, country: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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
              <button onClick={() => setShowLeadModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
                + Add Lead
              </button>
              
              {leads.length === 0 ? (
                <p style={{ color: '#94a3b8' }}>No leads yet. Add your first lead!</p>
              ) : (
                leads.map(lead => (
                  <div key={lead.leadId} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{lead.companyName}</h3>
                        <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px' }}>ID: {lead.leadId}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Contact: {lead.contactPerson}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Email: {lead.email}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Status: <span style={{ color: lead.status === 'new' ? '#f59e0b' : lead.status === 'contacted' ? '#3b82f6' : '#10b981' }}>{lead.status}</span></p>
                        <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>Value: ${lead.value}</p>
                      </div>
                      {user.role === 'admin' && (
                        <button onClick={() => deleteLead(lead.leadId)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}

              {showLeadModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155', maxHeight: '90vh', overflow: 'auto' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Lead</h2>
                    <input type="text" placeholder="Lead ID" value={leadForm.leadId} onChange={(e) => setLeadForm({...leadForm, leadId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Company Name" value={leadForm.companyName} onChange={(e) => setLeadForm({...leadForm, companyName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Contact Person" value={leadForm.contactPerson} onChange={(e) => setLeadForm({...leadForm, contactPerson: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="email" placeholder="Email" value={leadForm.email} onChange={(e) => setLeadForm({...leadForm, email: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="tel" placeholder="Phone" value={leadForm.phone} onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <select value={leadForm.status} onChange={(e) => setLeadForm({...leadForm, status: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                    </select>
                    <input type="text" placeholder="Potential Value" value={leadForm.value} onChange={(e) => setLeadForm({...leadForm, value: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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
              <button onClick={() => setShowAccountModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
                + Add Account
              </button>
              
              {accounts.length === 0 ? (
                <p style={{ color: '#94a3b8' }}>No accounts yet. Add your first account!</p>
              ) : (
                accounts.map(account => (
                  <div key={account.accountId} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{account.accountName}</h3>
                        <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px' }}>ID: {account.accountId}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Customer: {account.customer}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Balance: ${account.balance.toFixed(2)}</p>
                        <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>Status: <span style={{ color: account.status === 'active' ? '#10b981' : '#ef4444' }}>{account.status}</span></p>
                      </div>
                      {user.role === 'admin' && (
                        <button onClick={() => deleteAccount(account.accountId)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}

              {showAccountModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155', maxHeight: '90vh', overflow: 'auto' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Account</h2>
                    <input type="text" placeholder="Account ID" value={accountForm.accountId} onChange={(e) => setAccountForm({...accountForm, accountId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Account Name" value={accountForm.accountName} onChange={(e) => setAccountForm({...accountForm, accountName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer" value={accountForm.customer} onChange={(e) => setAccountForm({...accountForm, customer: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="number" placeholder="Balance" step="0.01" value={accountForm.balance} onChange={(e) => setAccountForm({...accountForm, balance: parseFloat(e.target.value) || 0})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <select value={accountForm.status} onChange={(e) => setAccountForm({...accountForm, status: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
