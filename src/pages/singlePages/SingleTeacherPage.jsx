// SingleTeacherPage.jsx
import React from "react";
import {
  CalendarDays,
  Mail,
  Phone,
  Droplet,
  CalendarClock,
  BarChart2,
  BookOpen,
  Users,
  Edit3,
  Save,
  X,
  User,
  CreditCard,
  Calendar,
  GraduationCap,
  DollarSign,
  MapPin,
  FileText,
  School,
  MailIcon,
} from "lucide-react";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TeacherService } from "@/services/TeacherService";

const SingleTeacherPage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState({});

  useEffect(() => {
    TeacherService.getTeacherById(id).then((res) => {
      console.log("Teacher fetched:", res);
      setTeacher(res);
      setEditedTeacher(res);
    });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTeacher({ ...teacher });
  };

  const handleSave = async () => {
    try {
      setTeacher(editedTeacher);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleCancel = () => {
    setEditedTeacher({ ...teacher });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedTeacher((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!teacher) return <p className="p-4">Loading teacher...</p>;

  const displayData = isEditing ? editedTeacher : teacher;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col xl:flex-row gap-4 p-2 sm:p-4">
        <div className="w-full xl:w-3/2 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-blue-100 py-4 sm:py-6 px-3 sm:px-4 rounded-md flex-1">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex justify-center sm:justify-start">
                  <img
                    src="/avatar.png"
                    alt=""
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h1 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
                      {isEditing ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={displayData.first_name || ""}
                            onChange={(e) =>
                              handleInputChange("first_name", e.target.value)
                            }
                            className="px-2 py-1 rounded border text-sm w-full sm:w-auto"
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            value={displayData.last_name || ""}
                            onChange={(e) =>
                              handleInputChange("last_name", e.target.value)
                            }
                            className="px-2 py-1 rounded border text-sm w-full sm:w-auto"
                            placeholder="Last Name"
                          />
                        </div>
                      ) : (
                        `${displayData.first_name || ""} ${
                          displayData.last_name || ""
                        }`
                      )}
                    </h1>

                    <div className="flex gap-2 justify-center sm:justify-end">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleEdit}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={displayData.description || ""}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="px-2 py-1 rounded border text-sm resize-none w-full"
                      rows="2"
                      placeholder="Description"
                    />
                  ) : (
                    <p className="text-sm text-gray-500 text-center sm:text-left">
                      {displayData.description || "No description available"}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <User size={14} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={displayData.teacher_code || ""}
                          onChange={(e) =>
                            handleInputChange("teacher_code", e.target.value)
                          }
                          className="px-1 py-0.5 rounded border text-xs flex-1 min-w-0"
                        />
                      ) : (
                        <span>{displayData.teacher_code || "N/A"}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <CreditCard size={14} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={displayData.CNIC || ""}
                          onChange={(e) =>
                            handleInputChange("CNIC", e.target.value)
                          }
                          className="px-1 py-0.5 rounded border text-xs flex-1 min-w-0"
                        />
                      ) : (
                        <span>{displayData.CNIC || "N/A"}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <Phone size={14} />
                      {isEditing ? (
                        <input
                          type="tel"
                          value={displayData.phone_number || ""}
                          onChange={(e) =>
                            handleInputChange("phone_number", e.target.value)
                          }
                          className="px-1 py-0.5 rounded border text-xs flex-1 min-w-0"
                        />
                      ) : (
                        <span>{displayData.phone_number || "N/A"}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <MailIcon className="text-black" size={14} />
                      {isEditing ? (
                        <input
                          type="email"
                          value={displayData.email || ""}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="  rounded border text-xs flex-1 min-w-0"
                        />
                      ) : (
                        <span>{displayData.email || "N/A"}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-80">
              <InfoCard
                icon={<BarChart2 size={20} />}
                title={
                  isEditing ? (
                    <input
                      type="number"
                      value={displayData.experience_years || ""}
                      onChange={(e) =>
                        handleInputChange("experience_years", e.target.value)
                      }
                      className="px-2 py-1 rounded border text-sm w-full max-w-16"
                    />
                  ) : (
                    displayData.experience_years || "N/A"
                  )
                }
                subtitle="Years of Teaching"
              />

              <InfoCard
                icon={<DollarSign size={20} />}
                title={
                  isEditing ? (
                    <input
                      type="number"
                      value={displayData.salary || ""}
                      onChange={(e) =>
                        handleInputChange("salary", e.target.value)
                      }
                      className="px-2 py-1 rounded border text-sm w-full max-w-20"
                    />
                  ) : displayData.salary ? (
                    `$${displayData.salary}`
                  ) : (
                    "N/A"
                  )
                }
                subtitle="Monthly Salary"
              />

              <InfoCard
                icon={<GraduationCap size={20} />}
                title={
                  isEditing ? (
                    <input
                      type="text"
                      value={displayData.qualification || ""}
                      onChange={(e) =>
                        handleInputChange("qualification", e.target.value)
                      }
                      className="px-2 py-1 rounded border text-sm w-full max-w-24"
                    />
                  ) : (
                    displayData.qualification || "N/A"
                  )
                }
                subtitle="Qualification"
              />
            </div>
          </div>

          <div className="bg-white rounded-md p-3 sm:p-4">
            <h1 className="text-lg sm:text-xl font-semibold mb-4">
              Teacher Details
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <DetailField
                icon={<Calendar size={16} />}
                label="Date of Birth"
                value={displayData.date_of_birth}
                isEditing={isEditing}
                type="date"
                onChange={(value) => handleInputChange("date_of_birth", value)}
              />
              <DetailField
                icon={<CalendarClock size={16} />}
                label="Joining Date"
                value={displayData.joining_date}
                isEditing={isEditing}
                type="date"
                onChange={(value) => handleInputChange("joining_date", value)}
              />
              <DetailField
                icon={<School size={16} />}
                label="Assigned Class"
                value={
                  displayData.assigned_class &&
                  typeof displayData.assigned_class === "object"
                    ? `${displayData.assigned_class.class_name || "N/A"} ${
                        displayData.assigned_class.section || ""
                      }`
                    : "N/A"
                }
                isEditing={isEditing}
                onChange={(value) => handleInputChange("assigned_class", value)}
              />
              <DetailField
                icon={<BookOpen size={16} />}
                isEditing={isEditing}
                onChange={(value) =>
                  handleInputChange("assigned_subjects", value)
                }
                label="Assigned Subjects"
                value={
                  Array.isArray(displayData.assigned_subjects)
                    ? displayData.assigned_subjects
                        .map((sub) => sub.subject_name)
                        .join(", ")
                    : "N/A"
                }
              />
              <DetailField
                icon={<MapPin size={16} />}
                label="Address"
                value={displayData.address}
                isEditing={isEditing}
                isTextarea={true}
                onChange={(value) => handleInputChange("address", value)}
                className="lg:col-span-2"
              />
            </div>
          </div>

          <div className="bg-white rounded-md p-3 sm:p-4">
            <h1 className="text-lg sm:text-xl font-semibold mb-4">
              Teacher's Schedule
            </h1>
            <div className="border border-gray-200 rounded-md h-64 sm:h-80 lg:h-96 flex items-center justify-center text-gray-400">
              <p className="text-sm text-center px-4">
                Calendar view coming soon...
              </p>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-1/3 space-y-4">
          <div className="bg-white p-3 sm:p-4 rounded-md">
            <h1 className="text-lg sm:text-xl font-semibold mb-4">Shortcuts</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2 sm:gap-3 text-xs text-gray-500">
              <button className="p-2 sm:p-3 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors text-center">
                <div className="text-sm sm:text-base mb-1">📚</div>
                <div className="text-xs">Teacher's Lessons</div>
              </button>
              <button className="p-2 sm:p-3 rounded-md bg-purple-100 hover:bg-purple-200 transition-colors text-center">
                <div className="text-sm sm:text-base mb-1">👨‍🏫</div>
                <div className="text-xs">Teacher's Students</div>
              </button>
              <button className="p-2 sm:p-3 rounded-md bg-pink-100 hover:bg-pink-200 transition-colors text-center">
                <div className="text-sm sm:text-base mb-1">📝</div>
                <div className="text-xs">Teacher's Exams</div>
              </button>
              <button className="p-2 sm:p-3 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors text-center">
                <div className="text-sm sm:text-base mb-1">📂</div>
                <div className="text-xs">Teacher's Assignments</div>
              </button>
              <button className="p-2 sm:p-3 rounded-md bg-yellow-100 hover:bg-yellow-200 transition-colors text-center col-span-2 sm:col-span-1">
                <div className="text-sm sm:text-base mb-1">📊</div>
                <div className="text-xs">Teacher's Results</div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <Performance />
            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, subtitle }) => (
  <div className="bg-white p-3 sm:p-4 rounded-md flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
    <div className="flex-shrink-0 text-blue-500">{icon}</div>
    <div className="min-w-0 flex-1">
      <h1 className="text-lg sm:text-xl font-semibold truncate">{title}</h1>
      <span className="text-xs sm:text-sm text-gray-400">{subtitle}</span>
    </div>
  </div>
);

const DetailField = ({
  icon,
  label,
  value,
  isEditing,
  type = "text",
  isTextarea = false,
  onChange,
  className = "",
}) => (
  <div className={`flex gap-3 p-3 bg-gray-50 rounded-md ${className}`}>
    <div className="text-gray-500 mt-1 flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>
      {isEditing ? (
        isTextarea ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2 py-1 rounded border text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="2"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        ) : (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2 py-1 rounded border text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        )
      ) : (
        <span className="text-sm text-gray-600 break-words">
          {value || "Not specified"}
        </span>
      )}
    </div>
  </div>
);

export default SingleTeacherPage;
