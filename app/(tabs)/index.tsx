import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const API_URL = "https://seva-backend-qfmf.onrender.com"; // Backend URL

export default function SevaScreen() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sevas, setSevas] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeva, setSelectedSeva] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const dayName = today.toLocaleDateString("hi-IN", { weekday: "long" });

  // Fetch Sevas
  const fetchSevas = async () => {
    try {
      const res = await axios.get(`${API_URL}/sevas`);
      setSevas(res.data);
    } catch (e) {
      Alert.alert("Error", "Seva load नहीं हो पाई");
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (e) {
      Alert.alert("Error", "Users load नहीं हो पाए");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchSevas();
      await fetchUsers();
      setLoading(false);
    };
    loadData();
  }, []);

  const categories = [...new Set(sevas.map((item) => item.category))];
  const subcategories = sevas
    .filter((s) => s.category === selectedCategory)
    .map((s) => s.subcategory);

  const handleSubmit = () => {
    if (!selectedCategory || !selectedSeva || !selectedUser) {
      Alert.alert("⚠️ कृपया सभी विकल्प चुनें");
      return;
    }
    setVisible(true);
  };

  const handleConfirm = async () => {
    try {
      const body = {
        category: selectedCategory,
        subcategory: selectedSeva,
        userId: selectedUser._id,
        username: selectedUser.username,
        date: formattedDate,
      };

      await axios.post(`${API_URL}/submissions`, body);

      setVisible(false);
      Alert.alert("✅ सफलता", `${selectedUser.username} द्वारा ${selectedSeva} सेवा दर्ज हो गई`);

      // Reset
      setSelectedCategory(null);
      setSelectedSeva(null);
      setSelectedUser(null);
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Submission failed");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.dateContainer}>
          <Text style={styles.dayText}>{dayName}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>🌸 सेवा दर्ज करें</Text>

          {/* Category */}
          <Text style={styles.label}>सेवा श्रेणी</Text>
          <View style={styles.pickerBox}>
            <RNPickerSelect
              placeholder={{ label: "श्रेणी चुनें", value: null }}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedSeva(null);
              }}
              items={categories.map((c) => ({ label: c, value: c }))}
              style={pickerStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          {/* Subcategory */}
          {selectedCategory && (
            <>
              <Text style={styles.label}>सेवा</Text>
              <View style={styles.pickerBox}>
                <RNPickerSelect
                  placeholder={{ label: "सेवा चुनें", value: null }}
                  onValueChange={(value) => setSelectedSeva(value)}
                  items={subcategories.map((s) => ({ label: s, value: s }))}
                  style={pickerStyles}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
            </>
          )}

          {/* User */}
          <Text style={styles.label}>सेवक</Text>
          <View style={styles.pickerBox}>
            <RNPickerSelect
              placeholder={{ label: "सेवक चुनें", value: null }}
              onValueChange={(value) => setSelectedUser(value)}
              items={users.map((u) => ({ label: u.username, value: u }))}
              style={pickerStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>सेवा सबमिट करें</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Modal */}
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>पुष्टि करें</Text>
            <Text style={styles.modalText}>क्या आप सेवा दर्ज करना चाहते हैं?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setVisible(false)}>
                <Text style={styles.modalBtnText}>रद्द करें</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.modalBtnText}>पुष्टि करें</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0e0e0e" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  dateContainer: { alignItems: "center", marginTop: 25, marginBottom: 20 },
  dayText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  dateText: { color: "#aaa" },
  card: { backgroundColor: "#1a1a1a", marginHorizontal: 15, borderRadius: 18, padding: 22 },
  title: { fontSize: width * 0.065, color: "#fff", fontWeight: "bold", marginBottom: 20 },
  label: { color: "#bbb", marginTop: 14, marginBottom: 6, fontSize: 15 },
  pickerBox: { backgroundColor: "#252525", borderRadius: 12, paddingHorizontal: 10, justifyContent: "center", marginBottom: 10, borderWidth: 1, borderColor: "#333" },
  button: { marginTop: 25, backgroundColor: "#4CAF50", padding: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalCard: { backgroundColor: "#1a1a1a", padding: 25, borderRadius: 15, width: "80%" },
  modalTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  modalText: { color: "#ccc", marginVertical: 20 },
  modalButtons: { flexDirection: "row" },
  cancelButton: { flex: 1, backgroundColor: "#444", padding: 12, borderRadius: 8, alignItems: "center", marginRight: 10 },
  confirmButton: { flex: 1, backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, alignItems: "center" },
  modalBtnText: { color: "#fff" },
});

const pickerStyles = {
  inputIOS: { color: "white", paddingVertical: 14, fontSize: 16 },
  inputAndroid: { color: "white", paddingVertical: 12, fontSize: 16 },
};
