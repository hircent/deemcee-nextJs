import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Certificate } from "crypto";
import { CertificateData } from "@/types/certificate";
import { capitalizeFirstLetter, getCategoryByGrade } from "@/lib/utils";

const styles = StyleSheet.create({
  html: {
    fontFamily: "Helvetica", // Arial is not available in react-pdf, Helvetica is the closest match
    fontSize: 13,
  },
  body: { margin: 0, padding: 0 },
  certificateTitle: {
    fontSize: 46,
    fontWeight: "bold",
    marginTop: "32%",
    marginLeft: "24.5%",
    marginRight: "5%",
  },
  certificat2ndTitle: {
    fontSize: 44,
    fontWeight: "normal",
    marginLeft: "24.5%",
    marginRight: "5%",
    color: "#45A0E7",
  },
  certificateSubtitle: {
    fontSize: 22,
    marginLeft: "24.5%",
    marginRight: "5%",
    fontWeight: "bold",
  },
  certificateMainText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
    marginTop: "34%",
    paddingHorizontal: 30,
    color: "#45A0E7",
  },
  attendanceText: {
    textAlign: "center",
    fontSize: 12,
    paddingHorizontal: "22%",
    marginTop: 10,
  },
  signatureContainer: { width: 100, marginTop: "14%", alignSelf: "center" },
  signatureImage: { width: "100%", height: "auto" },
});

const CertificatePDF = ({ cert }: { cert: CertificateData }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <View>
        <Text style={styles.certificateTitle}>CERTIFICATE </Text>
        <Text style={styles.certificat2ndTitle}>OF INVOLVEMENT</Text>
        <Text style={styles.certificateSubtitle}>
          in {getCategoryByGrade(cert.grade)} Emcee Program
        </Text>
        <Text style={styles.certificateMainText}>
          {capitalizeFirstLetter(cert.student.fullname)}
        </Text>
        <Text style={styles.attendanceText}>
          attended Grade {cert.grade} Creative Based Speaking Program {"\n"} in
          Year{" "}
          <Text style={{ fontWeight: "bold" }}>
            {cert.end_date.slice(0, 4)}
          </Text>
        </Text>
        <View style={styles.signatureContainer}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src="/images/certificate-signature.png"
            style={styles.signatureImage}
          />
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;
