import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  CalendarDays,
  Award,
  CreditCard,
  UserCog,
  Shield,
  PieChart,
  Settings,
  ClipboardList,
  ArrowRight,
  Clock,
  MapPin,
  School,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeStat, setActiveStat] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "1,254",
      label: "Students",
      change: "+5%",
    },
    {
      icon: <UserCog className="w-6 h-6" />,
      value: "84",
      label: "Teachers",
      change: "+2%",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: "48",
      label: "Courses",
      change: "+3",
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "89%",
      label: "Success Rate",
      change: "+2%",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      value: "$245k",
      label: "Revenue",
      change: "+12%",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      value: "98%",
      label: "Attendance",
      change: "+1%",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New student enrolled",
      time: "2 hours ago",
      icon: <Users />,
      user: "Emma Johnson",
    },
    {
      id: 2,
      action: "Payment received",
      time: "5 hours ago",
      icon: <CreditCard />,
      amount: "$1,200",
    },
    {
      id: 3,
      action: "New course added",
      time: "1 day ago",
      icon: <BookOpen />,
      course: "Advanced Biology",
    },
    {
      id: 4,
      action: "Staff meeting completed",
      time: "1 day ago",
      icon: <School />,
      participants: "24",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Board Meeting",
      date: "May 15, 2023",
      time: "2:00 PM",
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      date: "May 18, 2023",
      time: "3:00 PM - 7:00 PM",
      location: "Main Hall",
    },
    {
      id: 3,
      title: "School Sports Day",
      date: "May 22, 2023",
      time: "9:00 AM - 3:00 PM",
      location: "School Field",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Settings className="w-5 h-5" /> Settings
        </button>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              icon: <Users className="w-5 h-5" />,
              label: "Add Student",
              color: "bg-indigo-100 text-indigo-600",
            },
            {
              icon: <UserCog className="w-5 h-5" />,
              label: "Add Staff",
              color: "bg-green-100 text-green-600",
            },
            {
              icon: <BookOpen className="w-5 h-5" />,
              label: "Create Course",
              color: "bg-amber-100 text-amber-600",
            },
            {
              icon: <CalendarDays className="w-5 h-5" />,
              label: "Schedule Event",
              color: "bg-purple-100 text-purple-600",
            },
            {
              icon: <CreditCard className="w-5 h-5" />,
              label: "Process Payment",
              color: "bg-emerald-100 text-emerald-600",
            },
            {
              icon: <PieChart className="w-5 h-5" />,
              label: "Generate Report",
              color: "bg-rose-100 text-rose-600",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} p-4 rounded-lg flex flex-col items-center justify-center text-center border hover:shadow transition cursor-pointer`}
            >
              <div className="mb-2 p-2 bg-white/30 rounded-full">
                {item.icon}
              </div>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["overview", "students", "staff", "finance", "reports"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3"
          >
            {/* Icon and Label Row */}
            <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                {React.cloneElement(stat.icon, { className: "w-5 h-5" })}
              </div>
              <span>{stat.label}</span>
            </div>

            {/* Value and Chip Row */}
            <div className="flex items-center justify-between mt-1">
              <span className="text-xl font-bold text-gray-800">
                {stat.value}
              </span>
              <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 border shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5" /> Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{activity.action}</h3>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  {activity.user && (
                    <p className="text-sm text-gray-600">{activity.user}</p>
                  )}
                  {activity.amount && (
                    <p className="text-sm text-green-600">{activity.amount}</p>
                  )}
                  {activity.course && (
                    <p className="text-sm text-blue-600">{activity.course}</p>
                  )}
                  {activity.participants && (
                    <p className="text-sm text-gray-600">
                      {activity.participants} participants
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 font-medium flex items-center gap-1">
            View all activities <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" /> Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-blue-50 rounded-r cursor-pointer"
              >
                <h3 className="font-semibold">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 font-medium flex items-center gap-1">
            View all events <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
