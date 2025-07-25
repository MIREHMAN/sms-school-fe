import { useQuery } from "react-query";
import {
  Users,
  BookOpen,
  CalendarDays,
  Award,
  CreditCard,
  UserCog,
  Shield,
  PieChart,
  ClipboardList,
  ArrowRight,
  Clock,
  MapPin,
  School,
  AlertCircle,
} from "lucide-react";
import { StudentService } from "@/services/StudentService";
import { TeacherService } from "@/services/TeacherService";

const AdminDashboard = () => {
  // Fetch all data with React Query
  const {
    data: studentsData,
    isLoading: studentsLoading,
    error: studentsError,
  } = useQuery("students", () => StudentService.getAllStudents());

  const {
    data: teachersData,
    isLoading: teachersLoading,
    error: teachersError,
  } = useQuery("teachers", () => TeacherService.getAllTeachers());

  // Stats configuration
  const stats = [
    {
      icon: <Users className="w-5 h-5" />,
      value: studentsLoading ? "..." : studentsData?.count || 0,
      label: "Students",
      change: "+5%",
      loading: studentsLoading,
      error: studentsError,
    },
    {
      icon: <UserCog className="w-5 h-5" />,
      value: teachersLoading ? "..." : teachersData?.count || 0,
      label: "Teachers",
      change: "+2%",
      loading: teachersLoading,
      error: teachersError,
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      value: "48",
      label: "Courses",
      change: "+3",
    },
    {
      icon: <Award className="w-5 h-5" />,
      value: "89%",
      label: "Success Rate",
      change: "+2%",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      value: "$245k",
      label: "Revenue",
      change: "+12%",
    },
    {
      icon: <Shield className="w-5 h-5" />,
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
      icon: <Users size={16} />,
      user: "Emma Johnson",
    },
    {
      id: 2,
      action: "Payment received",
      time: "5 hours ago",
      icon: <CreditCard size={16} />,
      amount: "$1,200",
    },
    {
      id: 3,
      action: "New course added",
      time: "1 day ago",
      icon: <BookOpen size={16} />,
      course: "Advanced Biology",
    },
    {
      id: 4,
      action: "Staff meeting completed",
      time: "1 day ago",
      icon: <School size={16} />,
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

  const StatCard = ({ icon, value, label, change, loading, error }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
        <span>{label}</span>
      </div>

      {error ? (
        <div className="flex items-center gap-1 text-red-500 text-sm">
          <AlertCircle size={16} />
          <span>Error loading</span>
        </div>
      ) : loading ? (
        <div className="animate-pulse h-6 w-1/2 bg-gray-200 rounded"></div>
      ) : (
        <div className="flex items-center justify-between mt-1">
          <span className="text-xl font-bold text-gray-800">{value}</span>
          {change && (
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 border shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <ClipboardList className="w-5 h-5" /> Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {activity.action}
                  </h3>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  {activity.user && (
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.user}
                    </p>
                  )}
                  {activity.amount && (
                    <p className="text-sm text-green-600 mt-1">
                      {activity.amount}
                    </p>
                  )}
                  {activity.course && (
                    <p className="text-sm text-blue-600 mt-1">
                      {activity.course}
                    </p>
                  )}
                  {activity.participants && (
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.participants} participants
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 transition-colors">
            View all activities <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <CalendarDays className="w-5 h-5" /> Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-blue-50 rounded-r cursor-pointer transition-colors"
              >
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
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
          <button className="mt-4 text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 transition-colors">
            View all events <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
