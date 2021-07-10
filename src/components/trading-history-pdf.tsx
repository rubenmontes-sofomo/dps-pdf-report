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
  const specialHeaders = () => (
    <View style={styles.specialHeader}>
      <View style={{ width: "20%" }}></View>
      <View>
        <Text>SELL</Text>
      </View>
      <View>
        <Text>BUY</Text>
      </View>
    </View>
  );

  const tableHeader = headerConfig.map((column) => (
    <View key={`header-${column.dataIndex}`} style={styles.tableHeader}>
      <Text>{column.title}</Text>
    </View>
  ));

  const tableBody = tradingHistory.map(
    (
      holding: any, // TODO: remove any
      index
    ) => (
      <View key={`row-${holding.id}-${index}`} style={styles.tableRow}>
        {headerConfig.map((header, index) => (
          <View
            key={`cell-${holding.id}-${index}`}
            style={{
              ...styles.tableCell,
              width: `${100 / headerConfig.length}%`,
            }}
          >
            <Text>{holding[header.dataIndex]}</Text>
          </View>
        ))}
      </View>
    )
  );

  return (
    <View style={styles.table}>
      <Text style={styles.header}>Trading History</Text>
      <View style={styles.tableSpecialHeader}>
        <View style={{ width: "20%" }}></View>
        <View style={styles.tableSpecialHeaderColumn}>
          <Text>SELL</Text>
        </View>
        <View>
          <Text>BUY</Text>
        </View>
      </View>
      {/* {specialHeaders && (
        <View style={styles.specialHeaders}>{specialHeaders}</View>
      )} */}
      {tableHeader && <View style={styles.tableHeader}>{tableHeader}</View>}
      {tableBody && <View style={styles.tableBody}>{tableBody}</View>}
    </View>
  );
};

export default TradingHistoryPDF;
