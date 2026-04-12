import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
  const nav = useNavigate();
  const [form, setForm]   = useState({ name:'', email:'', password:'', confirm:'' });
  const [role, setRole]   = useState('Developer');
  const [loading, setLoading] = useState(false);
  const ch = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match!');
    if (form.password.length < 6)       return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', { name: form.name, email: form.email, password: form.password, role });
      localStorage.setItem('user', JSON.stringify(data));
      toast.success(`Account created! Welcome, ${data.name} 🎉`);
      nav('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Is backend running?');
    } finally { setLoading(false); }
  };

  const pill = (r) => ({
    padding:'6px 16px', borderRadius:100, fontSize:'.78rem', cursor:'pointer',
    border: role===r ? '1px solid #ff4d6d' : '1px solid #1e2330',
    color:  role===r ? '#ff4d6d' : '#6b7280',
    background: role===r ? 'rgba(255,77,109,.08)' : '#191c25',
  });

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:16, padding:'2.5rem', width:'100%', maxWidth:460 }}>
        <div style={{ color:'#ff4d6d', fontSize:'.72rem', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:8 }}>🐛 New Account</div>
        <h2 style={{ fontSize:'1.8rem', fontWeight:800, marginBottom:6 }}>Create Account</h2>
        <p style={{ color:'#6b7280', fontSize:'.85rem', marginBottom:'2rem' }}>Have an account? <Link to="/login">Sign in</Link></p>

        <form onSubmit={submit}>
          {/* Name */}
          <div style={{ marginBottom:'1.1rem' }}>
            <label style={{ display:'block', fontSize:'.75rem', color:'#9ca3af', marginBottom:5, textTransform:'uppercase' }}>Full Name</label>
            <input name="name" placeholder="Your full name" value={form.name} onChange={ch} required />
          </div>

          {/* Email */}
          <div style={{ marginBottom:'1.1rem' }}>
            <label style={{ display:'block', fontSize:'.75rem', color:'#9ca3af', marginBottom:5, textTransform:'uppercase' }}>Email</label>
            <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={ch} required />
          </div>

          {/* Role */}
          <div style={{ marginBottom:'1.1rem' }}>
            <label style={{ display:'block', fontSize:'.75rem', color:'#9ca3af', marginBottom:8, textTransform:'uppercase' }}>Role</label>
            <div style={{ display:'flex', gap:8 }}>
              {['Developer','Admin','Tester'].map(r => (
                <div key={r} style={pill(r)} onClick={() => setRole(r)}>{r}</div>
              ))}
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:'1.1rem' }}>
            <label style={{ display:'block', fontSize:'.75rem', color:'#9ca3af', marginBottom:5, textTransform:'uppercase' }}>Password</label>
            <input name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={ch} required />
          </div>

          {/* Confirm */}
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'.75rem', color:'#9ca3af', marginBottom:5, textTransform:'uppercase' }}>Confirm Password</label>
            <input name="confirm" type="password" placeholder="Repeat password" value={form.confirm} onChange={ch} required />
          </div>

          <button type="submit" disabled={loading} style={{ width:'100%', padding:'.85rem', background:'#ff4d6d', color:'#fff', fontSize:'.95rem' }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>
      </div>
    </div>
  );
}
