import moment from "moment";
import React, { useEffect, useState } from "react";

const QuoteItem = ({ quote }) => {
  const { price, valid_till, time, delay } = quote;
  const [expired, setExpired] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpired(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [quote?.delay]);

  return (
    <>
      {expired && Math.sign(delay) !== -1 && (
        <tr key={time}>
          <td>{price.toFixed(2)}</td>
          <td>{moment(time).format("MMMM Do YYYY, h:mm:ss a")}</td>
          <td>{moment(valid_till).format("MMMM Do YYYY, h:mm a")}</td>
        </tr>
      )}
    </>
  );
};

export default QuoteItem;
