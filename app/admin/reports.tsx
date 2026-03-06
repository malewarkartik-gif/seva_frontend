import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../services/api";

export default function Reports() {
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  // -------- DOWNLOAD REPORT --------
  const handleDownload = async () => {
    if (!date) {
      Alert.alert("Please select a date first");
      return;
    }

    try {
      const formattedDate = date.toISOString().split("T")[0];

      const res = await API.get(`/reports/${formattedDate}`);

      const reportData = res.data;

      if (!reportData.length) {
        Alert.alert("No report found for this date");
        return;
      }

      // -------- CREATE CSV --------
      let csv = "Person Name,Category,Subcategory\n";

      reportData.forEach((item) => {
        csv += `${item.person_name},${item.category},${item.subcategory}\n`;
      });

      const fileUri = FileSystem.documentDirectory + `seva_report_${formattedDate}.csv`;

      await FileSystem.writeAsStringAsync(fileUri, csv, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(fileUri);

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to download report");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>📄 Reports</Text>
        <Text style={styles.subtitle}>
          Select a date to download seva report
        </Text>

        {/* DATE PICKER */}
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

        {/* DOWNLOAD BUTTON */}
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
