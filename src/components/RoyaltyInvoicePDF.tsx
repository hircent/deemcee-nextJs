import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData } from "@/types/payment";
import LogoVer from "./LogoVer";

// Styles for the PDF document
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 30, fontFamily: "Helvetica" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    height: "80",
  },
  companyInfo: {
    flexDirection: "column",
    width: "50%",
  },
  companyName: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
  companyAddress: { fontSize: 10, marginBottom: 2 },
  companyWebsite: { fontSize: 10, marginBottom: 2 },
  companySSM: { fontSize: 10, marginBottom: 10 },
  logo: {
    width: "50%",
    justifyContent: "flex-end",
  },
  invoiceTitle: {
    fontSize: 22,
    color: "#4299e1",
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  invoiceToSection: { flexDirection: "column", width: "60%" },
  invoiceDetailsSection: {
    flexDirection: "column",
    width: "55%",
    alignItems: "flex-end",
  },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 6 },
  clientDetail: { fontSize: 10, marginBottom: 2 },
  invoiceDetail: { fontSize: 10, marginBottom: 4, flexDirection: "row" },
  invoiceDetailLabel: { fontWeight: "bold" },
  invoiceDetailValue: { fontWeight: "normal" },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginVertical: 15,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableHeader: { backgroundColor: "#D3EEFA", padding: 8 },
  tableCell: { padding: 4, fontSize: 10 },
  studentNameCell: { width: "20%", fontWeight: "bold", color: "#45A0E7" },
  studentNameCellValue: { width: "20%", fontWeight: "normal" },
  descriptionCell: { width: "35%", fontWeight: "bold", color: "#45A0E7" },
  descriptionCellValue: { width: "35%", fontWeight: "normal" },
  gradeCell: {
    width: "10%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#45A0E7",
  },
  gradeCellValue: { width: "10%", textAlign: "center", fontWeight: "normal" },
  dateCell: {
    width: "20%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#45A0E7",
  },
  dateCellValue: { width: "20%", textAlign: "center", fontWeight: "normal" },
  amountCell: {
    width: "15%",
    textAlign: "right",
    fontWeight: "bold",
    color: "#45A0E7",
  },
  amountCellValue: { width: "15%", textAlign: "right", fontWeight: "normal" },
  rowMargin: { textAlign: "left", marginLeft: 8 },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "dotted",
    marginVertical: 15,
  },
  paymentWrapper: { flexDirection: "row", justifyContent: "space-between" },
  paymentSection: {
    flexDirection: "column",
    marginBottom: 8,
  },
  paymentLabel: { fontSize: 10, fontWeight: "bold", width: "20%" },
  paymentMethod: { fontSize: 10, marginTop: 5 },
  totalSection: { width: "60%" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 10,
    width: "60%", // Added fixed width
    textAlign: "right", // Right-aligned label
    paddingRight: 40, // Added padding for separation
  },
  totalAmount: {
    fontSize: 10,
    width: "40%", // Added fixed width
    textAlign: "left", // Left-aligned value
  },
  grandTotalLabel: {
    fontSize: 14,
    width: "40%",
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: 40,
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: "bold",
    width: "40%",
    textAlign: "left",
  },
  paidSection: {
    flexDirection: "row",
    justifyContent: "flex-end", // Changed from space-between
    marginTop: 10,
  },
  paidLabel: {
    fontSize: 10,
    width: "40%",
    textAlign: "right",
    paddingRight: 40,
  },
  paidAmount: { fontSize: 10, width: "40%", textAlign: "left" },
});

