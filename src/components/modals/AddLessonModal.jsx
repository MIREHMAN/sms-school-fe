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
import { LessonService } from "@/services/LessonService";
import { useAsyncFn } from "@/hooks/useAsync";
 ['id', 'title', 'grade', 'color', 'icon', 'objective',
                   'topics', 'videos', 'assignments', 'date', 'status']
const AddLessonModal = ({ open, onClose }) => {
  const initialValues = {
    id: "",
    title: "",
    grade: "",
    color: "",
    icon: "",
    objective: "",
    topics: "",
    videos: "",
    assignments: "",
    status: "",

  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    date: Yup.date().required("Date is required"),
    subject: Yup.string().required("Subject is required"),
    classroom: Yup.string().required("Classroom is required"),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    LessonService.addLesson(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await execute(values);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create lesson:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create lesson"}
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
                placeholder="Lesson Title"
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
                name="content"
                placeholder="Lesson Content"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="content"
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
                name="classroom"
                type="text"
                placeholder="Classroom"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="classroom"
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

export default AddLessonModal;
