import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../services/api";

export default function ManageSevas() {
  const [sevas, setSevas] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [updatedSeva, setUpdatedSeva] = useState("");

  // -------- FETCH SEVAS --------
  const fetchSevas = async () => {
    try {
      const res = await API.get("/sevas/");
      setSevas(res.data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to load sevas");
    }
  };

  useEffect(() => {
    fetchSevas();
  }, []);

  // -------- GROUP BY CATEGORY --------
  const groupedSevas = sevas.reduce((acc, seva) => {
    if (!acc[seva.category]) {
      acc[seva.category] = [];
    }
    acc[seva.category].push(seva);
    return acc;
  }, {});

  // -------- OPEN EDIT --------
  const openEdit = (seva) => {
    setSelectedSeva(seva);
    setUpdatedSeva(seva.subcategory);
    setEditVisible(true);
  };

  // -------- UPDATE --------
  const handleUpdate = async () => {
    if (!updatedSeva.trim()) {
      Alert.alert("Seva name required");
      return;
    }

    try {
      await API.put(`/sevas/${selectedSeva.id}`, {
        category: selectedSeva.category,
        subcategory: updatedSeva,
      });

      setEditVisible(false);
      fetchSevas();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Update failed");
    }
  };

  // -------- DELETE --------
  const handleDeleteSeva = (seva) => {
    Alert.alert("Confirm", `Delete ${seva.subcategory}?`, [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await API.delete(`/sevas/${seva.id}`);
            fetchSevas();
          } catch (err) {
            console.log(err);
            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>⚙ Manage Sevas</Text>

        {Object.keys(groupedSevas).map((category) => (
          <View key={category} style={styles.categoryCard}>
            <Text style={styles.categoryTitle}>{category}</Text>

            {groupedSevas[category].map((seva) => (
              <View key={seva.id} style={styles.sevaRow}>
                <Text style={styles.sevaText}>{seva.subcategory}</Text>

                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => openEdit(seva)}>
                    <Ionicons name="create-outline" size={22} color="#4da6ff" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDeleteSeva(seva)}>
                    <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* EDIT MODAL */}
      <Modal visible={editVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Update Seva</Text>

            <TextInput
              style={styles.input}
              value={updatedSeva}
              onChangeText={setUpdatedSeva}
              placeholder="Seva name"
              placeholderTextColor="#666"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setEditVisible(false)}>
                <Text style={{ color: "#aaa" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                <Text style={{ color: "#fff" }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },

  categoryCard: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },

  categoryTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  sevaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },

  sevaText: {
    color: "#ccc",
    fontSize: 15,
  },

  iconRow: {
    flexDirection: "row",
    gap: 18,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#111",
    width: "100%",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    marginBottom: 15,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  updateBtn: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
  },
});
