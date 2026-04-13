import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const card = (label, value, color) => (
  <div key={label} style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:12, padding:'1.4rem' }}>
    <div style={{ fontSize:'2rem', fontWeight:800, color, marginBottom:4 }}>{value}</div>
    <div style={{ color:'#6b7280', fontSize:'.78rem', textTransform:'uppercase', letterSpacing:'.07em' }}>{label}</div>
  </div>
);

const statusColor = { Open:'#ff4d6d', 'In Progress':'#ffb400', Resolved:'#00d4aa', Closed:'#6b7280' };
const sevColor    = { Critical:'#ff4d6d', Major:'#ffb400', Minor:'#00d4aa' };

const pill = (val, map) => (
  <span style={{ background:`${map[val]||'#6b7280'}22`, color:map[val]||'#6b7280', padding:'2px 10px', borderRadius:20, fontSize:'.72rem', fontWeight:600 }}>
    {val}
  </span>
);

export default function Dashboard() {
  const nav  = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const auth = { headers: { Authorization: `Bearer ${user?.token}` } };
  const [stats,  setStats]  = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [s, b] = await Promise.all([
          axios.get('/api/bugs/stats', auth),
          axios.get('/api/bugs',       auth),
        ]);
        setStats(s.data);
        const roleFiltered = user?.role === "Developer"
  ? b.data.filter(bug => bug.assignedTo === user?._id)
  : b.data;

setRecent(roleFiltered.slice(0, 6));
      } catch (err) {
        if (err.response?.status === 401) { localStorage.removeItem('user'); nav('/login'); }
        else toast.error('Failed to load data. Is backend running on port 5000?');
      } finally { setLoading(false); }
    })();
  }, []);

  const doughnutData = {
    labels: ['Critical', 'Major', 'Minor'],
    datasets: [{ data: [stats?.critical||0, stats?.major||0, stats?.minor||0], backgroundColor: ['#ff4d6d','#ffb400','#00d4aa'], borderWidth:0 }],
  };
  const barData = {
    labels: ['Open', 'In Progress', 'Resolved'],
    datasets: [{ label:'Bugs', data:[stats?.open||0, stats?.inProgress||0, stats?.resolved||0], backgroundColor:['#ff4d6d','#ffb400','#00d4aa'], borderRadius:6 }],
  };
  const barOpts = { responsive:true, plugins:{legend:{display:false}}, scales:{ x:{grid:{color:'#1e2330'},ticks:{color:'#9ca3af'}}, y:{grid:{color:'#1e2330'},ticks:{color:'#9ca3af'}} } };

  return (
    <div style={{ padding:'2rem', maxWidth:1200, margin:'0 auto' }}>
      <h1 style={{ fontSize:'1.6rem', fontWeight:800, marginBottom:4 }}>Dashboard</h1>
      <p style={{ color:'#6b7280', fontSize:'.875rem', marginBottom:'2rem' }}>
        Welcome, <strong style={{ color:'#e8eaf0' }}>{user?.name}</strong> · {user?.role}
      </p>

      {loading ? (
        <div style={{ color:'#6b7280', textAlign:'center', padding:'4rem' }}>Loading dashboard...</div>
      ) : (
        <>
          {/* Stat Cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
            {card('Total Bugs',  stats?.total||0,      '#e8eaf0')}
            {card('Open',        stats?.open||0,        '#ff4d6d')}
            {card('In Progress', stats?.inProgress||0,  '#ffb400')}
            {card('Resolved',    stats?.resolved||0,    '#00d4aa')}
            {card('Critical',    stats?.critical||0,    '#ff4d6d')}
            {card('Minor',       stats?.minor||0,       '#00d4aa')}
          </div>

          {/* Charts */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'2rem' }}>
            <div style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:12, padding:'1.5rem' }}>
              <div style={{ fontWeight:700, marginBottom:'1rem' }}>Bugs by Severity</div>
              <Doughnut data={doughnutData} options={{ plugins:{ legend:{ labels:{ color:'#9ca3af' } } } }} />
            </div>
            <div style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:12, padding:'1.5rem' }}>
              <div style={{ fontWeight:700, marginBottom:'1rem' }}>Bugs by Status</div>
              <Bar data={barData} options={barOpts} />
            </div>
          </div>

          {/* Recent Bugs Table */}
          <div style={{ background:'#13161d', border:'1px solid #1e2330', borderRadius:12, padding:'1.5rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
              <div style={{ fontWeight:700 }}>Recent Bugs</div>
              <button onClick={() => nav('/bugs')} style={{ background:'#191c25', color:'#e8eaf0', padding:'6px 14px', border:'1px solid #1e2330', fontSize:'.8rem' }}>
                View All →
              </button>
            </div>

            {/* Table Header */}
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'1rem', padding:'8px 0', borderBottom:'1px solid #1e2330', color:'#6b7280', fontSize:'.72rem', textTransform:'uppercase' }}>
              <span>Title</span><span>Severity</span><span>Status</span><span>Date</span>
            </div>

            {recent.length === 0 ? (
              <p style={{ color:'#6b7280', padding:'1.5rem 0', textAlign:'center' }}>No bugs yet — <a href="/create-bug">report the first one!</a></p>
            ) : recent.map(b => (
              <div key={b._id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'1rem', padding:'12px 0', borderBottom:'1px solid #1e2330', fontSize:'.875rem', alignItems:'center' }}>
                <span style={{ fontWeight:500 }}>{b.title}</span>
                <span>{pill(b.severity, sevColor)}</span>
                <span>{pill(b.status,   statusColor)}</span>
                <span style={{ color:'#6b7280', fontSize:'.78rem' }}>{new Date(b.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
