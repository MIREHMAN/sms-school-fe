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
import { ClassroomService } from "@/services/ClassroomService";
import { useAsyncFn } from "@/hooks/useAsync";

const AddClassModal = ({ open, onClose }) => {
  const initialValues = {
    name: "",
    grade: "",
    section: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Class name is required"),
    grade: Yup.string().required("Grade is required"),
    section: Yup.string().required("Section is required"),
    description: Yup.string().optional(),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    ClassroomService.addClassroom(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await execute(values);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create class:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create class"}
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
                name="name"
                type="text"
                placeholder="Class Name"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                name="grade"
                type="text"
                placeholder="Grade (e.g., 6, 7, 8)"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="grade"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                name="section"
                type="text"
                placeholder="Section (e.g., A, B)"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="section"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Optional Description"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs mt-1"
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

export default AddClassModal;
