// Screen1.js

import React, { useState } from "react";
import { TextInput, View, Text, Button, StyleSheet, Modal } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useApi, AddItem, UpdateItem, deleteItem } from "../query";

const Screen1 = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const { data, refetch } = useApi();

  const AddInputs = useMutation({
    mutationFn: () => AddItem(inputValue),
    onSuccess: () => {
      console.log("added");
      setInputValue("");
      refetch();
    },
  });

  const UpdateInput = useMutation({
    mutationFn: () => UpdateItem(selectedItem.id, inputValue),
    onSuccess: () => {
      console.log("Updated");
      setInputValue("");
      refetch();
      setModalVisible(false);
    },
  });

  const DeleteInput = useMutation({
    mutationFn: () => deleteItem(selectedItem.id),
    onSuccess: () => {
      console.log("Delete");
      refetch();
    },
  });

  const handleAddInput = () => {
    if (inputValue) {
      AddInputs.mutate();
    } else {
      console.error("Please fill the required field");
    }
  };

  const handleUpdateInput = () => {
    if (selectedItem !== null) {
      UpdateInput.mutate();
    }
  };

  const handleRemoveInput = () => {
    if (selectedItem !== null) {
      DeleteInput.mutate();
    }
  };

  return (
    <View style={styles.mainView}>
      <TextInput
        placeholder="Enter text..."
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        style={styles.textInput}
      />
      <Button title="Add" onPress={handleAddInput} />

      <View>
        <Text style={styles.title}>Input List:</Text>
        <View style={styles.listView}>
          {data &&
            data.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <Text style={styles.value}>{item.value}</Text>
                <Button
                  title="Update"
                  onPress={() => {
                    setSelectedItem(item);
                    setInputValue(item.value);
                    setModalVisible(true);
                  }}
                />
                <Button
                  title="Remove"
                  onPress={() => {
                    handleRemoveInput();
                  }}
                />
              </View>
            ))}
        </View>
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalView}>
          <TextInput
            placeholder="Enter new value..."
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            style={styles.textInput}
          />
          <Button title="Update" onPress={handleUpdateInput} />
          <Button
            title="Cancel"
            onPress={() => {
              setModalVisible(false);
              setInputValue("");
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
    marginTop: 10,
  },
  textInput: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  title: {
    marginTop: 5,
    fontWeight: "700",
    fontSize: 16,
  },
  listView: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  value: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    flex: 1,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Screen1;
