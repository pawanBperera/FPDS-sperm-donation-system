// ——————————————————————
// Mock Users (for login routing)
// ——————————————————————
const mockUsers = [
  { id: 1, firebase_uid: "k0azUFP7APV4EBPCsOt9njDJlEB3", role_id: 1, email: "recipient1@test.com" },
  { id: 2, firebase_uid: "rm93lQGfI1OiQhGnqiqBPJ4cxjP2", role_id: 2, email: "donor1@test.com" },
  { id: 3, firebase_uid: "OzOxrt1zP0YIlpOIIwk6FcX6nVD3", role_id: 3, email: "admin1@test.com" },
];

export const mockUserByUID = (firebase_uid) => {
  return mockUsers.find(u => u.firebase_uid === firebase_uid)
    || { id: 0, firebase_uid, role_id: 3, email: "fallback@test.com" };
};

// ——————————————————————
// Analytics (Admin Dashboard cards)
// ——————————————————————
export async function mockFetchAnalytics() {
  await delay();
  return {
    totalRecipients: mockRecipients.length,
    totalDonors:      mockDonors.length,
    totalMatches:     mockMatches.length
  };
}

// ——————————————————————
// Recipients
// ——————————————————————
const mockRecipients = [
  { id: 1, first_name: "Alice", last_name: "Perera", email: "alice@test.com", date_of_birth: "1990-04-12", province: "Western" },
  { id: 2, first_name: "Bob",   last_name: "De Silva", email: "bob@test.com",   date_of_birth: "1987-11-03", province: "Central" }
];

export async function mockFetchRecipients() {
  await delay();
  return mockRecipients;
}

export async function mockFetchRecipientProfile(id) {
  await delay();
  return mockRecipients.find(r => r.id === id) || null;
}

export async function mockUpdateRecipientProfile(id, data) {
  await delay();
  const idx = mockRecipients.findIndex(r => r.id === id);
  if (idx === -1) throw new Error("Recipient not found");
  mockRecipients[idx] = { ...mockRecipients[idx], ...data };
  return mockRecipients[idx];
}

export async function mockGetRecipientNotifications(recipientId) {
  await delay();
  return [
    { id: 1, type: "match_shortlisted", text: "You shortlisted donor #201.", date: "2025-05-28" },
    { id: 2, type: "match_approved",   text: "Your match #1 was approved.",    date: "2025-05-27" },
    { id: 3, type: "no_matches",       text: "No new matches in the last 30 days.", date: "2025-05-20" }
  ];
}

export async function mockFetchShortlistedDonors(recipientId) {
  await delay();

  return mockDonors.slice(0, 2).map(d => ({ ...d, shortlisted_at: "2025-06-01" }));
}

export async function mockFetchApprovedMatches(recipientId) {
  await delay();
  return mockMatches.filter(m => m.status === "approved");
}

export async function mockFetchRejectedMatches(recipientId) {
  await delay();
  return mockMatches.filter(m => m.status === "rejected");
}



// ——————————————————————
// Donors
// ——————————————————————
let mockDonors = [
  { id: 201, name: "Donor A", city: "Colombo", district: "Colombo", bloodType: "O+", hadBeenDonor: false },
  { id: 202, name: "Donor B", city: "Galle",   district: "Galle",   bloodType: "A-", hadBeenDonor: true  }
];

export async function mockFetchDonors() {
  await delay();
  return mockDonors;
}

export async function mockFetchDonorProfile(id) {
  await delay();
  return mockDonors.find(d => d.id === id) || null;
}

export async function mockCreateDonor(payload) {
  await delay();
  const newDonor = { id: 200 + mockDonors.length + 1, ...payload };
  mockDonors.push(newDonor);
  return newDonor;
}

export async function mockUpdateDonorProfile(id, data) {
  await delay();
  const idx = mockDonors.findIndex(d => d.id === id);
  if (idx === -1) throw new Error("Donor not found");
  mockDonors[idx] = { ...mockDonors[idx], ...data };
  return mockDonors[idx];
}

export async function mockGetDonorNotifications(donorId) {
  await delay();
  return [
    { id: 1, type: "match_approved", icon: "heart-success", text: "Your donation was approved.", date: "2025-05-28" },
    { id: 2, type: "shortlisted",    icon: "heart-primary", text: "You were shortlisted.",   date: "2025-05-26" }
  ];
}



// ——————————————————————
// Matches (Admin & Recipient views)
// ——————————————————————
let mockMatches = [
  { id: 1, recipient_id: 1, donor_id: 201, genetic_risk: "compatible", status: "pending",   requested_at: "2025-06-01" },
  { id: 2, recipient_id: 2, donor_id: 202, genetic_risk: "risk",       status: "approved",  requested_at: "2025-05-28" },
  { id: 3, recipient_id: 1, donor_id: 202, genetic_risk: "compatible", status: "rejected",  requested_at: "2025-05-20" }
];

export async function mockFetchMatches({ status } = {}) {
  await delay();
  return status ? mockMatches.filter(m => m.status === status) : mockMatches;
}

export async function mockUpdateMatchStatus(matchId, newStatus) {
  await delay();
  const m = mockMatches.find(x => x.id === matchId);
  if (m) m.status = newStatus;
  return m;
}

export async function mockMatchDetail(id) {
  await delay();
  const m = mockMatches.find(x => x.id === id);
  return {
    ...m,
    recipient: mockRecipients.find(r => r.id === m.recipient_id),
    donor:     mockDonors.find(d => d.id === m.donor_id)
  };
}



// ——————————————————————
// Search (Recipient-facing suggestions & results)
// ——————————————————————
export async function mockSearchDonors(criteria) {
  console.log("🔍 mockSearchDonors", criteria);
  await delay();
  // just return first 3 donors for now
  return mockDonors.slice(0, 3).map(d => ({
    id: d.id,
    city: d.city,
    district: d.district,
    blood_type: d.bloodType,
    had_been_donor: d.hadBeenDonor,
    date_registered: "2025-06-01"
  }));
}



// ——————————————————————
// Helpers
// ——————————————————————
function delay(ms = 200) {
  return new Promise(r => setTimeout(r, ms));
}


