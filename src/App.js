import React, { useState, useEffect } from 'react';

// Firebase will be loaded from CDN in index.html
let db = null;

// Initialize Firebase when it loads
const initializeFirebase = async () => {
  if (window.firebase && !db) {
    try {
      // Initialize Firebase app if not already done
      if (!window.firebase.apps || window.firebase.apps.length === 0) {
        window.firebase.initializeApp({
          apiKey: "AIzaSyDEWoN5s2YXe68Onra-ZCiIPd46oTY7gYQ",
          authDomain: "atlantic-gateway-crm.firebaseapp.com",
          projectId: "atlantic-gateway-crm",
          storageBucket: "atlantic-gateway-crm.firebasestorage.app",
          messagingSenderId: "645062832562",
          appId: "1:645062832562:web:a1e04d2db87fdf6c0834ab"
        });
      }
      db = window.firebase.firestore();
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('admin@atlanticgateway.com');
  const [password, setPassword] = useState('admin123');
  const [tab, setTab] = useState('dashboard');
  
  const [jobs, setJobs] = useState([]);
  const [containers, setContainers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [showJobModal, setShowJobModal] = useState(false);
  const [showContainerModal, setShowContainerModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  
  const [jobForm, setJobForm] = useState({ jobId: '', jobName: '', customer: '', status: 'active', assignedTo: '' });
  const [containerForm, setContainerForm] = useState({
    containerId: '', containerName: '', size: '20ft', type: 'standard', status: 'active',
    inUseStatus: 'available', importVessel: '', eta: '', pol: '', pod: '', freeDays: 0,
    blNumber: '', dischargeDate: '', doIssueDate: '', gateOutDate: '', emptyReturnDate: '',
    importCountry: '', currentLocation: '', agent: '', remarks: ''
  });
  const [customerForm, setCustomerForm] = useState({ customerId: '', customerName: '', email: '', phone: '', address: '', country: '' });
  const [leadForm, setLeadForm] = useState({ leadId: '', companyName: '', contactPerson: '', email: '', phone: '', status: 'new', value: '' });
  const [accountForm, setAccountForm] = useState({ accountId: '', accountName: '', customer: '', balance: 0, status: 'active' });

  // Load data from Firebase
  useEffect(() => {
    initializeFirebase();
    const loadData = async () => {
      setLoading(true);
      if (db) {
        try {
          const jobsSnapshot = await db.collection('jobs').get();
          setJobs(jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          
          const containersSnapshot = await db.collection('containers').get();
          setContainers(containersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          
          const customersSnapshot = await db.collection('customers').get();
          setCustomers(customersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          
          const leadsSnapshot = await db.collection('leads').get();
          setLeads(leadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          
          const accountsSnapshot = await db.collection('accounts').get();
          setAccounts(accountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
      setLoading(false);
    };
    
    setTimeout(loadData, 500); // Wait for Firebase to load
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

  const addJob = async () => {
    if (!jobForm.jobId || !jobForm.jobName) {
      alert('Please fill in Job ID and Job Name');
      return;
    }
    if (!db) {
      alert('Database not connected');
      return;
    }
    try {
      await db.collection('jobs').add(jobForm);
      const snapshot = await db.collection('jobs').get();
      setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setJobForm({ jobId: '', jobName: '', customer: '', status: 'active', assignedTo: '' });
      setShowJobModal(false);
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Error adding job: ' + error.message);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await db.collection('jobs').doc(jobId).delete();
      setJobs(jobs.filter(j => j.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const addContainer = async () => {
    if (!containerForm.containerId || !containerForm.containerName) {
      alert('Please fill in Container ID and Container Name');
      return;
    }
    if (!db) {
      alert('Database not connected');
      return;
    }
    try {
      await db.collection('containers').add(containerForm);
      const snapshot = await db.collection('containers').get();
      setContainers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setContainerForm({
        containerId: '', containerName: '', size: '20ft', type: 'standard', status: 'active',
        inUseStatus: 'available', importVessel: '', eta: '', pol: '', pod: '', freeDays: 0,
        blNumber: '', dischargeDate: '', doIssueDate: '', gateOutDate: '', emptyReturnDate: '',
        importCountry: '', currentLocation: '', agent: '', remarks: ''
      });
      setShowContainerModal(false);
    } catch (error) {
      console.error('Error adding container:', error);
      alert('Error adding container: ' + error.message);
    }
  };

  const deleteContainer = async (containerId) => {
    try {
      await db.collection('containers').doc(containerId).delete();
      setContainers(containers.filter(c => c.id !== containerId));
    } catch (error) {
      console.error('Error deleting container:', error);
    }
  };

  const addCustomer = async () => {
    if (!customerForm.customerId || !customerForm.customerName) {
      alert('Please fill in Customer ID and Customer Name');
      return;
    }
    if (!db) {
      alert('Database not connected');
      return;
    }
    try {
      await db.collection('customers').add(customerForm);
      const snapshot = await db.collection('customers').get();
      setCustomers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setCustomerForm({ customerId: '', customerName: '', email: '', phone: '', address: '', country: '' });
      setShowCustomerModal(false);
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Error adding customer: ' + error.message);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      await db.collection('customers').doc(customerId).delete();
      setCustomers(customers.filter(c => c.id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const addLead = async () => {
    if (!leadForm.leadId || !leadForm.companyName) {
      alert('Please fill in Lead ID and Company Name');
      return;
    }
    if (!db) {
      alert('Database not connected');
      return;
    }
    try {
      await db.collection('leads').add(leadForm);
      const snapshot = await db.collection('leads').get();
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLeadForm({ leadId: '', companyName: '', contactPerson: '', email: '', phone: '', status: 'new', value: '' });
      setShowLeadModal(false);
    } catch (error) {
      console.error('Error adding lead:', error);
      alert('Error adding lead: ' + error.message);
    }
  };

  const deleteLead = async (leadId) => {
    try {
      await db.collection('leads').doc(leadId).delete();
      setLeads(leads.filter(l => l.id !== leadId));
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const addAccount = async () => {
    if (!accountForm.accountId || !accountForm.accountName) {
      alert('Please fill in Account ID and Account Name');
      return;
    }
    if (!db) {
      alert('Database not connected');
      return;
    }
    try {
      await db.collection('accounts').add(accountForm);
      const snapshot = await db.collection('accounts').get();
      setAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setAccountForm({ accountId: '', accountName: '', customer: '', balance: 0, status: 'active' });
      setShowAccountModal(false);
    } catch (error) {
      console.error('Error adding account:', error);
      alert('Error adding account: ' + error.message);
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      await db.collection('accounts').doc(accountId).delete();
      setAccounts(accounts.filter(a => a.id !== accountId));
    } catch (error) {
      console.error('Error deleting account:', error);
    }
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
              <button onClick={() => setShowJobModal(true)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
                + Add Job
              </button>
              {jobs.length === 0 ? <p style={{ color: '#94a3b8' }}>No jobs yet</p> : jobs.map(job => (
                <div key={job.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{job.jobName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {job.jobId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteJob(job.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showJobModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Job</h2>
                    <input type="text" placeholder="Job ID" value={jobForm.jobId} onChange={(e) => setJobForm({...jobForm, jobId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Job Name" value={jobForm.jobName} onChange={(e) => setJobForm({...jobForm, jobName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer" value={jobForm.customer} onChange={(e) => setJobForm({...jobForm, customer: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Assigned To" value={jobForm.assignedTo} onChange={(e) => setJobForm({...jobForm, assignedTo: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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
              {containers.length === 0 ? <p style={{ color: '#94a3b8' }}>No containers yet</p> : containers.map(container => (
                <div key={container.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{container.containerName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {container.containerId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteContainer(container.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showContainerModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155', maxHeight: '90vh', overflow: 'auto' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Container</h2>
                    <input type="text" placeholder="Container ID" value={containerForm.containerId} onChange={(e) => setContainerForm({...containerForm, containerId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Container Name" value={containerForm.containerName} onChange={(e) => setContainerForm({...containerForm, containerName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="POL" value={containerForm.pol} onChange={(e) => setContainerForm({...containerForm, pol: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="POD" value={containerForm.pod} onChange={(e) => setContainerForm({...containerForm, pod: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="date" placeholder="ETA" value={containerForm.eta} onChange={(e) => setContainerForm({...containerForm, eta: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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
              {customers.length === 0 ? <p style={{ color: '#94a3b8' }}>No customers yet</p> : customers.map(customer => (
                <div key={customer.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{customer.customerName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {customer.customerId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteCustomer(customer.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showCustomerModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Customer</h2>
                    <input type="text" placeholder="Customer ID" value={customerForm.customerId} onChange={(e) => setCustomerForm({...customerForm, customerId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer Name" value={customerForm.customerName} onChange={(e) => setCustomerForm({...customerForm, customerName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="email" placeholder="Email" value={customerForm.email} onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="tel" placeholder="Phone" value={customerForm.phone} onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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
              {leads.length === 0 ? <p style={{ color: '#94a3b8' }}>No leads yet</p> : leads.map(lead => (
                <div key={lead.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{lead.companyName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {lead.leadId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteLead(lead.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showLeadModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Lead</h2>
                    <input type="text" placeholder="Lead ID" value={leadForm.leadId} onChange={(e) => setLeadForm({...leadForm, leadId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Company Name" value={leadForm.companyName} onChange={(e) => setLeadForm({...leadForm, companyName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Contact Person" value={leadForm.contactPerson} onChange={(e) => setLeadForm({...leadForm, contactPerson: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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
              {accounts.length === 0 ? <p style={{ color: '#94a3b8' }}>No accounts yet</p> : accounts.map(account => (
                <div key={account.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div><h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{account.accountName}</h3><p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>ID: {account.accountId}</p></div>
                  {user.role === 'admin' && <button onClick={() => deleteAccount(account.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>}
                </div>
              ))}
              {showAccountModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                  <div style={{ background: '#1e293b', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #334155' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: 'white' }}>Add New Account</h2>
                    <input type="text" placeholder="Account ID" value={accountForm.accountId} onChange={(e) => setAccountForm({...accountForm, accountId: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Account Name" value={accountForm.accountName} onChange={(e) => setAccountForm({...accountForm, accountName: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="Customer" value={accountForm.customer} onChange={(e) => setAccountForm({...accountForm, customer: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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
