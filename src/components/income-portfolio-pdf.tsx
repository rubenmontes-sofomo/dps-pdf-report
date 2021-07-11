import React, { useEffect } from "react";
import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  Image,
} from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import PortfolioHoldingsPDF from "./portfolio-holdings-pdf";
import TradingHistoryPDF from "./trading-history-pdf";

export type PortfolioHolding = {
  id: number;
  fundName: string;
  ticker: string;
  purchasePrice: number;
  currentPrice: number;
  currentTradeReturn: number;
  tradeDate: string;
  positionYtdReturn: number;
};

export type TradingHistory = {
  id: number;
  tradeDate: string;
  buy: {
    fundName: string;
    ticker: string;
  };
  sell: {
    fundName: string;
    ticker: string;
  };
};

export type Header = {
  title: string;
  dataIndex: any; // TODO: remove
  align?: string;
  width?: string;
};

const portFolioHoldings: PortfolioHolding[] = [
  {
    id: 1,
    currentPrice: 24.54,
    currentTradeReturn: 5.02,
    fundName: "Columbia Convertible",
    positionYtdReturn: 5.23,
    purchasePrice: 20.68,
    ticker: "PACIX",
    tradeDate: "05/08/2020",
  },
  {
    id: 2,
    fundName: "Columbia Convertible",
    ticker: "PACIX",
    purchasePrice: 24.54,
    currentPrice: 24.54,
    currentTradeReturn: 5.02,
    tradeDate: "03/07/2020",
    positionYtdReturn: -6.61,
  },
];

const tradingHistory: TradingHistory[] = [
  {
    id: 3,
    tradeDate: "03/07/2020",
    buy: {
      fundName: "Columbia Convertible",
      ticker: "PACIX",
    },
    sell: {
      fundName: "Columbia Convertible",
      ticker: "PACIX",
    },
  },
];

const holdingsHeaders: Header[] = [
  {
    title: "Position",
    align: "center" as const,
    dataIndex: "id",
  },
  {
    title: "Fund Name",
    dataIndex: "fundName",
  },
  {
    title: "Ticker",
    dataIndex: "ticker",
    align: "center" as const,
  },
  {
    title: "Purchase Price",
    dataIndex: "purchasePrice",
    align: "center" as const,
  },
  {
    title: "Current Price",
    dataIndex: "currentPrice",
    align: "center" as const,
  },
  {
    title: "Current Trade Return",
    dataIndex: "currentTradeReturn",
    align: "center" as const,
  },
  {
    title: "Trade Date",
    dataIndex: "tradeDate",
    align: "center" as const,
  },
  {
    title: "Position YTD Return",
    dataIndex: "positionYtdReturn",
    align: "center" as const,
  },
];

const tradingHistoryHeaders: Header[] = [
  {
    title: "Trade Date",
    width: "10%",
    dataIndex: "tradeDate",
    align: "center" as const,
  },
  {
    title: "Position",
    width: "10%",
    dataIndex: "id",
    align: "center" as const,
  },
  {
    title: "Fund Name",
    width: "30%",
    dataIndex: ["sell", "fundName"],
  },
  {
    title: "Ticker",
    width: "10%",
    dataIndex: ["sell", "ticker"],
    align: "center" as const,
  },
  {
    title: "Fund Name",
    width: "30%",
    dataIndex: ["buy", "fundName"],
  },
  {
    title: "Ticker",
    width: "10%",
    dataIndex: ["buy", "ticker"],
    align: "center" as const,
  },
];

const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#f0f2f5",
    padding: 20,
  },
  view: {},
  logo: {
    textAlign: "right",
    marginBottom: 20,
  },
  table: { fontSize: 10, marginBottom: 30 },
  header: { fontSize: 13, marginBottom: 10, fontWeight: "bold" },
  tableHeaders: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fafafa",
    alignItems: "center",
    textAlign: "center",
  },
  tableHeader: {
    // width: `${100 / holdingsHeaders.length}%`,
    padding: 7,
  },
  tableSpecialHeader: {
    width: "40%",
    padding: 2,
    color: "#adadad",
    textAlign: "center",
  },
  tableBody: {
    display: "flex",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    textAlign: "center",
  },
  tableCell: { width: `${100 / holdingsHeaders.length}%`, padding: 5 },
});

const generateChartPNGUrl = async (selector = ".chart"): Promise<string> => {
  const node: HTMLElement | null = document.querySelector(selector);

  if (node) {
    const canvas = await html2canvas(node);
    return canvas.toDataURL();
  }
  return "";
};

const IncomePortfolioPDFTemplate = (): JSX.Element => {
  const [imageURL, setImageURL] = React.useState<string>("");

  useEffect(() => {
    const getImageURL = async () => {
      const url = await generateChartPNGUrl();
      setImageURL(url);
    };

    getImageURL();
  });

  return (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.logo}>
          <Text>Placeholder for logo</Text>
        </View>
        <View>
          <Image src={imageURL} />
        </View>
      </Page>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.logo}>
          <Text>Placeholder for logo</Text>
        </View>
        <View>
          <PortfolioHoldingsPDF
            portfolioHoldings={portFolioHoldings}
            headerConfig={holdingsHeaders}
            styles={pdfStyles}
          />
        </View>
        <View>
          <TradingHistoryPDF
            tradingHistory={tradingHistory}
            headerConfig={tradingHistoryHeaders}
            styles={pdfStyles}
          />
        </View>
      </Page>
    </Document>
  );
};

export default IncomePortfolioPDFTemplate;
