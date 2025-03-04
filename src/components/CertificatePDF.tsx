import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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

const CertificatePDF = () => {
  <Document>
    <Page size="A4" style={styles.body}>
      <View>
        <Text style={styles.certificateTitle}>CERTIFICATE </Text>
        <Text style={styles.certificat2ndTitle}>OF INVOLVEMENT</Text>
        <Text style={styles.certificateSubtitle}>in Kiddo Emcee Program</Text>
        <Text style={styles.certificateMainText}>Hircent Ong</Text>
        <Text style={styles.attendanceText}>
          attended Grade 1 Creative Based Speaking Program {"\n"} in Year{" "}
          <Text style={{ fontWeight: "bold" }}>2025</Text>
        </Text>
        <View style={styles.signatureContainer}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src="/certificate-signature.png"
            style={styles.signatureImage}
          />
        </View>
      </View>
    </Page>
  </Document>;
};

export default CertificatePDF;
