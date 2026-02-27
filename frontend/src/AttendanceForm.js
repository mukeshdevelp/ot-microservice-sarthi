import React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFormik } from "formik";

/* ================= COMPONENT ================= */
function AttendanceForm(props) {
  const values = props.values;
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  const isSubmitting = props.isSubmitting;

  return (
    <SiteWrapper>
      <Page.Card title="Employee Attendance"></Page.Card>

      <Grid.Col md={6} lg={6} className="align-self-center">
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <Label for="id">Employee ID</Label>
            <Input
              type="text"
              name="id"
              value={values.id}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="name">Employee Name</Label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              value={values.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <Button color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

        </Form>
      </Grid.Col>
    </SiteWrapper>
  );
}

/* ================= FORMIK WRAPPER ================= */
function mapPropsToValues() {
  return {
    id: "",
    name: "",
    status: "",
    date: ""
  };
}

function handleSubmit(values, formikBag) {
  const resetForm = formikBag.resetForm;
  const setSubmitting = formikBag.setSubmitting;

  const payload = {
    id: values.id.trim(),
    name: values.name.trim(),
    status: values.status.toLowerCase(),
    date: values.date
  };

  console.log("📤 Sending Attendance:", payload);

  fetch("/api/v1/attendance/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(function (res) {
      return res.text().then(function (text) {
        console.log("📥 Server response:", text);
        if (!res.ok) {
          throw new Error(text || "Server error");
        }
        return text;
      });
    })
    .then(function () {
      alert("✅ Attendance successfully stored in database!");
      resetForm();
    })
    .catch(function (err) {
      console.error("❌ Submission error:", err);
      alert("❌ Attendance NOT stored:\n" + err.message);
    })
    .finally(function () {
      setSubmitting(false);
    });
}

export default withFormik({
  mapPropsToValues: mapPropsToValues,
  handleSubmit: handleSubmit
})(AttendanceForm);

