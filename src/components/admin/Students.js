import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Menu, Item, Separator, Submenu, MenuProvider } from "react-contexify";

import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import { FaArrowAltCircleRight, FaMap, FaPlusCircle } from "react-icons/fa";
import "./Students.css";

const selectOptions = {
  0: "Dispatched",
  1: "Finished"
};
const defaultSorted = [
  {
    dataField: "name",
    order: "desc"
  }
];

const data = [
  {
    firstname: "Mohammed",
    last: "Fenertepe",
    email: "m.mohammed@esi-sba.dz",
    role: "Tanır Nalbant",
    level: "-",
    status: selectOptions[0]
  },
  {
    name: "Ahmed",
    vehicle: "Boğazköy",
    time: "13:11",
    driver: "Selçuk Yurt",
    helper: "-",
    performance: "58 / 85",
    status: selectOptions[1]
  },
  {
    name: "Youcef",
    vehicle: "Başakşehir",
    time: "07:30",
    driver: "Emri Akça",
    helper: "-",
    performance: "108 / 148",
    status: selectOptions[1]
  },
  {
    name: "Djamel",
    vehicle: "4. 5. Etap",
    time: "07:30",
    driver: "Yaşar Demir",
    helper: "-",
    performance: "121 / 138",
    status: selectOptions[1]
  },
  {
    name: "Meriem",
    vehicle: "Kayaşehir",
    time: "07:30",
    driver: "Ömer Osman Ekiz",
    helper: "-",
    performance: "97 / 146",
    status: selectOptions[1]
  },
  {
    name: "Aya",
    vehicle: "Bahçeşehir",
    time: "07:30",
    driver: "Murat Uçanoğlu",
    helper: "-",
    performance: "55 / 107",
    status: selectOptions[1]
  },
  {
    name: "Mohammed",
    vehicle: (
      <Popup
        trigger={<div className="menu-item">Student</div>}
        position="right top"
        on="click"
        closeOnDocumentClick
        contentStyle={{ padding: "0px", border: "none" }}
      >
        <div className="menu">
          <div className="menu-item">Team Leader</div>
          <div className="menu-item">Team member</div>
        </div>
      </Popup>
    ),
    firstname: "Mohammed",
    last: "Fenertepe",
    email: "m.mohammed@esi-sba.dz",
    role: "Teacher",
    level: "-",
    status: selectOptions[1]
  }
];
const columns = [
  {
    dataField: "name",
    text: "Name",
    sort: true,
    filter: textFilter({
      placeholder: "Search"
    }),
    classes: "cellWeight600"
  },
  {
    dataField: "vehicle",
    text: "Vehicle",
    sort: true,
    filter: textFilter({
      placeholder: "Search"
    }),
    classes: "pointer",
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        console.log(e);
      }
    }
  },
  {
    dataField: "time",
    text: "Time",
    sort: true,
    filter: textFilter({
      placeholder: "Search"
    })
  },
  {
    dataField: "driver",
    text: "Driver",
    sort: true,
    filter: textFilter({
      placeholder: "Search"
    })
  },
  {
    dataField: "helper",
    text: "Helper",
    sort: true,
    filter: textFilter({
      placeholder: "Search"
    })
  },
  {
    dataField: "performance",
    text: "Performance",
    sort: true,
    filter: textFilter({
      placeholder: "Search"
    })
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    filter: textFilter({
      placeholder: "Search"
    }),
    classes: function callback(cell) {
      return cell;
    }
  }
];

const handlesClick = function(name) {
  console.log(name);
};

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleClick() {
    this.setState(state => ({
      //set the state for icons
    }));
    console.log(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <FaMap onClick={this.handleClick} className="icon map" />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          <FaArrowAltCircleRight
            onClick={this.handleClick}
            className="icon arrowL"
          />
          <FaPlusCircle onClick={this.handleClick} className="icon plus" />
          <h6>Routes</h6>
          <BootstrapTable
            classes="customBootStrapClasses"
            bordered={false}
            bootstrap4={true}
            hover={true}
            keyField="driver"
            data={data}
            columns={columns}
            defaultSorted={defaultSorted}
            filter={filterFactory()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Students;
