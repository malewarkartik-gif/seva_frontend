import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../services/api";

export default function AddUser() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name || mobile.length !== 10) {
      Alert.alert("Invalid input", "Enter valid username and 10 digit mobile");
      return;
    }

    try {
      setLoading(true);

      await API.post("/users", {
        username: name.trim(),
        mobile: mobile.trim(),
      });

      Alert.alert("Success", "User Added Successfully");

      setName("");
      setMobile("");

    } catch (error) {
      console.log(error?.response?.data);

      Alert.alert(
        "Error",
        error?.response?.data?.detail || "Failed to add user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>👤 Add User</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Mobile</Text>
        <TextInput
          placeholder="Enter mobile number"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={mobile}
          onChangeText={setMobile}
          style={styles.input}
          maxLength={10}
        />

        <TouchableOpacity onPress={handleAdd} disabled={loading}>
          <LinearGradient colors={["#1a1a1a", "#333"]} style={styles.button}>
            <Text style={styles.buttonText}>
              {loading ? "Adding..." : "Add User"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
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
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    color: "#ccc",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
};
