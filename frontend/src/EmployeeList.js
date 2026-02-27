import React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

class ListEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  loadData() {
    // ✅ Employee API via NGINX
    fetch("/api/v1/employee/search/all")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch employee list");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ data });
      })
      .catch(err => console.error("Employee list error:", err));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Employee List" />

        <Grid.Col md={6} lg={10} className="align-self-center">
          <Table>
            <Table.Header>
              <Table.ColHeader>Employee ID</Table.ColHeader>
              <Table.ColHeader>Name</Table.ColHeader>
              <Table.ColHeader>Email</Table.ColHeader>
              <Table.ColHeader>Phone Number</Table.ColHeader>
              <Table.ColHeader>Department</Table.ColHeader>
              <Table.ColHeader>Designation</Table.ColHeader>
              <Table.ColHeader>Office Location</Table.ColHeader>
              <Table.ColHeader>Joining Date</Table.ColHeader>
              <Table.ColHeader>Status</Table.ColHeader>
            </Table.Header>

            <Table.Body>
              {this.state.data.map((item, i) => (
                <Table.Row key={i}>
                  <Table.Col>{item.id}</Table.Col>
                  <Table.Col>{item.name}</Table.Col>
                  <Table.Col>{item.email}</Table.Col>
                  <Table.Col>{item.phone_number}</Table.Col>
                  <Table.Col>{item.department}</Table.Col>
                  <Table.Col>{item.designation}</Table.Col>
                  <Table.Col>{item.office_location}</Table.Col>
                  <Table.Col>{item.joining_date}</Table.Col>
                  <Table.Col>{item.status}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default ListEmployee;
