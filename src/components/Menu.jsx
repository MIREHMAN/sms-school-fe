import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext"; // Make sure this path is correct

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Home", href: "/", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/teacher.png", label: "Teachers", href: "/list/teachers", visible: ["admin", "teacher"] },
      { icon: "/student.png", label: "Students", href: "/list/students", visible: ["admin", "teacher"] },
      { icon: "/parent.png", label: "Parents", href: "/list/parents", visible: ["admin", "teacher"] },
      { icon: "/subject.png", label: "Subjects", href: "/list/subjects", visible: ["admin","student","teacher","parent"] },
      { icon: "/class.png", label: "Classes", href: "/list/classes", visible: ["admin", "teacher","student","parent"] },
      { icon: "/lesson.png", label: "Lessons", href: "/list/lessons", visible: ["admin", "teacher","parent"] },
      { icon: "/exam.png", label: "Exams", href: "/list/exams", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/assignment.png", label: "Assignments", href: "/list/assignments", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/result.png", label: "Results", href: "/list/results", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/attendance.png", label: "Attendance", href: "/list/attendance", visible: ["admin", "teacher", "student", "parent"] },
      // { icon: "/calendar.png", label: "Events", href: "/list/events", visible: ["admin", "teacher", "student", "parent"] },
      // { icon: "/message.png", label: "Messages", href: "/list/messages", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/announcement.png", label: "Announcements", href: "/list/announcements", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Profile", href: "/profile", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/setting.png", label: "Settings", href: "/settings", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/logout.png", label: "Logout", href: "/logout", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
];

const Menu = () => {
  const { user } = useUser();
  const userRole = user?.role || "";

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-semibold tracking-wider mt-6 mb-2 px-2">
            {section.title}
          </span>
          {section.items
            .filter((item) => item.visible.includes(userRole))
            .map((item) => (
              <Link
                to={item.href}
                key={item.label}
                className="flex items-center gap-4 text-gray-700 py-2 px-4 rounded-md hover:bg-cyan-100 hover:text-cyan-900 hover:shadow-sm group"
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  width={16}
                  height={16}
                  className="transition-transform"
                />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
