/*// import { useQuery, useMutation } from '@tanstack/react-query';

// const fetchUsers = async () => {
//   const response = await fetch('https://dummyjson.com/users');
//   const data = await response.json();
//   return data;
// };

// const updateUser = async (userId, updatedUserData) => {
//   const response = await fetch(`https://dummyjson.com/users/${userId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedUserData),
//   });
//   const data = await response.json();
//   return data;
// };

// const deleteUser = async (userId) => {
//   const response = await fetch(`https://dummyjson.com/users/${userId}`, {
//     method: 'DELETE',
//   });
//   const data = await response.json();
//   return data;
// };

// export const useUsersQuery = () => {
//   const { data, ...queryProps } = useQuery({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
//   });

// const updateMutation = useMutation(updateUser);
// const deleteMutation = useMutation(deleteUser);

// const updateUserById = async (userId, updatedUserData) => {
//   try {
//   await updateMutation.mutateAsync([userId, updatedUserData]);
//   } catch (error) {
//     console.error('Error updating user:', error)
//   }
// };

// const deleteUserById = async (userId) => {
//   await deleteMutation.mutateAsync(userId);
// };

// return {
//   data,
//   updateUserById,
//   deleteUserById,
//   ...queryProps,
// };
// }*/

import { useQuery } from "@tanstack/react-query";
import axios from "axios"


export const fetchData = async () => {
  const response = await axios.get("http://192.168.1.6:3000/Inputs");
  return response.data;
};

export const useApi = () => {
  return useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchData,
  });
};

export const AddItem = async (inputValue) => {
  console.log("add input");
  const response = await axios.post("http://192.168.1.6:3000/Inputs", { value: inputValue });
  return response.data;
};

export const UpdateItem = async (id, inputValue) => {
  console.log("update input");
  const response = await axios.put(`http://192.168.1.6:3000/Inputs/${id}`, { value: inputValue });
  return response.data;
};

export const deleteItem = async (id) => {
  console.log("remove item");
  await axios.delete(`http://192.168.1.6:3000/Inputs/${id}`);
};