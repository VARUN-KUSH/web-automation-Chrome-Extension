import "./main.css";
import React, { useState } from "react";
import { del } from "./images/index";
import { Storage } from "@plasmohq/storage";


export default Automate = () => {
  const [rows, setRows] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const storage = new Storage();

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        Firstname: "",
        Lastname: "",
        Passportnumber: "",
        Residenceaddress: "",
        phone: "",
        email: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleAddMultipleRows = () => {
    const newRows = Array.from({ length: numRows }, () => ({
      Firstname: "",
      Lastname: "",
      Passportnumber: "",
      Residenceaddress: "",
      phone: "",
      email: "",
    }));
    setRows([...rows, ...newRows]);
    setNumRows(0);
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  
  const handleSaveToLocalStorage = async() => {
    console.log(rows)
    await storage.set("usersdata", rows)
    alert('Data saved to local storage!');
    };


  return (
    <div className="excel-component">
      <div className="controls">
        <button onClick={handleAddRow}>Add Row</button>
        <input
          type="number"
          value={numRows}
          onChange={(e) => setNumRows(e.target.value)}
          placeholder="Number of rows"
        />
        <button onClick={handleAddMultipleRows}>Add Multiple Rows</button>
        <button onClick={handleSaveToLocalStorage}>Save</button>
      </div>
      <table className="excel-table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Passport number</th>
            <th>Residence address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.Firstname}
                  onChange={(e) => handleChange(index, "Firstname", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.Lastname}
                  onChange={(e) => handleChange(index, "Lastname", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.IDNP}
                  onChange={(e) => handleChange(index, "Passportnumber", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.Residenceaddress}
                  onChange={(e) => handleChange(index, "Residenceaddress", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.phone}
                  onChange={(e) => handleChange(index, "phone", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.email}
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                />
              </td>
              <button className="w-8" onClick={() => handleDeleteRow(index)}>
                <img src={del} alt="Delete" />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


