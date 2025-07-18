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
['id','user','first_name','last_name', 'date_of_birth', 'email', 'phone_number', 'address','classroom']
const AddStudentModal = ({ open, onClose }) => {
  const initialValues = {
    id: "",
    user: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone_number: "",
    address: "",
    classroom: ""
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    classroom: Yup.string().required("Classroom is required"),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    StudentService.addStudent(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await execute(values);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create student:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create student"}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <Field
                name="first_name"
                type="text"
                placeholder="First Name"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <Field
                name="last_name"
                type="text"
                placeholder="Last Name"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-500 text-xs"
              />
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
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <Field
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <Field
                name="dob"
                type="date"
                placeholder="Date of Birth"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="dob"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <Field
                as="select"
                name="gender"
                className="border px-3 py-2 rounded w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <Field
                name="classroom"
                type="text"
                placeholder="Classroom ID"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="classroom"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
