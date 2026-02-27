import React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

class ListEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadData() {
    fetch("/api/v1/attendance/search/all")
      .then(response => response.json())
      .then(data => {
        console.log("📥 Attendance list:", data);
        this.setState({ data: data });
      })
      .catch(err => console.error("Fetch error:", err));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Attendance List" />
        <Grid.Col md={6} lg={10} className="align-self-center">
          <Table>
            <Table.Header>
              <Table.ColHeader>Employee ID</Table.ColHeader>
              <Table.ColHeader>Name</Table.ColHeader>
              <Table.ColHeader>Status</Table.ColHeader>
              <Table.ColHeader>Date</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {this.state.data.map((item, i) => (
                <Table.Row key={i}>
                  <Table.Col>{item.id}</Table.Col>
                  <Table.Col>{item.name}</Table.Col>
                  <Table.Col>{item.status}</Table.Col>
                  <Table.Col>{item.date}</Table.Col>
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

