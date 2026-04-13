import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const sevColor = { Critical:'#ff4d6d', Major:'#ffb400', Minor:'#00d4aa' };
const staColor = { Open:'#ff4d6d', 'In Progress':'#ffb400', Resolved:'#00d4aa', Closed:'#6b7280' };

const Badge = ({ val, map }) => (
  <span style={{ background:`${map[val]||'#6b7280'}22`, color:map[val]||'#6b7280', padding:'3px 10px', borderRadius:20, fontSize:'.72rem', fontWeight:600 }}>
    {val}
  </span>
);

const lbl = { display:'block', fontSize:'.72rem', color:'#9ca3af', marginBottom:5, textTransform:'uppercase' };

export default function BugList() {
  const nav  = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const auth = { headers: { Authorization: `Bearer ${user?.token}` } };

  const [bugs,    setBugs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [fSev,    setFSev]    = useState('All');
  const [fSta,    setFSta]    = useState('All');
  const [editing, setEditing] = useState(null);
  const [eForm,   setEForm]   = useState({});

  const load = async () => {
    try {
      const { data } = await axios.get('/api/bugs', auth);
      setBugs(data);
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('user'); nav('/login'); }
      else toast.error('Failed to load bugs');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const deleteBug = async (id) => {
    if (!window.confirm('Delete this bug permanently?')) return;
    try {
      await axios.delete(`/api/bugs/${id}`, auth);
      toast.success('Bug deleted');
      setBugs(bugs.filter(b => b._id !== id));
    } catch { toast.error('Delete failed'); }
  };

  const openEdit = (b) => {
    setEditing(b);
    setEForm({ title:b.title, description:b.description, severity:b.severity, status:b.status, project:b.project||'' });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`/api/bugs/${editing._id}`, eForm, auth);
      toast.success('Bug updated!');
      setEditing(null);
      load();
    } catch { toast.error('Update failed'); }
  };

  const roleFiltered = user?.role === "Developer"
  ? bugs.filter(b => b.assignedTo === user?._id)
  : bugs;

const filtered = roleFiltered
  .filter(b => fSev === 'All' || b.severity === fSev)
  .filter(b => fSta === 'All' || b.status === fSta)
  .filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  const selStyle = { padding:'.45rem .8rem', borderRadius:8, fontSize:'.82rem', width:'auto' };

  return (
    <div style={{ padding:'2rem', maxWidth:1300, margin:'0 auto' }}>

      {/* Top bar */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem', marginBottom:'1.5rem' }}>
        <h1 style={{ fontSize:'1.5rem', fontWeight:800 }}>
          All Bugs <span style={{ color:'#6b7280', fontWeight:400, fontSize:'1rem' }}>({filtered.length})</span>
        </h1>
        <div style={{ display:'flex', gap:'.75rem', flexWrap:'wrap', alignItems:'center' }}>
          <input placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{ ...selStyle, width:180 }} />
          <select style={selStyle} value={fSev} onChange={e=>setFSev(e.target.value)}>
            <option value="All">All Severity</option>
            <option>Critical</option><option>Major</option><option>Minor</option>
          </select>
          <select style={selStyle} value={fSta} onChange={e=>setFSta(e.target.value)}>
            <option value="All">All Status</option>
            <option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option>
          </select>
          {(user?.role === "Tester" || user?.role === "Admin") && (
  <button 
    onClick={()=>nav('/create-bug')} 
    style={{ padding:'.5rem 1.2rem', background:'#ff4d6d', color:'#fff', fontSize:'.85rem' }}
  >
    + Report Bug
  </button>
)}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:12, overflow:'hidden' }}>
        {/* Header */}
        <div style={{ display:'grid', gridTemplateColumns:'2.5fr 1fr 1fr 1fr 1.5fr 1fr', gap:'1rem', padding:'12px 1.5rem', background:'#191c25', color:'#6b7280', fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.06em' }}>
          <span>Title</span><span>Severity</span><span>Status</span><span>Project</span><span>Reported By</span><span>Actions</span>
        </div>

        {loading && <p style={{ padding:'2rem', color:'#6b7280', textAlign:'center' }}>Loading bugs...</p>}
        {!loading && filtered.length === 0 && (
          <p style={{ padding:'2rem', color:'#6b7280', textAlign:'center' }}>
            No bugs found. <a href="/create-bug">Report one!</a>
          </p>
        )}

        {filtered.map(b => (
          <div key={b._id} style={{ display:'grid', gridTemplateColumns:'2.5fr 1fr 1fr 1fr 1.5fr 1fr', gap:'1rem', padding:'14px 1.5rem', borderTop:'1px solid #1e2330', fontSize:'.875rem', alignItems:'center' }}>
            <span style={{ fontWeight:500 }}>{b.title}</span>
            <span><Badge val={b.severity} map={sevColor} /></span>
            <span><Badge val={b.status}   map={staColor} /></span>
            <span style={{ color:'#9ca3af', fontSize:'.8rem' }}>{b.project || '—'}</span>
            <span style={{ color:'#9ca3af', fontSize:'.8rem' }}>{b.reportedBy?.name || 'Unknown'}</span>
            <span style={{ display:'flex', gap:6 }}>
              {(user?.role === "Admin" || user?.role === "Developer") && (
  <button 
    onClick={()=>openEdit(b)} 
    style={{ background:'#191c25', color:'#e8eaf0', padding:'4px 10px', border:'1px solid #1e2330', fontSize:'.75rem' }}
  >
    Edit
  </button>
)}
              {(user?.role==='Admin' || b.reportedBy?._id===user?._id) && (
                <button onClick={()=>deleteBug(b._id)} style={{ background:'rgba(255,77,109,.1)', color:'#ff4d6d', padding:'4px 10px', border:'1px solid rgba(255,77,109,.2)', fontSize:'.75rem' }}>Del</button>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div onClick={()=>setEditing(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:'1rem' }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:16, padding:'2rem', width:'100%', maxWidth:500 }}>
            <h3 style={{ fontWeight:800, marginBottom:'1.5rem', fontSize:'1.2rem' }}>Edit Bug</h3>

            <div style={{ marginBottom:'1rem' }}>
              <label style={lbl}>Title</label>
              <input value={eForm.title} onChange={e=>setEForm({...eForm,title:e.target.value})} />
            </div>
            <div style={{ marginBottom:'1rem' }}>
              <label style={lbl}>Description</label>
              <textarea rows={3} value={eForm.description} onChange={e=>setEForm({...eForm,description:e.target.value})} style={{ resize:'vertical' }} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
              <div>
                <label style={lbl}>Severity</label>
                <select value={eForm.severity} onChange={e=>setEForm({...eForm,severity:e.target.value})}>
                  <option>Critical</option><option>Major</option><option>Minor</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Status</label>
                <select value={eForm.status} onChange={e=>setEForm({...eForm,status:e.target.value})}>
                  <option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={lbl}>Project</label>
              <input value={eForm.project} onChange={e=>setEForm({...eForm,project:e.target.value})} />
            </div>

            <div style={{ display:'flex', gap:'.75rem' }}>
              <button onClick={saveEdit} style={{ flex:1, padding:'.75rem', background:'#ff4d6d', color:'#fff' }}>Save Changes</button>
              <button onClick={()=>setEditing(null)} style={{ padding:'.75rem 1.5rem', background:'transparent', color:'#9ca3af', border:'1px solid #1e2330' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
