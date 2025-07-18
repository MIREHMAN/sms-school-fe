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
import { AssignmentService } from "@/services/AssignmentService";
import { useAsyncFn } from "@/hooks/useAsync";

const AddAssignmentModal = ({ open, onClose }) => {
  const initialValues = {
    title: "",
    description: "",
    due_date: "",
    subject: "",
    file: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    due_date: Yup.date().required("Due date is required"),
    subject: Yup.string().required("Subject is required"),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    AssignmentService.addAssignment(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      }

      await execute(formData);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create assignment:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Assignment</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create assignment"}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <Field
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="border px-3 py-2 rounded w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className="border px-3 py-2 rounded w-full"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="due_date"
                  type="date"
                  className="border px-3 py-2 rounded w-full"
                />
                <ErrorMessage
                  name="due_date"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="border px-3 py-2 rounded w-full"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <input
                  name="file"
                  type="file"
                  onChange={(event) =>
                    setFieldValue("file", event.currentTarget.files[0])
                  }
                  className="block w-full text-sm text-gray-500"
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
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignmentModal;
