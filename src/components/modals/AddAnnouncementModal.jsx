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
import { AnnouncementService } from "@/services/AnnouncementService"; // You need to create this service file
import { useAsyncFn } from "@/hooks/useAsync";

const AddAnnouncementModal = ({ open, onClose }) => {
  const initialValues = {
    title: "",
    message: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    message: Yup.string().required("Message is required"),
    date: Yup.date().required("Date is required"),
  });

  const { loading, error, execute } = useAsyncFn((data) =>
    AnnouncementService.addAnnouncement(data)
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        date: new Date(values.date).toISOString().split("T")[0],
      };
      await execute(formattedValues);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create announcement:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Announcement</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error?.data?.error || "Failed to create announcement"}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div className="grid gap-4">
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
                  name="message"
                  as="textarea"
                  placeholder="Message"
                  className="border px-3 py-2 rounded w-full h-24"
                />
                <ErrorMessage
                  name="message"
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
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Announcement"}
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddAnnouncementModal;
