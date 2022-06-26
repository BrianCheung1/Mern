import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>{props.record.salary}</td>
    <td>
      <Link to={`/edit/${props.record._id}`}>
        <Button variant="outline-primary">Edit</Button>
      </Link>
      {' '}
      <Button
        variant="outline-primary"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h3>Record List</h3>
        </Col>
        </Row>
        <Row>
          <Col>
            <Table responsivie="sm" bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>level</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{recordList()}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
