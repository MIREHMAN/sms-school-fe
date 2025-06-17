import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Actions from "@/components/Actions";
import { Plus, X } from "lucide-react";

// Student Model (unchanged)
class Student {
  constructor({
    id,
    name,
    email,
    img = "/avatar.png",
    gender,
    dateofAdmission,
    classes = [],
    phone,
    address,
    birthDate,
    parentName,
    parentPhone,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.img = img;
    this.gender = gender;
    this.dateofAdmission = dateofAdmission;
    this.classes = classes;
    this.phone = phone;
    this.address = address;
    this.birthDate = birthDate;
    this.parentName = parentName;
    this.parentPhone = parentPhone;
  }

  getFullInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      img: this.img,
      gender: this.gender,
      dateofAdmission: this.dateofAdmission,
      classes: this.classes,
      phone: this.phone,
      address: this.address,
      birthDate: this.birthDate,
      parentName: this.parentName,
      parentPhone: this.parentPhone,
    };
  }
}

// Dummy Data (unchanged)
const dummyStudents = [
  new Student({
    id: "S001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    gender: "Female",
    dateofAdmission: "2023-08-15",
    classes: [{ name: "Grade 10" }],
    phone: "111-222-3333",
    address: "12 Maple Lane",
    birthDate: "2008-05-12",
    parentName: "Mary Johnson",
    parentPhone: "111-222-4444",
  }),
  new Student({
    id: "S002",
    name: "Bob Martinez",
    email: "bob.martinez@example.com",
    gender: "Male",
    dateofAdmission: "2022-09-01",
    classes: [{ name: "Grade 11" }],
    phone: "444-555-6666",
    address: "89 Birch Street",
    birthDate: "2007-11-03",
    parentName: "Carlos Martinez",
    parentPhone: "444-555-7777",
  }),
];

// Columns and renderRow (unchanged)
const columns = [
  { header: "Info", accessor: "info" },
  { header: "Student ID", accessor: "studentId", className: "hidden md:table-cell" },
  { header: "Gender", accessor: "gender", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Date of Admission", accessor: "dateofAdmission", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const renderRow = (item) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <img
        src={item.img || "/avatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.id}</td>
    <td className="hidden md:table-cell">{item.gender}</td>
    <td className="hidden md:table-cell">{item.classes.map((c) => c.name).join(", ")}</td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.dateofAdmission}</td>
    <td>
      <Actions item="students" item_id={item.id} />
    </td>
  </tr>
);

const AddStudentModal = ({ isOpen, onClose, onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateofAdmission: "",
    class: "",
    phone: "",
    address: "",
    birthDate: "",
    parentName: "",
    parentPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `S${String(dummyStudents.length + 1).padStart(3, '0')}`;
    const newStudent = new Student({
      id: newId,
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      dateofAdmission: formData.dateofAdmission,
      classes: [{ name: formData.class }],
      phone: formData.phone,
      address: formData.address,
      birthDate: formData.birthDate,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
    });
    onAddStudent(newStudent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white p-6 pb-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Add New Student</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the student details</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6">
          <div className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Grade 10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="123-456-7890"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="123 Main St"
                required
              />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Parent Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Parent's Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Parent Phone</label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="987-654-3210"
                  required
                />
              </div>
            </div>

            {/* Date of Admission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Admission</label>
              <input
                type="date"
                name="dateofAdmission"
                value={formData.dateofAdmission}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors shadow-sm"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component (unchanged except for modal integration)
const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setStudents(dummyStudents);
  }, []);

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [...prev, newStudent]);
  };

  return (
    <section className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="hidden md:block text-lg font-bold text-gray-800">All Students</h1>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch />
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:bg-purple-600 transition-colors"
            >
              <Plus size={19} className="lg:hidden" />
              <span className="hidden sm:inline text-sm">Add Student</span>
            </button>
          </div>
        </header>

        <Table columns={columns} renderRow={renderRow} data={students} />
        <Pagination totalPages={5} totalResults={students.length} />
        <AddStudentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAddStudent={handleAddStudent}
        />
      </div>
    </section>
  );
};

export default StudentListPage;