// Education Invoice PDF Document Component
const RoyaltyInvoicePDF = ({ invoice }: { invoice: InvoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with company info and logo */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{invoice.branch.display_name}</Text>
          <Text style={styles.companyAddress}>
            {invoice.branch.address.address_line_1}
          </Text>
          <Text style={styles.companyAddress}>
            {invoice.branch.address.city} {invoice.branch.address.state}{" "}
            {invoice.branch.address.postcode}
          </Text>
          <Text style={styles.companyWebsite}>https://www.deemcee.com</Text>
          <Text style={styles.companySSM}>
            SSM: {invoice.branch.business_reg_no}
          </Text>
        </View>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <View style={styles.logo}>
          <LogoVer />
        </View>
      </View>

      {/* Invoice Title */}
      <Text style={styles.invoiceTitle}>INVOICE</Text>

      {/* Invoice To and Invoice Details Sections */}
      <View style={styles.infoSection}>
        <View style={styles.invoiceToSection}>
          <Text style={styles.sectionTitle}>INVOICE TO</Text>
          <Text style={styles.clientDetail}>
            {invoice.parent.first_name} {invoice.parent.last_name}
          </Text>
          <Text style={styles.clientDetail}>
            {invoice.parent.address.address_line_1}
          </Text>
          <Text style={styles.clientDetail}>
            {invoice.parent.address.address_line_2}
          </Text>
          <Text style={styles.clientDetail}>
            {invoice.parent.address.postcode} {invoice.parent.address.city}
          </Text>
          <Text style={styles.clientDetail}>
            {invoice.parent.address.state}
          </Text>
          <Text style={styles.clientDetail}>{invoice.parent.email}</Text>
          <Text style={styles.clientDetail}>{invoice.parent.phone || "-"}</Text>
        </View>

        <View style={styles.invoiceDetailsSection}>
          <Text style={styles.invoiceDetail}>
            <Text style={styles.invoiceDetailLabel}>INVOICE NO.</Text>
            <Text style={styles.invoiceDetailValue}> {invoice.invoice}</Text>
          </Text>
          <Text style={styles.invoiceDetail}>
            <Text style={styles.invoiceDetailLabel}>DATE</Text>
            <Text style={styles.invoiceDetailValue}> {invoice.start_date}</Text>
          </Text>
          <Text style={styles.invoiceDetail}>
            <Text style={styles.invoiceDetailLabel}>TERMS</Text>
            <Text style={styles.invoiceDetailValue}> Due on receipt</Text>
          </Text>
        </View>
      </View>

      {/* Student Details Table */}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.studentNameCell]}>
            STUDENT NAME
          </Text>
          <Text style={[styles.tableCell, styles.descriptionCell]}>
            DESCRIPTION
          </Text>
          <Text style={[styles.tableCell, styles.gradeCell]}>GRADE</Text>
          <Text style={[styles.tableCell, styles.dateCell]}>STARTING DATE</Text>
          <Text style={[styles.tableCell, styles.amountCell]}>AMOUNT</Text>
        </View>

        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              styles.studentNameCellValue,
              styles.rowMargin,
            ]}
          >
            {invoice.student}
          </Text>
          <Text style={[styles.tableCell, styles.descriptionCellValue]}>
            {invoice.enrolment_type}
          </Text>
          <Text style={[styles.tableCell, styles.gradeCellValue]}>
            {invoice.grade}
          </Text>
          <Text style={[styles.tableCell, styles.dateCellValue]}>
            {invoice.start_date}
          </Text>
          <Text
            style={[styles.tableCell, styles.amountCellValue, styles.rowMargin]}
          >
            {invoice.branch.country.currency} {invoice.amount}
          </Text>
        </View>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Payment Method */}
      <View style={styles.paymentWrapper}>
        <View style={styles.paymentSection}>
          <Text style={styles.paymentLabel}>PAYMENT METHOD:</Text>
          <Text style={styles.paymentMethod}>Cash</Text>
        </View>

        {/* Totals Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.grandTotalLabel}>TOTAL</Text>
            <Text style={styles.grandTotal}>
              {invoice.branch.country.currency} {invoice.amount}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount</Text>
            <Text style={styles.totalAmount}>{invoice.discount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Early Advance Rebate</Text>
            <Text style={styles.totalAmount}>
              {invoice.early_advance_rebate}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Credit Balance</Text>
            <Text style={styles.totalAmount}>{invoice.pre_outstanding}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Post-Payment</Text>
            <Text style={styles.totalAmount}>{invoice.post_outstanding}</Text>
          </View>
          <View style={styles.paidSection}>
            <Text style={styles.paidLabel}>AMOUNT PAID</Text>
            <Text style={styles.paidAmount}>
              {invoice.branch.country.currency} {invoice.paid_amount}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default RoyaltyInvoicePDF;
