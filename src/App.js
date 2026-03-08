import React, { useState, useEffect } from 'react';

// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyDEWoN5s2YXe68Onra-ZCiIPd46oTY7gYQ",
  authDomain: "atlantic-gateway-crm.firebaseapp.com",
  projectId: "atlantic-gateway-crm",
  storageBucket: "atlantic-gateway-crm.firebasestorage.app",
  messagingSenderId: "645062832562",
  appId: "1:645062832562:web:a1e04d2db87fdf6c0834ab"
};

let db = null;

const initFirebase = async () => {
  if (typeof window !== 'undefined' && window.firebase) {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  }
};

// Firestore operations
const firestoreOps = {
  async getJobs() {
    if (!db) return [];
    try {
      const snapshot = await db.collection('jobs').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting jobs:', error);
      return [];
    }
  },

  async addJob(job) {
    if (!db) return;
    try {
      await db.collection('jobs').add(job);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  },

  async deleteJob(jobId) {
    if (!db) return;
    try {
      await db.collection('jobs').doc(jobId).delete();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  },

  async getContainers() {
    if (!db) return [];
    try {
      const snapshot = await db.collection('containers').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting containers:', error);
      return [];
    }
  },

  async addContainer(container) {
    if (!db) return;
    try {
      await db.collection('containers').add(container);
    } catch (error) {
      console.error('Error adding container:', error);
    }
  },

  async deleteContainer(containerId) {
    if (!db) return;
    try {
      await db.collection('containers').doc(containerId).delete();
    } catch (error) {
      console.error('Error deleting container:', error);
    }
  },

  async getCustomers() {
    if (!db) return [];
    try {
      const snapshot = await db.collection('customers').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting customers:', error);
      return [];
    }
  },

  async addCustomer(customer) {
    if (!db) return;
    try {
      await db.collection('customers').add(customer);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  },

  async deleteCustomer(customerId) {
    if (!db) return;
    try {
      await db.collection('customers').doc(customerId).delete();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  },

  async getLeads() {
    if (!db) return [];
    try {
      const snapshot = await db.collection('leads').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting leads:', error);
      return [];
    }
  },

  async addLead(lead) {
    if (!db) return;
    try {
      await db.collection('leads').add(lead);
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  },

  async deleteLead(leadId) {
    if (!db) return;
    try {
      await db.collection('leads').doc(leadId).delete();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  },

  async getAccounts() {
    if (!db) return [];
    try {
      const snapshot = await db.collection('accounts').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting accounts:', error);
      return [];
    }
  },

  async addAccount(account) {
    if (!db) return;
    try {
      await db.collection('accounts').add(account);
    } catch (error) {
      console.error('Error adding account:', error);
    }
  },

  async deleteAccount(accountId) {
    if (!db) return;
    try {
      await db.collection('accounts').doc(accountId).delete();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  }
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
    initFirebase();
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const jobsData = await firestoreOps.getJobs();
    const containersData = await firestoreOps.getContainers();
    const customersData = await firestoreOps.getCustomers();
    const leadsData = await firestoreOps.getLeads();
    const accountsData = await firestoreOps.getAccounts();
    
    setJobs(jobsData);
    setContainers(containersData);
    setCustomers(customersData);
    setLeads(leadsData);
    setAccounts(accountsData);
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

  // Jobs functions
  const addJob = async () => {
    if (jobForm.jobId && jobForm.jobName) {
      await firestoreOps.addJob(jobForm);
      const updatedJobs = await firestoreOps.getJobs();
      setJobs(updatedJobs);
      setJobForm({ jobId: '', jobName: '', customer: '', status: 'active', assignedTo: '' });
      setShowJobModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteJob = async (jobId) => {
    await firestoreOps.deleteJob(jobId);
    const updatedJobs = await firestoreOps.getJobs();
    setJobs(updatedJobs);
  };

  // Containers functions
  const addContainer = async () => {
    if (containerForm.containerId && containerForm.containerName) {
      await firestoreOps.addContainer(containerForm);
      const updatedContainers = await firestoreOps.getContainers();
      setContainers(updatedContainers);
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

  const deleteContainer = async (containerId) => {
    await firestoreOps.deleteContainer(containerId);
    const updatedContainers = await firestoreOps.getContainers();
    setContainers(updatedContainers);
  };

  // Customers functions
  const addCustomer = async () => {
    if (customerForm.customerId && customerForm.customerName) {
      await firestoreOps.addCustomer(customerForm);
      const updatedCustomers = await firestoreOps.getCustomers();
      setCustomers(updatedCustomers);
      setCustomerForm({ customerId: '', customerName: '', email: '', phone: '', address: '', country: '' });
      setShowCustomerModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteCustomer = async (customerId) => {
    await firestoreOps.deleteCustomer(customerId);
    const updatedCustomers = await firestoreOps.getCustomers();
    setCustomers(updatedCustomers);
  };

  // Leads functions
  const addLead = async () => {
    if (leadForm.leadId && leadForm.companyName) {
      await firestoreOps.addLead(leadForm);
      const updatedLeads = await firestoreOps.getLeads();
      setLeads(updatedLeads);
      setLeadForm({ leadId: '', companyName: '', contactPerson: '', email: '', phone: '', status: 'new', value: '' });
      setShowLeadModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteLead = async (leadId) => {
    await firestoreOps.deleteLead(leadId);
    const updatedLeads = await firestoreOps.getLeads();
    setLeads(updatedLeads);
  };

  // Accounts functions
  const addAccount = async () => {
    if (accountForm.accountId && accountForm.accountName) {
      await firestoreOps.addAccount(accountForm);
      const updatedAccounts = await firestoreOps.getAccounts();
      setAccounts(updatedAccounts);
      setAccountForm({ accountId: '', accountName: '', customer: '', balance: 0, status: 'active' });
      setShowAccountModal(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteAccount = async (accountId) => {
    await firestoreOps.deleteAccount(accountId);
    const updatedAccounts = await firestoreOps.getAccounts();
    setAccounts(updatedAccounts);
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
                  <div key={job.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{job.jobName}</h3>
                        <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px' }}>ID: {job.jobId}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Customer: {job.customer}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Assigned to: {job.assignedTo}</p>
                        <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>Status: <span style={{ color: job.status === 'active' ? '#10b981' : '#ef4444' }}>{job.status}</span></p>
                      </div>
                      {user.role === 'admin' && (
                        <button onClick={() => deleteJob(job.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
                  <div key={container.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
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
                        <button onClick={() => deleteContainer(container.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
                  <div key={customer.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{customer.customerName}</h3>
                        <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px' }}>ID: {customer.customerId}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Email: {customer.email}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Phone: {customer.phone}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Country: {customer.country}</p>
                      </div>
                      {user.role === 'admin' && (
                        <button onClick={() => deleteCustomer(customer.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
                  <div key={lead.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
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
                        <button onClick={() => deleteLead(lead.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
                  <div key={account.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{account.accountName}</h3>
                        <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px' }}>ID: {account.accountId}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Customer: {account.customer}</p>
                        <p style={{ color: '#cbd5e1', margin: '0 0 4px 0', fontSize: '14px' }}>Balance: ${account.balance.toFixed(2)}</p>
                        <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>Status: <span style={{ color: account.status === 'active' ? '#10b981' : '#ef4444' }}>{account.status}</span></p>
                      </div>
                      {user.role === 'admin' && (
                        <button onClick={() => deleteAccount(account.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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