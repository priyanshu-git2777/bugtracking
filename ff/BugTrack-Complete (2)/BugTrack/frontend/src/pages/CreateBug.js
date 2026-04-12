import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const lbl = { display:'block', fontSize:'.75rem', color:'#9ca3af', marginBottom:5, textTransform:'uppercase', letterSpacing:'.06em' };

export default function CreateBug() {
  const nav  = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const auth = { headers: { Authorization: `Bearer ${user?.token}` } };

  const [form, setForm] = useState({ title:'', description:'', severity:'Minor', project:'', assignedTo:'' });
  const [loading, setLoading] = useState(false);
  const ch = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return toast.error('Title and description are required');
    setLoading(true);
    try {
      await axios.post('/api/bugs', { ...form, assignedTo: form.assignedTo || undefined }, auth);
      toast.success('Bug reported successfully! 🐛');
      nav('/bugs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create bug');
    } finally { setLoading(false); }
  };

  const sevBtn = (val, color) => ({
    flex:1, padding:'.6rem', borderRadius:8, border: form.severity===val ? `2px solid ${color}` : '1px solid #1e2330',
    background: form.severity===val ? `${color}18` : '#191c25',
    color: form.severity===val ? color : '#6b7280', fontSize:'.82rem', fontWeight:600,
  });

  return (
    <div style={{ padding:'2rem', maxWidth:700, margin:'0 auto' }}>
      <h1 style={{ fontSize:'1.5rem', fontWeight:800, marginBottom:4 }}>Report a Bug</h1>
      <p style={{ color:'#6b7280', fontSize:'.85rem', marginBottom:'2rem' }}>Fill in the details to log a new bug into the system.</p>

      <div style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:16, padding:'2rem' }}>
        <form onSubmit={submit}>

          {/* Title */}
          <div style={{ marginBottom:'1.2rem' }}>
            <label style={lbl}>Bug Title *</label>
            <input name="title" placeholder="Short, clear title describing the bug..." value={form.title} onChange={ch} required />
          </div>

          {/* Description */}
          <div style={{ marginBottom:'1.2rem' }}>
            <label style={lbl}>Description *</label>
            <textarea
              name="description" rows={5}
              placeholder="Steps to reproduce, expected vs actual behavior, environment details..."
              value={form.description} onChange={ch} required
              style={{ resize:'vertical' }}
            />
          </div>

          {/* Severity */}
          <div style={{ marginBottom:'1.2rem' }}>
            <label style={lbl}>Severity *</label>
            <div style={{ display:'flex', gap:'.75rem' }}>
              <button type="button" style={sevBtn('Critical','#ff4d6d')} onClick={() => setForm({...form, severity:'Critical'})}>🔴 Critical</button>
              <button type="button" style={sevBtn('Major',   '#ffb400')} onClick={() => setForm({...form, severity:'Major'  })}>🟡 Major</button>
              <button type="button" style={sevBtn('Minor',   '#00d4aa')} onClick={() => setForm({...form, severity:'Minor'  })}>🟢 Minor</button>
            </div>
          </div>

          {/* Project + Assigned */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.5rem' }}>
            <div>
              <label style={lbl}>Project Name</label>
              <input name="project" placeholder="e.g. BugTrack v1.0" value={form.project} onChange={ch} />
            </div>
            <div>
              <label style={lbl}>Assign To (User ID)</label>
              <input name="assignedTo" placeholder="Optional — paste user ID" value={form.assignedTo} onChange={ch} />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display:'flex', gap:'.75rem' }}>
            <button type="button" onClick={() => nav('/bugs')}
              style={{ padding:'.8rem 1.5rem', background:'transparent', color:'#9ca3af', border:'1px solid #1e2330', fontSize:'.9rem' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading}
              style={{ flex:1, padding:'.8rem', background:'#ff4d6d', color:'#fff', fontSize:'.95rem' }}>
              {loading ? 'Submitting...' : '🐛 Submit Bug Report'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
