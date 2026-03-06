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

export default function SeeUsers() {
  const [users, setUsers] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState("");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = (id, name) => {
    Alert.alert("Confirm Delete", `Delete ${name}?`, [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await API.delete(`/users/${id}`);
            fetchUsers();
          } catch (error) {
            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setNewName(user.username);
    setNewMobile(user.mobile);
    setEditModalVisible(true);
  };

  // Update User
  const handleUpdate = async () => {
    if (!newName || newMobile.length !== 10) {
      Alert.alert("Invalid input");
      return;
    }

    try {
      await API.put(`/users/${selectedUser.id}`, {
        username: newName.trim(),
        mobile: newMobile.trim(),
      });

      setEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      Alert.alert("Error", "Update failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>👥 Users List</Text>

        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <View>
              <Text style={styles.userName}>{user.username}</Text>
              <Text style={styles.mobile}>{user.mobile}</Text>
            </View>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => openEditModal(user)}>
                <Ionicons name="create-outline" size={22} color="#4da6ff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(user.id, user.username)}
              >
                <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Update User</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#666"
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              style={styles.input}
              placeholder="Mobile"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={newMobile}
              onChangeText={setNewMobile}
              maxLength={10}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={{ color: "#ccc" }}>Cancel</Text>
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
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  mobile: {
    color: "#888",
    fontSize: 13,
  },

  iconRow: {
    flexDirection: "row",
    gap: 15,
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

  cancelBtn: {
    padding: 12,
  },

  updateBtn: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
  },
});
