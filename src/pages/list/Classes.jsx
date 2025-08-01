import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  BookOpen,
  ChevronRight,
  Users,
  Calendar,
  Bookmark,
  Star,
  Clock,
  BarChart,
} from "lucide-react";
import TableSearch from "@/components/TableSearch";
import FilterButton from "@/components/FilterButton";
import PageHeader from "@/components/PageHeader";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ClassService } from "@/services/ClassService";

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState("");
  const [newCategory, setNewCategory] = useState("Elementary");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedLayout, setSelectedLayout] = useState("grid");
  const [error, setError] = useState(null);

  const categoryOptions = ["Elementary", "Middle", "High", "Special"];
  const colorOptions = ["blue", "green", "purple", "pink", "yellow"];

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await ClassService.getAllClasses();
      console.log("API Response:", response);

      if (!response || !Array.isArray(response.results)) {
        throw new Error("Invalid response format");
      }

      // Transform API data to match frontend expectations
      const formattedClasses = response.results.map((cls) => ({
        id: cls.id,
        name: cls.class_name,
        category: cls.section || "Elementary", // Use section or default
        students: Math.floor(Math.random() * 10) + 20, // Random student count
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        teacher: cls.class_teacher,
        room: cls.room,
        schedule: cls.schedule,
      }));

      setClasses(formattedClasses);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
      setError(
        err.message || "Failed to load classes. Please try again later."
      );
      setClasses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAddClass = async () => {
    if (!newClass.trim()) return;

    try {
      setIsLoading(true);
      const newClassData = {
        class_name: newClass,
        section: newCategory,
        room: "1", // Default room
        description: `${newCategory} class`,
        schedule: "8:00 AM - 3:00 PM", // Default schedule
        class_teacher: "Teacher Name", // Default teacher
      };

      const response = await ClassService.addClass(newClassData);

      if (response.data) {
        // Transform the response to match frontend format
        const formattedClass = {
          id: response.data.id,
          name: response.data.class_name,
          category: response.data.section || newCategory,
          students: Math.floor(Math.random() * 10) + 20,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
          teacher: response.data.class_teacher,
          room: response.data.room,
          schedule: response.data.schedule,
        };
        setClasses((prev) => [...prev, formattedClass]);
      }

      setNewClass("");
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add class:", err);
      setError("Failed to add class. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredClasses = () => {
    let filtered = classes;

    if (searchQuery) {
      filtered = filtered.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (cls.category &&
            cls.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (cls.teacher &&
            cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedFilter !== "All") {
      filtered = filtered.filter((cls) => cls.category === selectedFilter);
    }

    return filtered;
  };

  const filteredClasses = getFilteredClasses();

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        progress: "bg-blue-500",
        hover: "group-hover:bg-blue-600",
        light: "bg-blue-100",
      },
      green: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-200",
        progress: "bg-emerald-500",
        hover: "group-hover:bg-emerald-600",
        light: "bg-emerald-100",
      },
      purple: {
        bg: "bg-violet-50",
        text: "text-violet-600",
        border: "border-violet-200",
        progress: "bg-violet-500",
        hover: "group-hover:bg-violet-600",
        light: "bg-violet-100",
      },
      pink: {
        bg: "bg-pink-50",
        text: "text-pink-600",
        border: "border-pink-200",
        progress: "bg-pink-500",
        hover: "group-hover:bg-pink-600",
        light: "bg-pink-100",
      },
      yellow: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-200",
        progress: "bg-amber-500",
        hover: "group-hover:bg-amber-600",
        light: "bg-amber-100",
      },
    };

    return colorMap[color] || colorMap.blue;
  };

  const getIconByCategory = (category) => {
    switch (category) {
      case "Elementary":
        return <BookOpen size={16} />;
      case "Middle":
        return <Bookmark size={16} />;
      case "High":
        return <BarChart size={16} />;
      case "Special":
        return <Star size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  const renderClassCard = (cls, index) => {
    const colorClasses = getColorClasses(cls.color);
    const progress = (cls.students / 35) * 100;

    return (
      <div
        key={cls.id || index}
        className="relative rounded-xl p-0 bg-white shadow-sm group border transition-all hover:shadow-md overflow-hidden"
      >
        <div className={`h-1 w-full ${colorClasses.progress}`}></div>

        <div className="absolute -top-8 -right-8 w-16 h-16 rotate-45 bg-opacity-20 transform origin-bottom-left">
          <div className={`w-full h-full ${colorClasses.bg}`}></div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}
            >
              {getIconByCategory(cls.category)}
              <span className="ml-1">{cls.category}</span>
            </span>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              {cls.schedule || "8:00 AM - 3:00 PM"}
            </div>
          </div>

          <h3 className="font-bold text-lg text-gray-800 mb-1">{cls.name}</h3>

          <div className="flex items-center mb-4 text-gray-500 text-sm">
            <Users size={14} className="mr-1" />
            <span>{cls.students} students</span>
            <span className="mx-2">•</span>
            <span>Room: {cls.room || "N/A"}</span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
            <div
              className={`${colorClasses.progress} h-2 rounded-full transition-all group-hover:w-full`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {cls.students}/35 capacity
            </span>
            <Link to={`/classes/${cls.id}`}>
              <button
                className={`${colorClasses.bg} ${colorClasses.text} text-sm font-medium px-3 py-1 rounded-lg flex items-center group-hover:bg-opacity-100 transition-all`}
              >
                View{" "}
                <ChevronRight
                  size={14}
                  className="ml-1 transform group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderSkeletonCard = (index) => (
    <div
      key={index}
      className="border rounded-xl p-5 bg-white shadow animate-pulse"
    >
      <div className="h-1 w-full bg-gray-200 mb-4"></div>
      <div className="flex justify-between mb-3">
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <PageHeader
          PageName={"Classes"}
          searchValue={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          OnClick={() => setShowModal(true)}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => renderSkeletonCard(index))}
          </div>
        ) : (
          <>
            {filteredClasses.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-xl shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No classes found</h3>
                <p>Try a different search or add a new class</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center"
                  onClick={() => setShowModal(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add a new class
                </button>
              </div>
            ) : (
              <div
                className={
                  selectedLayout === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredClasses.map((cls, index) => {
                  return selectedLayout === "grid" ? (
                    renderClassCard(cls, index)
                  ) : (
                    <div
                      key={cls.id || index}
                      className="flex items-center bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-all"
                    >
                      <div
                        className={`w-2 h-16 rounded-full mr-4 ${
                          getColorClasses(cls.color).progress
                        }`}
                      ></div>
                      <div className="flex-grow">
                        <div className="flex items-center mb-1">
                          <h3 className="font-bold text-lg text-gray-800 mr-3">
                            {cls.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              getColorClasses(cls.color).bg
                            } ${getColorClasses(cls.color).text}`}
                          >
                            {cls.category}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users size={14} className="mr-1" />
                          <span>{cls.students} students</span>
                          <span className="mx-2">•</span>
                          <span>Room: {cls.room || "N/A"}</span>
                          <span className="mx-2">•</span>
                          <span>{cls.teacher}</span>
                        </div>
                      </div>

                      <Link to={`/classes/${cls.id}`}>
                        <button
                          className={`${getColorClasses(cls.color).bg} ${
                            getColorClasses(cls.color).text
                          } px-4 py-2 rounded-lg ml-4`}
                        >
                          View
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Add New Class
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:rotate-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                    placeholder="Enter class name (e.g., Grade 11)"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map((category) => (
                      <button
                        key={category}
                        type="button"
                        className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                          newCategory === category
                            ? "bg-purple-100 text-purple-600 border-2 border-purple-300"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
                        }`}
                        onClick={() => setNewCategory(category)}
                      >
                        {getIconByCategory(category)}
                        <span className="ml-1">{category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-400 flex items-start">
                    <div className="text-purple-500 mt-0.5 mr-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <p className="text-sm text-purple-700">
                      Class capacity is set to 35 students by default. You can
                      change this later in the class settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-medium transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
                  onClick={handleAddClass}
                  disabled={!newClass.trim()}
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
