import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const ch = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', form);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success(`Welcome back, ${data.name}!`);
      nav('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Is backend running?');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:16, padding:'2.5rem', width:'100%', maxWidth:420 }}>
        <div style={{ color:'#ff4d6d', fontSize:'.72rem', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:8 }}>🐛 BugTrack</div>
        <h2 style={{ fontSize:'1.8rem', fontWeight:800, marginBottom:6 }}>Sign In</h2>
        <p style={{ color:'#6b7280', fontSize:'.85rem', marginBottom:'2rem' }}>No account? <Link to="/register">Register here</Link></p>

        <form onSubmit={submit}>
          <div style={{ marginBottom:'1.2rem' }}>
            <label style={{ display:'block', fontSize:'.75rem', color:'#9ca3af', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em' }}>Email</label>
            <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={ch} required />
          </div>
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'.75rem', color:'#9ca3af', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em' }}>Password</label>
            <input name="password" type="password" placeholder="Your password" value={form.password} onChange={ch} required />
          </div>
          <button type="submit" disabled={loading} style={{ width:'100%', padding:'.85rem', background:'#ff4d6d', color:'#fff', fontSize:'.95rem' }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
