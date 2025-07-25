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
  });

  const { loading, error, execute } = useAsyncFn((data) =>
  TeacherService.addTeacher(data)
);

  const handleSubmit = async (values, { resetForm }) => {
  try {
    const formattedValues = {
      ...values,
      dob: new Date(values.dob).toISOString().split("T")[0],
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create teacher"}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            {/* User Info */}
            <div>
              <h3 className="text-sm font-semibold mb-2">User Info</h3>
              <div className="grid gap-2">
                <div>
                  <Field
                    name="username"
                    type="text"
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

            {/* Personal Info */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Personal Info</h3>
              <div className="grid gap-2">
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <Field
                      name="first_name"
                      type="text"
                      placeholder="First Name"
                      className="border px-3 py-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="w-1/2">
                    <Field
                      name="last_name"
                      type="text"
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
                    type="tel"
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

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-purple-500" type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacherModal;
