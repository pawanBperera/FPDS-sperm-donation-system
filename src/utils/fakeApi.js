// File: src/utils/fakeApi.js

// In-memory store of mock users
const mockUsers = [
  {
    id: 1,
    firebase_uid: "k0azUFP7APV4EBPCsOt9njDJlEB3", // initial manual test user UID
    role_id: 1, // recipient
    email: "recipient1@test.com",
  },

  {
    id: 2,
    firebase_uid: "rm93lQGfI1OiQhGnqiqBPJ4cxjP2",
    role_id: 2,                // ← donor
    email: "donor1@test.com",
  },

  {
    id: 3,
    firebase_uid: "OzOxrt1zP0YIlpOIIwk6FcX6nVD3",
    role_id: 3,                // ←  admin
    email: "admin1@test.com",
  },
];


// Lookup user by Firebase UID
export const mockUserByUID = (firebase_uid) => {
  const user = mockUsers.find(u => u.firebase_uid === firebase_uid);
  if (user) return user;

  // fallback if truly unknown
  return {
    id: 0,
    firebase_uid,
    role_id: 3, // admin fallback
    email: "fallback@test.com",
  };
};

// Simulate creating a new user (registration flow)
export const mockCreateUser = async (registrationPayload) => {
  console.log("🌱 Mock create user called with:", registrationPayload);

  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  const newUser = {
    id: mockUsers.length + 1,                   // auto-increment ID
    firebase_uid: registrationPayload.firebase_uid,
    role_id: 1,                                 // always recipient
    email: registrationPayload.email,
    firstName: registrationPayload.firstName,
    lastName: registrationPayload.lastName,
  };

  // Save new user in our mock store
  mockUsers.push(newUser);

  return newUser;
};
