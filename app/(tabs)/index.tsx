import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import ConfirmModal from "../components/ConfirmModal";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function SevaScreen() {
  const [visible, setVisible] = useState(false);

  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const dayName = today.toLocaleDateString("hi-IN", { weekday: "long" });

  const categories: Record<string, string[]> = {
    "मंदिर सफाई": [
      "गर्भगृह सफाई",
      "हाल सफाई",
      "फर्श पोछा",
      "वेदी सफाई",
      "दीप सफाई",
    ],
    "रसोई सेवा": [
      "सब्जी काटना",
      "भोजन बनाना",
      "प्रसाद वितरण",
      "बर्तन धोना",
      "सामग्री व्यवस्था",
    ],
    "कार्यक्रम सेवा": [
      "सजावट",
      "साउंड व्यवस्था",
      "स्टेज व्यवस्था",
      "लाइट व्यवस्था",
      "फूल सजावट",
    ],
    "बुक स्टॉल": [
      "पुस्तक व्यवस्था",
      "काउंटर सेवा",
      "स्टॉक जांच",
      "ग्राहक सहायता",
      "रजिस्टर एंट्री",
    ],
    "सुरक्षा सेवा": [
      "गेट ड्यूटी",
      "भीड़ नियंत्रण",
      "पार्किंग सहायता",
      "रात्रि ड्यूटी",
      "कार्यक्रम सुरक्षा",
    ],
    "भजन सेवा": [
      "कीर्तन गायन",
      "मृदंग बजाना",
      "हारमोनियम",
      "कीर्तन लीड",
      "भजन सहयोग",
    ],
    "मेंटेनेंस": [
      "इलेक्ट्रिकल जांच",
      "पानी व्यवस्था",
      "मरम्मत कार्य",
      "पेंटिंग",
      "कारपेंट्री",
    ],
    "गार्डन सेवा": [
      "पौधों को पानी",
      "घास सफाई",
      "कटिंग",
      "गार्डन सफाई",
      "खाद डालना",
    ],
    "बाहरी सफाई": [
      "सड़क सफाई",
      "प्रवेश द्वार सफाई",
      "डस्टबिन जांच",
      "खिड़की सफाई",
      "जूता स्थान सफाई",
    ],
    "दान काउंटर": [
      "रसीद बनाना",
      "दान एंट्री",
      "आगंतुक सहायता",
      "अकाउंट सहायता",
      "रिकॉर्ड मेंटेन",
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedCategory || !selectedSubCategory) {
      Alert.alert("कृपया सेवा चुनें");
      return;
    }
    setVisible(true);
  };

  const handleConfirm = () => {
    setVisible(false);
    Alert.alert("सफलता 🙏", `${selectedSubCategory} सेवा दर्ज हो गई`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.dayText}>{dayName}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>🌸 सेवा दर्ज करें</Text>

          {/* CATEGORY */}
          <Text style={styles.label}>सेवा श्रेणी चुनें</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.keys(categories).map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat && styles.selectedChip,
                ]}
                onPress={() => {
                  setSelectedCategory(cat);
                  setSelectedSubCategory(null);
                }}
              >
                <Text style={styles.chipText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* SUB CATEGORY */}
          {selectedCategory && (
            <>
              <Text style={styles.label}>सेवा चुनें</Text>

              {categories[selectedCategory].map((sub, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    selectedSubCategory === sub && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedSubCategory(sub)}
                >
                  <Text style={styles.optionText}>{sub}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* SUBMIT */}
          <TouchableOpacity onPress={handleSubmit}>
            <LinearGradient
              colors={["#1f1f1f", "#333"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>सेवा सबमिट करें</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <ConfirmModal
        visible={visible}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  dateContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  dayText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  dateText: {
    color: "#aaa",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 15,
  },

  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  label: {
    color: "#ccc",
    marginBottom: 10,
    marginTop: 10,
  },

  categoryChip: {
    backgroundColor: "#1c1c1c",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
  },

  selectedChip: {
    borderWidth: 1,
    borderColor: "#fff",
  },

  chipText: {
    color: "#fff",
    fontSize: 13,
  },

  option: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  selectedOption: {
    borderWidth: 1,
    borderColor: "#fff",
  },

  optionText: {
    color: "#fff",
  },

  button: {
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

});