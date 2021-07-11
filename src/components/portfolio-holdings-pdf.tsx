import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PortfolioHolding, Header } from "./income-portfolio-pdf";

type PortfolioHoldingsPDFProps = {
  portfolioHoldings: PortfolioHolding[];
  headerConfig: Header[];
  styles: any;
};

const PortfolioHoldingsPDF = ({
  portfolioHoldings,
  headerConfig,
  styles,
}: PortfolioHoldingsPDFProps) => {
  const tableHeaders = headerConfig.map((header) => (
    <View
      key={`header-${header.dataIndex}`}
      style={{ ...styles.tableHeader, width: `${100 / headerConfig.length}%` }}
    >
      <Text>{header.title}</Text>
    </View>
  ));

  const tableBody = portfolioHoldings.map(
    (
      holding: any, // TODO: remove any
      index
    ) => (
      <View key={`row-${holding.id}-${index}`} style={styles.tableRow}>
        {headerConfig.map((header, index) => (
          <View key={`cell-${holding.id}-${index}`} style={styles.tableCell}>
            <Text>{holding[header.dataIndex]}</Text>
          </View>
        ))}
      </View>
    )
  );

  return (
    <View style={styles.table}>
      <Text style={styles.header}>Portfolio Holdings</Text>
      {tableHeaders && <View style={styles.tableHeaders}>{tableHeaders}</View>}
      {tableBody && <View style={styles.tableBody}>{tableBody}</View>}
    </View>
  );
};

export default PortfolioHoldingsPDF;
