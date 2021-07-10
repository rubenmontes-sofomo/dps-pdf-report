import React, { useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { Line } from "@ant-design/charts";
import MyDocument from "./components/my-document";
import IncomePortfolioPDFTemplate from "./components/income-portfolio-pdf";

function App() {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  return (
    <div>
      <div className="chart">
        <Line {...config} />
      </div>
      {/* <BlobProvider document={<MyDocument />}> */}
      <BlobProvider document={<IncomePortfolioPDFTemplate />}>
        {({ url, loading, error }) => {
          if (url) {
            return (
              <a href={url} target="_blank">
                Download PDF
              </a>
            );
          }
          return <div>No download link</div>;
        }}
      </BlobProvider>
    </div>
  );
}

export default App;
