import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const nav      = useNavigate();
  const { pathname } = useLocation();
  const user     = JSON.parse(localStorage.getItem('user') || 'null');

  if (['/login', '/register'].includes(pathname)) return null;

  const logout = () => { 
    localStorage.removeItem('user'); 
    nav('/login'); 
  };

  const active = (p) => ({ 
    color: pathname === p ? '#ff4d6d' : '#9ca3af' 
  });

  const roleColor = { 
    Admin: '#ff4d6d', 
    Developer: '#00d4aa', 
    Tester: '#ffb400' 
  };

  return (
    <nav style={{ 
      background:'#13161d', 
      borderBottom:'1px solid #1e2330', 
      padding:'0 2rem', 
      height:60, 
      display:'flex', 
      alignItems:'center', 
      justifyContent:'space-between', 
      position:'sticky', 
      top:0, 
      zIndex:99 
    }}>
      
      <Link to="/dashboard" style={{ 
        display:'flex', 
        alignItems:'center', 
        gap:8, 
        color:'#e8eaf0', 
        fontWeight:800, 
        fontSize:'1.15rem' 
      }}>
        <span style={{ 
          background:'#ff4d6d', 
          borderRadius:6, 
          width:28, 
          height:28, 
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center', 
          fontSize:14 
        }}>
          🐛
        </span>
        Bug<span style={{ color:'#ff4d6d' }}>Track</span>
      </Link>

      {/* Role Based Links */}
      <div style={{ display:'flex', gap:'1.5rem', alignItems:'center' }}>
        
        <Link 
          to="/dashboard"  
          style={{ ...active('/dashboard'), fontSize:'.875rem', fontWeight:500 }}
        >
          Dashboard
        </Link>

        <Link 
          to="/bugs"       
          style={{ ...active('/bugs'), fontSize:'.875rem', fontWeight:500 }}
        >
          All Bugs
        </Link>

        {/* Only Tester & Admin can report bugs */}
        {(user?.role === "Tester" || user?.role === "Admin") && (
          <Link 
            to="/create-bug" 
            style={{ ...active('/create-bug'), fontSize:'.875rem', fontWeight:500 }}
          >
            + Report Bug
          </Link>
        )}

      </div>

      {/* User Info */}
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        {user && (
          <span style={{ 
            background:'#191c25', 
            border:'1px solid #1e2330', 
            borderRadius:20, 
            padding:'4px 12px', 
            fontSize:'.78rem', 
            color:'#9ca3af', 
            display:'flex', 
            alignItems:'center', 
            gap:6 
          }}>
            <span style={{ 
              width:7, 
              height:7, 
              borderRadius:'50%', 
              background: roleColor[user.role] || '#00d4aa', 
              display:'inline-block' 
            }} />
            {user.name} · 
            <span style={{ color: roleColor[user.role] }}>
              {user.role}
            </span>
          </span>
        )}

        <button 
          onClick={logout} 
          style={{ 
            background:'#ff4d6d', 
            color:'#fff', 
            padding:'6px 16px', 
            fontSize:'.82rem' 
          }}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}