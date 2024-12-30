import { create } from "zustand";

export const useStore = create((set) => ({
  users: JSON.parse(localStorage.getItem("users")) || [], // LocalStorage'dan foydalanuvchilarni yuklash
  addUser: (payload) => {
    set((state) => {
      const newUsers = [...state.users, payload];
      localStorage.setItem("users", JSON.stringify(newUsers)); // LocalStorage'ga saqlash
      return { users: newUsers };
    });
  },
  removeUser: (id) =>
    set((state) => {
      const newUsers = state.users.filter((user) => user.id !== id);
      localStorage.setItem("users", JSON.stringify(newUsers)); // LocalStorage'ga saqlash
      return { users: newUsers };
    }),
  updateUser: (payload) =>
    set((state) => {
      const newUsers = state.users.map((user) =>
        user.id === payload.id ? { ...user, ...payload } : user
      );
      localStorage.setItem("users", JSON.stringify(newUsers)); // LocalStorage'ga saqlash
      return { users: newUsers };
    }),
}));
