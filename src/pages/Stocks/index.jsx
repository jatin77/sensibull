import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { csvJSON } from "../../utility/commonFunctions";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Fuse from "fuse.js";
import { useNavigate } from "react-router";
import PageContainer from "../../components/common/PageContainer";
import { BASE_URL } from "../../utility/constants";
import { AiOutlineFileSearch } from "react-icons/ai";

const Stocks = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getStocksCsv();
  }, []);

  const getStocksCsv = async () => {
    const res = await axios.get(`${BASE_URL}instruments`, {
      responseType: "blob",
    });
    res.data.text().then((csvStr) => {
      const jsonObj = csvJSON(csvStr);
      setStocks(jsonObj);
    });
  };

  const renderStocks = () => {
    if (stocks?.length && query?.trim()?.length) {
      const fuse = new Fuse(stocks, {
        keys: ["Symbol", "Name"],
      });
      return fuse.search(query)?.map(({ item }) => item);
    }
    return stocks;
  };

  const handleNavigateToQuotes = (symbol) => {
    navigate(`/quotes/${symbol}`);
  };

  return (
    <PageContainer pageHeading="Stocks">
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <AiOutlineFileSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Amount (to the nearest dollar)"
        />
        {query?.trim()?.length ? (
          <InputGroup.Text>{renderStocks()?.length} found</InputGroup.Text>
        ) : null}
      </InputGroup>
      <Table striped bordered hover>
        {renderStocks()?.length ? (
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
        ) : null}
        <tbody>
          {renderStocks()?.map(({ Symbol, Name, Sector }) => (
            <tr key={Symbol}>
              <td
                className="cursor-pointer"
                onClick={() => handleNavigateToQuotes(Symbol)}
              >
                {Symbol}
              </td>
              <td>{Name}</td>
              <td>{Sector}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default Stocks;
