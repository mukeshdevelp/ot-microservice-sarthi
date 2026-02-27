import React, { useState, useEffect } from "react";
import { Grid, StatsCard, Card } from "tabler-react";
import C3Chart from "react-c3js";
import "c3/c3.css";

/* ================= COMMON FETCH ================= */

function useEmployees() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/v1/employee/search/all")
      .then((res) => res.json())
      .then((d) => setData(Array.isArray(d) ? d : []))
      .catch((err) => {
        console.error("Employee fetch failed:", err);
        setData([]);
      });
  }, []);

  return data;
}

/* ================= TOTAL EMPLOYEES ================= */

export function ListAllEmployees() {
  const employees = useEmployees();

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={employees.length}
        label="Total Employees"
      />
    </Grid.Col>
  );
}

/* ================= ACTIVE EMPLOYEES ================= */

export function ListEmployeeActiveEmployee() {
  const employees = useEmployees();
  const active = employees.filter((e) => e.status === "ACTIVE").length;

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={active}
        label="Active Employees"
      />
    </Grid.Col>
  );
}

/* ================= INACTIVE EMPLOYEES ================= */

export function ListEmployeeInActiveEmployee() {
  const employees = useEmployees();
  const inactive = employees.filter((e) => e.status === "INACTIVE").length;

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={inactive}
        label="Inactive Employees"
      />
    </Grid.Col>
  );
}

/* ================= DESIGNATION DISTRIBUTION ================= */

export function RoleDistribution() {
  const employees = useEmployees();

  const map = {};
  employees.forEach((e) => {
    if (e.designation) {
      map[e.designation] = (map[e.designation] || 0) + 1;
    }
  });

  const columns = Object.keys(map).map((k) => [k, map[k]]);

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Designation Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          {columns.length === 0 ? (
            <div style={{ textAlign: "center", color: "#777" }}>
              No designation data
            </div>
          ) : (
            <C3Chart
              style={{ height: "14rem" }}
              data={{ type: "donut", columns }}
              donut={{ title: "Designations" }}
            />
          )}
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

/* ================= EMPLOYEE STATUS DISTRIBUTION ================= */

function EmployeeDistribution() {
  const employees = useEmployees();

  let active = 0;
  let inactive = 0;

  employees.forEach((e) => {
    if (e.status === "ACTIVE") active++;
    if (e.status === "INACTIVE") inactive++;
  });

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Employees Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "14rem" }}
            data={{
              type: "donut",
              columns: [
                ["Active", active],
                ["Inactive", inactive],
              ],
            }}
            donut={{ title: "Status" }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

/* ✅ EXPORT ALIAS (fixes HomePage import error) */
export const StatusDistribution = EmployeeDistribution;

/* ================= LOCATION DISTRIBUTION ================= */

export function LocationDistribution() {
  const employees = useEmployees();

  const map = {};
  employees.forEach((e) => {
    if (e.office_location) {
      map[e.office_location] = (map[e.office_location] || 0) + 1;
    }
  });

  const columns = Object.keys(map).map((k) => [k, map[k]]);

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Locations Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          {columns.length === 0 ? (
            <div style={{ textAlign: "center", color: "#777" }}>
              No location data
            </div>
          ) : (
            <C3Chart
              style={{ height: "14rem" }}
              data={{ type: "donut", columns }}
              donut={{ title: "Locations" }}
            />
          )}
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

