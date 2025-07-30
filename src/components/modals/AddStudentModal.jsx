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
import { StudentService } from "@/services/StudentService";
import { ClassService } from "@/services/ClassService";
import { useAsyncFn } from "@/hooks/useAsync";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const AddStudentModal = ({ open, onClose }) => {
  const [classes, setClasses] = useState([]);
  const [fetchClassesLoading, setFetchClassesLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const initialValues = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    class_id: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6).required("Password is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    dob: Yup.date().required("Date of birth is required"),
    class_id: Yup.string().required("Class is required"),
  });

  const { loading, error, execute } = useAsyncFn(async (formData) => {
    const payload = {
      username: formData.username,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone,
      date_of_birth: new Date(formData.dob).toISOString().split("T")[0],
      address: "N/A", // Default value
      class_id: formData.class_id,
    };
    const response = await StudentService.addStudent(payload);
    return response;
  });

  const fetchClasses = async () => {
    setFetchClassesLoading(true);
    setFetchError(null);
    try {
      const response = await ClassService.getAllClasses();

      // Handle both possible response structures
      const classesData = (response?.results || response?.data || [])
        .filter((cls) => cls.id) // Ensure we only have valid classes
        .map((cls) => ({
          id: cls.id,
          class_name: cls.class_name || cls.name || "Unnamed Class",
        }));

      if (classesData.length === 0) {
        setFetchError("No classes available. Please create classes first.");
      }

      setClasses(classesData);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setFetchError("Failed to load classes. Please try again.");
      setClasses([]);
    } finally {
      setFetchClassesLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchClasses();
    }
  }, [open]);
const handleSubmit = async (values, { resetForm }) => {
  try {
    const payload = {
      username: values.username,
      password: values.password || undefined, // optional if empty
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone,
      date_of_birth: new Date(values.dob).toISOString().split("T")[0],
      address: "N/A",
      class_id: values.class_id,
    };

    if (student?.id) {
      await StudentService.updateStudent(student.id, payload);
    } else {
      await StudentService.addStudent(payload);
    }

    resetForm();
    onClose();
  } catch (err) {
    // already handled
  }
};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Error Messages */}
              {(error || fetchError) && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error?.message || fetchError}
                </div>
              )}

              {/* Credentials Section */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Credentials</h3>
                <div className="grid gap-3">
                  <div>
                    <Field
                      name="username"
                      placeholder="Username"
                      className="border px-3 py-2 rounded w-full"
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
                      className="border px-3 py-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Info Section */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Personal Information</h3>
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Field
                        name="first_name"
                        placeholder="First Name"
                        className="border px-3 py-2 rounded w-full"
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
                        placeholder="Last Name"
                        className="border px-3 py-2 rounded w-full"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="border px-3 py-2 rounded w-full"
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
                      placeholder="Phone"
                      className="border px-3 py-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Date of Birth
                    </label>
                    <Field
                      name="dob"
                      type="date"
                      className="border px-3 py-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Class Selection */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Class Assignment</h3>
                {fetchClassesLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2">Loading classes...</span>
                  </div>
                ) : classes.length === 0 ? (
                  <div className="bg-yellow-50 text-yellow-600 p-3 rounded-md text-sm">
                    No classes available. Please create classes first.
                  </div>
                ) : (
                  <div>
                    <Field
                      as="select"
                      name="class_id"
                      className="border px-3 py-2 rounded w-full"
                    >
                      <option value="">Select a class</option>
                      {classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.class_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="class_id"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || fetchClassesLoading || classes.length === 0
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Adding...
                    </>
                  ) : (
                    "Add Student"
                  )}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
