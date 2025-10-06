import React, { useState, useMemo } from 'react';
import { FaUsers, FaUserMd, FaChartBar, FaTrash, FaUserShield, FaUserPlus, FaSearch } from 'react-icons/fa';

// --- MOCK DATA ---
const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'client', status: 'approved' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', role: 'therapist', status: 'approved' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'client', status: 'approved' },
  { id: 4, name: 'Diana Miller', email: 'diana@example.com', role: 'therapist', status: 'pending' },
  { id: 5, name: 'Ethan Davis', email: 'ethan@example.com', role: 'client', status: 'approved' },
  { id: 6, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'therapist', status: 'approved' },
  { id: 7, name: 'George Clark', email: 'george@example.com', role: 'therapist', status: 'pending' },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'users', 'therapists'
  const [searchTerm, setSearchTerm] = useState('');

  // --- DATA CALCULATIONS ---
  const stats = useMemo(() => {
    const totalTherapists = users.filter(u => u.role === 'therapist').length;
    const totalClients = users.filter(u => u.role === 'client').length;
    return {
      totalUsers: users.length,
      totalTherapists,
      totalClients,
    };
  }, [users]);

  // --- EVENT HANDLERS ---
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleRole = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, role: user.role === 'therapist' ? 'client' : 'therapist' }
        : user
    ));
  };
  
  const handleApproveTherapist = (userId) => {
    setUsers(users.map(user =>
        user.id === userId ? { ...user, status: 'approved' } : user
    ));
  };

  const handleRejectTherapist = (userId) => {
     if (window.confirm('Are you sure you want to reject and remove this therapist?')) {
       handleDeleteUser(userId);
     }
  };
  
  // --- RENDER LOGIC ---
  const renderContent = () => {
    switch (activeView) {
      case 'users':
        return <UsersTable users={users} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onDelete={handleDeleteUser} onToggleRole={handleToggleRole} />;
      case 'therapists':
        return <TherapistsAdmin users={users} onApprove={handleApproveTherapist} onReject={handleRejectTherapist} />;
      case 'dashboard':
      default:
        return <DashboardStats stats={stats} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-brand text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-white/20">
          Admin Panel
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveView('dashboard')} className={`w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors ${activeView === 'dashboard' ? 'bg-white/30' : ''}`}>
                <FaChartBar /> Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('users')} className={`w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors ${activeView === 'users' ? 'bg-white/30' : ''}`}>
                <FaUsers /> Manage Users
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('therapists')} className={`w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors ${activeView === 'therapists' ? 'bg-white/30' : ''}`}>
                <FaUserMd /> Therapists
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS FOR EACH VIEW ---

const DashboardStats = ({ stats }) => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="stat card bg-white shadow-lg">
        <div className="stat-figure text-primary-green"><FaUsers size={32} /></div>
        <div className="stat-title">Total Users</div>
        <div className="stat-value text-primary-green">{stats.totalUsers}</div>
      </div>
      <div className="stat card bg-white shadow-lg">
        <div className="stat-figure text-primary-green"><FaUserMd size={32}/></div>
        <div className="stat-title">Total Therapists</div>
        <div className="stat-value text-primary-green">{stats.totalTherapists}</div>
      </div>
      <div className="stat card bg-white shadow-lg">
        <div className="stat-figure text-primary-green"><FaUserPlus size={32}/></div>
        <div className="stat-title">Total Clients</div>
        <div className="stat-value text-primary-green">{stats.totalClients}</div>
      </div>
    </div>
  </div>
);

const UsersTable = ({ users, searchTerm, setSearchTerm, onDelete, onToggleRole }) => {
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage All Users</h1>
            <div className="mb-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="text-gray-400" />
                    </span>
                    <input 
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full max-w-sm pl-10"
                    />
                </div>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === 'therapist' ? 'badge-info' : 'badge-ghost'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-2">
                                    <button onClick={() => onToggleRole(user.id)} className="btn btn-sm btn-outline btn-primary-green flex items-center gap-1">
                                      <FaUserShield /> {user.role === 'therapist' ? 'Demote' : 'Promote'}
                                    </button>
                                    <button onClick={() => onDelete(user.id)} className="btn btn-sm btn-outline btn-error flex items-center gap-1">
                                      <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TherapistsAdmin = ({ users, onApprove, onReject }) => {
    const therapists = users.filter(user => user.role === 'therapist');

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Therapist Verification</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {therapists.map(therapist => (
                            <tr key={therapist.id} className="hover">
                                <td>{therapist.name}</td>
                                <td>{therapist.email}</td>
                                <td>
                                    <span className={`badge ${therapist.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                        {therapist.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {therapist.status === 'pending' ? (
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => onApprove(therapist.id)} className="btn btn-sm btn-success">Approve</button>
                                            <button onClick={() => onReject(therapist.id)} className="btn btn-sm btn-error">Reject</button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">Verified</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                         {therapists.length === 0 && (
                            <tr><td colSpan="4" className="text-center p-4">No therapists found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};