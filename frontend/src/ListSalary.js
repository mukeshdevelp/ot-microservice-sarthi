import React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

class ListSalary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  loadData() {
    // ✅ Salary API via NGINX
    fetch("/api/v1/salary/search/all")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch salary list");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ data });
      })
      .catch(err => console.error("Salary list error:", err));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Salary List" />

        <Grid.Col md={6} lg={10} className="align-self-center">
          <Table>
            <Table.Header>
              <Table.ColHeader>Employee ID</Table.ColHeader>
              <Table.ColHeader>Name</Table.ColHeader>
              <Table.ColHeader>Salary</Table.ColHeader>
              <Table.ColHeader>Status</Table.ColHeader>
              <Table.ColHeader>Process Date</Table.ColHeader>
            </Table.Header>

            <Table.Body>
              {this.state.data.map((item, i) => (
                <Table.Row key={i}>
                  <Table.Col>{item.id}</Table.Col>
                  <Table.Col>{item.name}</Table.Col>
                  <Table.Col>{item.salary}</Table.Col>
                  <Table.Col>{item.status}</Table.Col>
                  <Table.Col>{item.processDate}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default ListSalary;
