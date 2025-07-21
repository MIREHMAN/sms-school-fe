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
import { SubjectService } from "@/services/SubjectService";
import { useAsyncFn } from "@/hooks/useAsync";

const subjectTypeOptions = [
  { label: "Core", value: "CORE" },
  { label: "Elective", value: "ELECTIVE" },
];

const subjectStatusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

const AddSubjectModal = ({ open, onClose }) => {
  const initialValues = {
    subject_name: "",
    subject_code: "",
    subject_type: "CORE",
    subject_status: "ACTIVE",
  };

  const validationSchema = Yup.object({
    subject_name: Yup.string().required("Subject name is required"),
    subject_code: Yup.string().required("Subject code is required"),
    subject_type: Yup.string().oneOf(["CORE", "ELECTIVE"]),
    subject_status: Yup.string().oneOf(["ACTIVE", "INACTIVE"]),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    SubjectService.addSubject(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await execute(values);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create subject:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create subject"}
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
                name="subject_name"
                type="text"
                placeholder="Subject Name"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="subject_name"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <Field
                name="subject_code"
                type="text"
                placeholder="Subject Code"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="subject_code"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <Field
                as="select"
                name="subject_type"
                className="border px-3 py-2 rounded w-full"
              >
                {subjectTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="subject_type"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <Field
                as="select"
                name="subject_status"
                className="border px-3 py-2 rounded w-full"
              >
                {subjectStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="subject_status"
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

export default AddSubjectModal;
