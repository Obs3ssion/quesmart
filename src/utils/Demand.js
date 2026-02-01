export const SAMPLE_DATA = [
    { hour: "9:00", customers: 15 },
    { hour: "10:00", customers: 28 },
    { hour: "11:00", customers: 45 },
    { hour: "12:00", customers: 72 },
    { hour: "13:00", customers: 85 },
    { hour: "14:00", customers: 68 },
    { hour: "15:00", customers: 52 },
    { hour: "16:00", customers: 48 },
    { hour: "17:00", customers: 65 },
    { hour: "18:00", customers: 42 },
    { hour: "19:00", customers: 25 },
    { hour: "20:00", customers: 18 },
  ];
  
  export function calculateStaffing(customers) {
    return Math.max(1, Math.ceil(customers / 20));
  }