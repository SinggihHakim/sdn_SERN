import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const menuItems = [
    {
      title: "Lihat Pendaftar",
      description: "Kelola semua data calon siswa baru yang masuk",
      icon: "📋",
      link: "/admin/pendaftaran",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      count: "24",
    },
    {
      title: "Manajemen Galeri",
      description: "Tambah atau hapus foto di galeri publik",
      icon: "🖼",
      link: "/admin/galeri",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      count: "48",
    },
    {
      title: "Manajemen Berita",
      description: "Tambah atau hapus berita dan postingan",
      icon: "📰",
      link: "/admin/postingan",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      count: "12",
    },
    {
      title: "Manajemen Guru",
      description: "Kelola data guru dan tenaga pendidik",
      icon: "👨‍🏫",
      link: "/admin/guru",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      count: "18",
    },
    {
      title: "Lihat Saran",
      description: "Baca semua masukan dari pengunjung website",
      icon: "💬",
      link: "/admin/saran",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      count: "8",
    },
    {
      title: "Pengaturan Website",
      description: "Fitur ini masih dalam tahap pengembangan!",
      icon: "⚙",
      link: "/admin/pengaturan",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      count: "6",
    },
  ];

  const stats = [
    { label: "Total Pendaftar", value: "24", change: "+5" },
    { label: "Foto Galeri", value: "48", change: "+12" },
    { label: "Postingan", value: "12", change: "+3" },
    { label: "Guru & Staff", value: "18", change: "+2" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Dashboard <span className="text-primary">Admin</span>
              </h1>
            </div>
            <p className="text-gray-600">Selamat datang di panel administrasi sekolah</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                <div className="text-sm font-semibold text-gray-900">{formatTime(currentTime)}</div>
                <div className="text-xs text-gray-600">{formatDate(currentTime)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Administrator</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>

            <button onClick={handleLogout} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm border border-gray-100 hover:bg-red-50 hover:border-red-200 transition-all duration-300 group">
              <span className="text-red-500 group-hover:text-red-600">🚪</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats and Menu */}
          <div className="lg:col-span-2">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">↗ {stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Menu Manajemen</h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Quick Access</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item, index) => (
                  <Link key={index} to={item.link} className="group block">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-primary/20 group-hover:-translate-y-2 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center`}>
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.count}</span>
                      </div>

                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>

                      <div className="mt-4 flex items-center text-xs text-primary font-medium">
                        <span>Kelola sekarang →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Semangat Pagi! 🌟</h2>
                  <p className="text-white/90 max-w-2xl">Selamat datang kembali di sistem administrasi SDN 01 Pematang Baru. Kelola semua aspek sekolah dengan mudah melalui dashboard ini.</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex justify-center items-center space-x-2">
                    <span className="text-xs text-center bg-white/20 px-3 py-1 rounded-full">Sistem Aktif</span>
                    <span className="text-xs text-center bg-white/20 px-3 py-1 rounded-full">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Todo List and Recent Activity */}
          <div className="space-y-8">
            {/* Todo List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">To-Do List</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{todos.filter((todo) => !todo.completed).length} tasks</span>
              </div>

              <div className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTodo()}
                    placeholder="Tambah tugas baru..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button onClick={addTodo} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium">
                    Tambah
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {todos.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">Tidak ada tugas. Tambahkan tugas baru!</p>
                ) : (
                  todos.map((todo) => (
                    <div key={todo.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                      <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300" />
                      <span className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>{todo.text}</span>
                      <button onClick={() => deleteTodo(todo.id)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity duration-200">
                        🗑
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h3>
              <div className="space-y-3">
                {[
                  { action: "Pendaftar baru", user: "Ahmad Santoso", time: "5 menit lalu" },
                  { action: "Foto diupload", user: "Admin", time: "1 jam lalu" },
                  { action: "Berita diposting", user: "Admin", time: "2 jam lalu" },
                  { action: "Data guru diperbarui", user: "Admin", time: "3 jam lalu" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm">⚡</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">oleh {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
