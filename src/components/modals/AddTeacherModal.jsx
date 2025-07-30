import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TeacherService } from "@/services/TeacherService";
import { useAsyncFn } from "@/hooks/useAsync";

const AddTeacherModal = ({ open, onClose }) => {
  const initialValues = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    cnic: "",
    address: "",
    assigned_class: "",
    assigned_subjects: [],
    description: "",
    joining_date: "",
    qualification: "",
    salary: "",
    teacher_code: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    dob: Yup.date().required("Date of birth is required"),
    cnic: Yup.string().required("CNIC is required"),
    address: Yup.string().required("Address is required"),
    joining_date: Yup.date().required("Joining date is required"),
    qualification: Yup.string().required("Qualification is required"),
    salary: Yup.number()
      .positive("Salary must be positive")
      .required("Salary is required"),
    teacher_code: Yup.string(),
    assigned_class: Yup.string().required("Assigned class is required"),
    assigned_subjects: Yup.array().required("At least one assigned subject is required"),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    TeacherService.addTeacher(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        dob: new Date(values.dob).toISOString().split("T")[0],
        joining_date: new Date(values.joining_date).toISOString().split("T")[0],
        salary: parseFloat(values.salary),
        assigned_subjects: values.assigned_subjects.filter(
          (subject) => subject.trim() !== ""
        ),
      };

      console.log("Sending formatted data:", formattedValues);
      await execute(formattedValues);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create teacher:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add New Teacher</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2 flex-shrink-0">
            {error?.data?.error || "Failed to create teacher"}
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form id="teacher-form" className="space-y-6">
                {/* User Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-3 text-gray-700">
                    User Credentials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-3 text-gray-700">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">
                        Date of Birth
                      </label>
                      <Field
                        name="dob"
                        type="date"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="cnic"
                        type="text"
                        placeholder="CNIC (e.g., 61101-5806616-5)"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="cnic"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Field
                      name="address"
                      as="textarea"
                      rows="2"
                      placeholder="Complete Address"
                      className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                {/* Professional Info */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-3 text-gray-700">
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        disabled={true}
                        name="teacher_code"
                        type="text"
                        placeholder="Teacher Code (auto generated)"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="teacher_code"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="qualification"
                        type="text"
                        placeholder="Qualification (e.g., Master in Computer Science)"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="qualification"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">
                        Joining Date
                      </label>
                      <Field
                        name="joining_date"
                        type="date"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="joining_date"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="salary"
                        type="number"
                        step="0.01"
                        placeholder="Salary (e.g., 35000.00)"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="salary"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Assignment Info */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-3 text-gray-700">
                    Assignment Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Field
                        name="assigned_class"
                        type="text"
                        placeholder="Assigned Class (optional)"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="assigned_class"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">
                        Assigned Subjects (one per line)
                      </label>
                      <Field
                        name="assigned_subjects"
                        as="textarea"
                        rows="3"
                        placeholder="Enter subjects, one per line&#10;e.g.:&#10;Mathematics&#10;Physics&#10;Computer Science"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        onChange={(e) => {
                          const subjects = e.target.value
                            .split("\n")
                            .filter((s) => s.trim());
                          setFieldValue("assigned_subjects", subjects);
                        }}
                      />
                      <ErrorMessage
                        name="assigned_subjects"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        name="description"
                        as="textarea"
                        rows="2"
                        placeholder="Additional Description (optional)"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t bg-white">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-500 hover:bg-purple-600 flex-1 sm:flex-none"
              type="submit"
              disabled={loading}
              form="teacher-form"
              onClick={(e) => {
                e.preventDefault();
                const form = document.querySelector("#teacher-form");
                if (form) {
                  const submitEvent = new Event("submit", {
                    bubbles: true,
                    cancelable: true,
                  });
                  form.dispatchEvent(submitEvent);
                }
              }}
            >
              {loading ? "Adding..." : "Add Teacher"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacherModal;
