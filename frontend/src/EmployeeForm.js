import React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFormik } from "formik";

const EmployeeForm = ({ values, handleChange, handleSubmit, isSubmitting }) => (
  <SiteWrapper>
    <Page.Card title="Employee Registration" />

    <Grid.Col md={6} lg={6} className="align-self-center">
      <Form onSubmit={handleSubmit}>

        <FormGroup>
          <Label>Employee ID</Label>
          <Input name="id" value={values.id} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Name</Label>
          <Input name="name" value={values.name} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input type="email" name="email" value={values.email} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input name="phone_number" value={values.phone_number} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Address</Label>
          <Input name="address" value={values.address} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Department</Label>
          <Input type="select" name="department" value={values.department} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Designation</Label>
          <Input type="select" name="designation" value={values.designation} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="DevOps Consultant">DevOps Consultant</option>
            <option value="Manager">Manager</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Office Location</Label>
          <Input type="select" name="office_location" value={values.office_location} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Delhi">Delhi</option>
            <option value="Noida">Noida</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Joining Date</Label>
          <Input
            type="date"
            name="joining_date"
            value={values.joining_date}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Status</Label>
          <Input type="select" name="status" value={values.status} onChange={handleChange} required>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Salary (Annual)</Label>
          <Input
            type="number"
            name="salary"
            value={values.salary}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button color="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>

      </Form>
    </Grid.Col>
  </SiteWrapper>
);

export default withFormik({
  mapPropsToValues() {
    return {
      id: "",
      name: "",
      email: "",
      phone_number: "",
      address: "",
      department: "",
      designation: "",
      office_location: "",
      joining_date: "",
      salary: "",
      status: "ACTIVE"
    };
  },

  async handleSubmit(values, { resetForm, setSubmitting }) {
    try {
      console.log("Submitting form:", values);

      // =========================
      // EMPLOYEE API
      // =========================
      const empRes = await fetch("/api/v1/employee/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: values.id,
          name: values.name,
          email: values.email,
          phone_number: values.phone_number,
          address: values.address,
          department: values.department,
          designation: values.designation,
          office_location: values.office_location,
          joining_date: values.joining_date,
          status: values.status
        })
      });

      if (!empRes.ok) {
        const text = await empRes.text();
        throw new Error(`Employee API error: ${text}`);
      }

      // =========================
      // SALARY API (SPRING BOOT)
      // =========================
      const salRes = await fetch("/api/v1/salary/create/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: values.id,
          name: values.name,
          salary: Number(values.salary),
          status: values.status,
          processDate: values.joining_date
        })
      });

      if (!salRes.ok) {
        const text = await salRes.text();
        throw new Error(`Salary API error: ${text}`);
      }

      // =========================
      // 🔔 NOTIFICATION API (EMAIL)
      // =========================
      await fetch("/api/v1/notification/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: values.id,
          name: values.name,
          email: values.email
        })
      });

      alert("✅ Employee, Salary & Notification processed successfully!");
      resetForm();

    } catch (err) {
      console.error(err);
      alert(`❌ Submission failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }
})(EmployeeForm);

