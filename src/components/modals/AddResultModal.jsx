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
import { ResultService } from "@/services/ResultService";
import { useAsyncFn } from "@/hooks/useAsync";

const AddResultModal = ({ open, onClose }) => {
  const initialValues = {
    student: "",
    exam: "",
    score: "",
    remarks: "",
  };

  const validationSchema = Yup.object({
    student: Yup.string().required("Student is required"),
    exam: Yup.string().required("Exam is required"),
    score: Yup.number()
      .required("Score is required")
      .min(0, "Score cannot be negative"),
    remarks: Yup.string(),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    ResultService.addResult(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await execute(values);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create result:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Result</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create result"}
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
                name="student"
                type="text"
                placeholder="Student ID"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="student"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                name="exam"
                type="text"
                placeholder="Exam ID"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="exam"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                name="score"
                type="number"
                placeholder="Score"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="score"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                name="remarks"
                as="textarea"
                placeholder="Remarks"
                className="border px-3 py-2 rounded w-full"
              />
              <ErrorMessage
                name="remarks"
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

export default AddResultModal;
