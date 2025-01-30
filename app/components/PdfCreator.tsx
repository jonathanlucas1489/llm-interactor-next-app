import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface PdfDocumentProps {
  imageUrl: string;
  messages: { text: string; isUser: boolean }[];
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  messageContainer: {
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  userMessage: {
    backgroundColor: '#D1E8FF',
    alignSelf: 'flex-end',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  aiMessage: {
    backgroundColor: '#F0F0F0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
});

const PdfDocument = ({ imageUrl, messages }: PdfDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>OCR Document & Chat History</Text>
      </View>
      {imageUrl && (
        <Image src={imageUrl} style={styles.image} />
      )}
      <View>
        {messages.map((message, index) => (
          <View key={index} style={message.isUser ? styles.userMessage : styles.aiMessage}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
