import { useMemo, useState, React } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Button } from "react-bootstrap";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Country"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />

    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

function VirusTable() {
  const virusCountry = useSelector((state) => state.virusReducer.countries);

  // Handle Search
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState("");

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const filteredItems = virusCountry.filter(
    (item) =>
      item.Country &&
      item.Country.toLowerCase().includes(filterText.toLowerCase())
  );
  //

  //Table Columns
  const columns = useMemo(
    () => [
      {
        name: "#",
        cell: (row, index) => index + 1,
      },
      {
        selector: "Country",
        name: "Country",
        sortable: true,
      },
      {
        selector: "TotalConfirmed",
        name: "Confirmed",
        sortable: true,
      },
      {
        selector: "TotalRecovered",
        name: "Recovered",
        sortable: true,
      },
      {
        selector: "TotalDeaths",
        name: "Death",
        sortable: true,
      },
    ],
    []
  );

  const Export = ({ onExport }) => (
    <Button variant="dark" onClick={(e) => onExport(e.target.value)}>
      Export CSV
    </Button>
  );
  const convertArrayOfObjectsToCSV = (array) => {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(virusCountry[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };
  const downloadCSV = (array) => {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  };
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(virusCountry)} />,
    [virusCountry]
  );

  let history = useHistory();
  const handleCountry = (row) => {
    history.push({ pathname: `/country/${row.Slug}`, data: row, state: true });
  };

  return (
    <>
      <DataTable
        title="World Covid-19 Tracker"
        pagination
        highlightOnHover
        columns={columns}
        data={filteredItems}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 40, 50]}
        responsive
        actions={actionsMemo}
        striped
        pointerOnHover
        fixedHeader
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        onRowClicked={handleCountry}
      />
    </>
  );
}

export default VirusTable;
