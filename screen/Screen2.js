import React, { useState } from "react";
import { View, Text, Button, FlatList, Modal, TextInput } from "react-native";
import { useUsersQuery } from "../query";

const Screen2 = () => {
  const { data: users, isLoading, updateUserById } = useUsersQuery();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpdate = (userId) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const handleRemove = (userId) => {
    console.log(`Remove user with ID: ${userId}`);
  };

  const handleUpdateUser = () => {
    // Perform the update here
    updateUserById(selectedUserId, { username: updatedUsername, email: updatedEmail });

    // Close the modal and reset state
    setIsModalVisible(false);
    setSelectedUserId(null);
    setUpdatedUsername("");
    setUpdatedEmail("");
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <FlatList
        data={users.users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}</Text>
            <Text>{item.email}</Text>
            <Button title="Update" onPress={() => handleUpdate(item.id)} />
            <Button title="Remove" onPress={() => handleRemove(item.id)} />
          </View>
        )}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View>
          <Text>Update User Information</Text>
          <TextInput
            placeholder="Username"
            value={updatedUsername}
            onChangeText={(text) => setUpdatedUsername(text)}
          />
          <TextInput
            placeholder="Email"
            value={updatedEmail}
            onChangeText={(text) => setUpdatedEmail(text)}
          />
          <Button title="Update" onPress={handleUpdateUser} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Screen2;
