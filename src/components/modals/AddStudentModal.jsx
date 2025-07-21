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
import { useAsyncFn } from "@/hooks/useAsync";

const AddStudentModal = ({ open, onClose }) => {
  const initialValues = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6).required("Password is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    dob: Yup.date().required("Date of birth is required"),
  });

  const { loading, error, execute } = useAsyncFn(async (formData) => {
    const response = await StudentService.addStudent(formData);
    console.log("API Response:", response);
    return response;
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      ...values,
      dob: new Date(values.dob).toISOString().split("T")[0],
    };
    console.log("Submitting payload to API:", payload);

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

        {error && (
          <p className="text-red-600 text-sm mb-2">
            {error?.message || "Something went wrong"}
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

              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
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

            {/* Footer */}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
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
