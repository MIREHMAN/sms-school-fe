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
    class_id: "", // Changed from classroom to class_id for clarity
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

  useEffect(() => {
    if (open) {
      fetchClasses();
    }
  }, [open]);

  const fetchClasses = async () => {
    setFetchClassesLoading(true);
    setFetchError(null);
    try {
      const response = await ClassService.getAllClasses();
      
      // Ensure we only use id and class_name
      const classesData = (Array.isArray(response) ? response : response?.data || [])
        .map(classItem => ({
          id: classItem.id,
          class_name: classItem.class_name || classItem.name || 'Unnamed Class'
        }));
      
      setClasses(classesData);
      console.log("Classes data:", classesData);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setFetchError("Failed to load classes. Please try again.");
      setClasses([]);
    } finally {
      setFetchClassesLoading(false);
    }
  };

  const { loading, error, execute } = useAsyncFn(async (formData) => {
    const response = await StudentService.addStudent(formData);
    return response;
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      username: values.username,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone,
      date_of_birth: new Date(values.dob).toISOString().split("T")[0],
      address: "N/A",
      class_id: values.class_id, // Using class_id instead of classroom
    };

    try {
      await execute(payload);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Student creation failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>

        {(error || fetchError) && (
          <p className="text-red-600 text-sm mb-2">
            {error?.message || fetchError || "Something went wrong"}
          </p>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            {/* Credentials */}
            <div className="grid gap-2">
              <Field
                name="username"
                placeholder="Username"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
            </div>

            {/* Personal Info */}
            <div className="grid gap-2">
              <Field
                name="first_name"
                placeholder="First Name"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage name="first_name" component="div" className="text-red-500 text-xs" />

              <Field
                name="last_name"
                placeholder="Last Name"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage name="last_name" component="div" className="text-red-500 text-xs" />

              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />

              <Field
                name="phone"
                placeholder="Phone"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />

              <Field
                name="dob"
                type="date"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage name="dob" component="div" className="text-red-500 text-xs" />
            </div>

            {/* Class Selection - Simplified */}
            <div className="grid gap-2">
              <label htmlFor="class_id" className="text-sm font-medium">
                Class
              </label>
              {fetchClassesLoading ? (
                <p>Loading classes...</p>
              ) : classes.length === 0 ? (
                <p className="text-yellow-600">No classes available</p>
              ) : (
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
              )}
              <ErrorMessage name="class_id" component="div" className="text-red-500 text-xs" />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || fetchClassesLoading || classes.length === 0}
              >
                {loading ? "Adding..." : "Add Student"}
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;