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
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    classroom: "", // should match classroom ID
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    classroom: Yup.string().required("Classroom ID is required"),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    StudentService.addStudent(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log("Submitting student:", values);
      await execute(values);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Error submitting student:", err);
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
            {[
              { name: "first_name", type: "text", placeholder: "First Name" },
              { name: "last_name", type: "text", placeholder: "Last Name" },
              { name: "email", type: "email", placeholder: "Email" },
              { name: "phone_number", type: "text", placeholder: "Phone Number" },
              { name: "date_of_birth", type: "date", placeholder: "Date of Birth" },
              { name: "address", type: "text", placeholder: "Address" },
              { name: "classroom", type: "text", placeholder: "Classroom ID" },
            ].map(({ name, type, placeholder }) => (
              <div key={name}>
                <Field
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  className="border px-3 py-2 rounded w-full"
                />
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
            ))}

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
