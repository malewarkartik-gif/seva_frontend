import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Reports() {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDownload = () => {
    if (!date) {
      Alert.alert("Please select a date first");
      return;
    }

    const today = new Date();
    if (date > today) {
      Alert.alert("Future schedule not allowed");
      return;
    }

    Alert.alert("Success", `Report for ${date.toDateString()} downloaded`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>📄 Reports</Text>
        <Text style={styles.subtitle}>
          Select a date to download seva report
        </Text>

        {/* Date Selector */}
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowPicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#fff" />
          <Text style={styles.dateText}>
            {date ? date.toDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        {/* Download Button */}
        <TouchableOpacity onPress={handleDownload}>
          <LinearGradient colors={["#1a1a1a", "#333"]} style={styles.button}>
            <Ionicons
              name="download-outline"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.buttonText}>Download Report</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  scroll: {
    padding: 20,
    paddingBottom: 120,
  },

  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  subtitle: {
    color: "#888",
    marginBottom: 25,
  },

  dateBox: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  dateText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
