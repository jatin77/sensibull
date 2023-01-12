import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Table from "react-bootstrap/Table";
import axios from "axios";
import QuoteItem from "./QuoteItem";
import PageContainer from "../../components/common/PageContainer";
import { BASE_URL, TIME_ORDER } from "../../utility/constants";
import uuid from "react-uuid";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import Alert from "react-bootstrap/Alert";

const Quotes = () => {
  const { symbol } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [order, setOrder] = useState(TIME_ORDER.ASCENDING);

  useEffect(() => {
    if (symbol) fetchQuotes();
  }, [symbol]);

  const getExpiry = (valid_till) => {
    const validTillTime = new Date(valid_till);
    const currentTime = new Date();
    return validTillTime.getTime() - currentTime.getTime();
  };

  const fetchQuotes = () => {
    axios.get(`${BASE_URL}quotes/${symbol}`).then((res) => {
      const { payload, success } = res?.data;
      if (success)
        setQuotes(
          payload[symbol]?.map((item) => ({
            ...item,
            delay: getExpiry(item?.valid_till),
            id: uuid(),
          }))
        );
    });
  };

  const handleSort = (a, b) => {
    return order === TIME_ORDER.ASCENDING
      ? new Date(a.time) - new Date(b.time)
      : new Date(b.time) - new Date(a.time);
  };

  return (
    <PageContainer
      pageHeading={
        <>
          Quotes for <span className="text-primary">{symbol}</span>
        </>
      }
    >
      {quotes?.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Price</th>
              <th className="d-flex justify-content-between">
                <span>Time</span>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setOrder(
                      order === TIME_ORDER.ASCENDING
                        ? TIME_ORDER.DESCENDING
                        : TIME_ORDER.ASCENDING
                    )
                  }
                >
                  {order === TIME_ORDER.ASCENDING ? (
                    <HiSortDescending />
                  ) : (
                    <HiSortAscending />
                  )}
                </span>
              </th>
              <th>Valid Till</th>
            </tr>
          </thead>
          <tbody>
            {quotes
              ?.sort((a, b) => handleSort(a, b))
              ?.map((quote) => (
                <QuoteItem quote={quote} key={quote?.time} />
              ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted mb-0">No Quotes found</p>
      )}
    </PageContainer>
  );
};

export default Quotes;
