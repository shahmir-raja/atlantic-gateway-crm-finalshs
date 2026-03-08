import React, { useState, useEffect } from 'react';

// Simple localStorage for data persistence
const storage = {
  getJobs: () => JSON.parse(localStorage.getItem('jobs') || '[]'),
  setJobs: (jobs) => localStorage.setItem('jobs', JSON.stringify(jobs)),
  getContainers: () => JSON.parse(localStorage.getItem('containers') || '[]'),
  setContainers: (containers) => localStorage.setItem('containers', JSON.stringify(containers))
};

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('admin@atlanticgateway.com');
  const [password, setPassword] = useState('admin123');
  const [tab, setTab] = useState('dashboard');
  
  // Job states
  const [jobs, setJobs] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobForm, setJobForm] = useState({ jobId: '', jobName: '', customer: '', status: 'active', assignedTo: '' });
  
  // Container states
  const [containers, setContainers] = useState([]);
  const [showContainerModal, setShowContainerModal] = useState(false);
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

  // Load data on mount
  useEffect(() => {
    setJobs(storage.getJobs());
    setContainers(storage.getContainers());
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
                { label: 'Customers', value: 0 },
                { label: 'Active Leads', value: 0 }
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
                    <input type="text" placeholder="Assigned To (Person Name)" value={jobForm.assignedTo} onChange={(e) => setJobForm({...jobForm, assignedTo: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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
                    <input type="text" placeholder="POL (Port of Loading)" value={containerForm.pol} onChange={(e) => setContainerForm({...containerForm, pol: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="POD (Port of Discharge)" value={containerForm.pod} onChange={(e) => setContainerForm({...containerForm, pod: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#334155', color: 'white', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
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

          {tab === 'customers' && <p style={{ color: '#94a3b8' }}>Customer management coming soon...</p>}
          {tab === 'leads' && <p style={{ color: '#94a3b8' }}>Lead tracking coming soon...</p>}
          {tab === 'accounts' && <p style={{ color: '#94a3b8' }}>Account management coming soon...</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
