import { CertificateData } from "@/types/certificate";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 50,
  },
  header: {
    marginTop: 75,
    marginLeft: "30%",
    marginBottom: 20,
    textAlign: "center", // Cyan color for the header
  },
  title: {
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 36,
    color: "#00B7EB", // Cyan color for "OF INVOLVEMENT"
    textAlign: "left",
  },
  programName: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 3,
  },
  recipientSection: {
    marginTop: 160,
    marginBottom: 10,
    marginLeft: "30%",
    textAlign: "left",
  },
  recipientName: {
    fontSize: 32,

    color: "#00B7EB", // Cyan color for the name
    marginBottom: 10,
    textAlign: "left",
  },
  attendanceText: {
    fontSize: 12,
    textAlign: "left",
    lineHeight: 1.5,
  },
  boldText: {
    fontWeight: "bold",
  },
  signatureSection: {
    marginTop: 150,
    alignItems: "center",
  },
  signature: {
    width: 100,
    height: 50,
  },
});

const getCompletion = (grade: number) => {
  if (grade === 6) {
    return "COMPLETION";
  }
  return "INVOLVEMENT";
};

// Create Document Component
const CertificatePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>CERTIFICATE</Text>
        <Text style={styles.subtitle}>OF {getCompletion(6)}</Text>
        <Text style={styles.programName}>in Kiddo Emcee Programme</Text>
      </View>

      <View style={styles.recipientSection}>
        <Text style={styles.recipientName}>Giselle Kok</Text>
        <Text style={styles.attendanceText}>
          attended <Text style={styles.boldText}>Grade 1</Text> Creative Based
          Speaking Programme
        </Text>
        <Text style={styles.attendanceText}>in Year 2025.</Text>
      </View>

      <View style={styles.signatureSection}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          style={styles.signature}
          src="/images/certificate-signature.png" // Replace with your signature image path
        />
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;
