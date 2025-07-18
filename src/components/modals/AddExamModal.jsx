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
import { ExamService } from "@/services/ExamService";
import { useAsyncFn } from "@/hooks/useAsync";
fields = ['id', 'subject','className', 'year','type','date', 'time', 'duration', 'location','color']
const AddExamModal = ({ open, onClose }) => {
  const initialValues = {
    id: "",
    subject: "",
    className: "",
    year: "",
    type: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    color: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    date: Yup.date().required("Date is required"),
    total_marks: Yup.number()
      .required("Total marks required")
      .positive("Marks must be positive"),
    subject: Yup.string().required("Subject is required"),
    description: Yup.string(),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    ExamService.addExam(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await execute(values);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create exam:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Exam</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create exam"}
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
                name="title"
                type="text"
                placeholder="Exam Title"
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
                name="date"
                type="date"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                name="total_marks"
                type="number"
                placeholder="Total Marks"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="total_marks"
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

export default AddExamModal;
