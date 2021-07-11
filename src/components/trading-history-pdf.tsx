import React from "react";
import { View, Text } from "@react-pdf/renderer";
import type { Header, TradingHistory } from "./income-portfolio-pdf";

type TradingHistoryPDFProps = {
  tradingHistory: TradingHistory[];
  headerConfig: Header[];
  styles: any;
};

const TradingHistoryPDF = ({
  tradingHistory,
  headerConfig,
  styles,
}: TradingHistoryPDFProps) => {
  const tableHeaders = headerConfig.map((header) => (
    <View
      key={`header-${header.dataIndex}`}
      style={{ ...styles.tableHeader, width: `${100 / headerConfig.length}%` }}
    >
      <Text>{header.title}</Text>
    </View>
  ));

  const tableBody = tradingHistory.map(
    (
      trade: any, // TODO: remove any
      index
    ) => (
      <View key={`row-${trade.id}-${index}`} style={styles.tableRow}>
        {headerConfig.map((header, index) => {
          let text;

          if (header.dataIndex instanceof Array) {
            const [type, dataIndex] = header.dataIndex;
            text = trade[type][dataIndex];
          } else {
            text = trade[header.dataIndex];
          }

          return (
            <View
              key={`cell-${trade.id}-${index}`}
              style={{
                ...styles.tableCell,
                width: `${100 / headerConfig.length}%`,
              }}
            >
              <Text>{text}</Text>
            </View>
          );
        })}
      </View>
    )
  );

  return (
    <View style={styles.table}>
      <Text style={styles.header}>Trading History</Text>
      <View style={styles.tableHeaders}>
        <View style={{ width: "20%" }}></View>
        <View style={styles.tableSpecialHeader}>
          <Text>SELL</Text>
        </View>
        <View style={styles.tableSpecialHeader}>
          <Text>BUY</Text>
        </View>
      </View>
      {tableHeaders && <View style={styles.tableHeaders}>{tableHeaders}</View>}
      {tableBody && <View style={styles.tableBody}>{tableBody}</View>}
    </View>
  );
};

export default TradingHistoryPDF;
