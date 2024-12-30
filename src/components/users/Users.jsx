// import React from "react";
// import photo from "../../assets/images/photo.png";
// import { useStore } from "../zustand";
// import { useState } from "react";

// const Users = () => {
//   const { users, addUser, removeUser, updateUser } = useStore();
//   const [createBtn, setCreateBtn] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let newUser = {};
//     newUser.id = Date.now();
//     newUser.firstName = e.target.firstName.value;
//     newUser.lastName = e.target.lastName.value;
//     newUser.age = e.target.age.value;
//     newUser.country = e.target.country.value;

//     addUser(newUser);

//     e.target.firstName.value = "";
//     e.target.lastName.value = "";
//     e.target.age.value = "";
//     e.target.country.value = "";
//   };

//   const handleUpdate = (id) => {
//     const updated_user = users.find((el) => el.id === id);
//     e.target.firstName.value = users.firstName;
//     e.target.lastName.value = users.lastName;
//     e.target.age.value = users.age;
//     e.target.country.value = users.country;
//   };

//   return (
//     <div className="flex flex-row md:flex-row h-screen">
//       {/* Form bo'limi */}
//       <div className="w-full md:w-1/4 h-auto md:h-screen bg-red-100 p-5 shadow-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-5">Create User</h2>
//         <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
//           <input
//             name="firstName"
//             autoFocus
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
//             placeholder="First Name"
//             type="text"
//           />
//           <input
//             name="lastName"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
//             placeholder="Last Name"
//             type="text"
//           />
//           <input
//             name="age"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
//             placeholder="Age"
//             type="number"
//           />
//           <input
//             name="country"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
//             placeholder="Country"
//             type="text"
//           />
//           <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">
//             {createBtn ? "Create" : "Edit"}
//           </button>
//         </form>
//       </div>

//       {/* Foydalanuvchilar ro'yxati bo'limi */}
//       <div className="p-5 flex flex-wrap gap-3 flex-1 items-start content-start">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="w-72 shadow-md border border-gray-300 rounded-md"
//           >
//             <div className="w-full h-52 bg-gray-100">
//               <img
//                 className="w-full h-full object-contain"
//                 src={photo}
//                 alt="User"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="text-xl font-medium text-gray-800">
//                 First name: {user.firstName}
//               </h3>
//               <p className="text-gray-600">Last name: {user.lastName}</p>
//               <p className="font-medium text-gray-700">Age: {user.age}</p>
//               <div className="mt-3 flex gap-2">
//                 <button
//                   onClick={() => removeUser(user.id)}
//                   className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleUpdate(user.id)}
//                   className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Users;

import React, { useState } from "react";
import photo from "../../assets/images/photo.png";
import { useStore } from "../zustand";

const Users = () => {
  const { users, addUser, removeUser, updateUser } = useStore();
  const [createBtn, setCreateBtn] = useState(true);
  const [userId, setUserId] = useState(null); // Tahrir qilish uchun foydalanuvchi ID sini saqlash

  const handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      id: userId || Date.now(),
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      age: e.target.age.value,
      country: e.target.country.value,
    };

    if (userId) {
      // Agar userId mavjud bo'lsa, yangilash
      updateUser(newUser);
      setCreateBtn(true); // 'Create' tugmasiga qaytish
    } else {
      // Yangi foydalanuvchi qo'shish
      addUser(newUser);
    }

    // Formni tozalash
    e.target.firstName.value = "";
    e.target.lastName.value = "";
    e.target.age.value = "";
    e.target.country.value = "";

    setUserId(null); // ID ni reset qilish
  };

  const handleUpdate = (id) => {
    const updatedUser = users.find((el) => el.id === id);

    if (updatedUser) {
      // Form elementlariga foydalanuvchi ma'lumotlarini joylashtirish
      document.querySelector('input[name="firstName"]').value =
        updatedUser.firstName;
      document.querySelector('input[name="lastName"]').value =
        updatedUser.lastName;
      document.querySelector('input[name="age"]').value = updatedUser.age;
      document.querySelector('input[name="country"]').value =
        updatedUser.country;

      setUserId(id); // Tahrir qilish uchun ID ni saqlash
      setCreateBtn(false); // 'Create' tugmasini 'Edit' ga o'zgartirish
    }
  };

  return (
    <div className="flex flex-row md:flex-row h-screen">
      {/* Form bo'limi */}
      <div className="w-full md:w-1/4 h-auto md:h-screen bg-red-100 p-5 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          {createBtn ? "Create User" : "Edit User"}
        </h2>
        <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
          <input
            name="firstName"
            autoFocus
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="First Name"
            type="text"
          />
          <input
            name="lastName"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="Last Name"
            type="text"
          />
          <input
            name="age"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="Age"
            type="number"
          />
          <input
            name="country"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="Country"
            type="text"
          />
          <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">
            {createBtn ? "Create" : "Edit"}
          </button>
        </form>
      </div>

      {/* Foydalanuvchilar ro'yxati bo'limi */}
      <div className="p-5 flex flex-wrap gap-3 flex-1 items-start content-start">
        {users.map((user) => (
          <div
            key={user.id}
            className="w-72 shadow-md border border-gray-300 rounded-md"
          >
            <div className="w-full h-52 bg-gray-100">
              <img
                className="w-full h-full object-contain"
                src={photo}
                alt="User"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-medium text-gray-800">
                First name: {user.firstName}
              </h3>
              <p className="text-gray-600">Last name: {user.lastName}</p>
              <p className="font-medium text-gray-700">Age: {user.age}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => removeUser(user.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(user.id)}
                  className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
