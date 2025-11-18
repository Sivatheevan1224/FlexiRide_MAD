// backend/server.js
// Optional Express REST API server to expose backend functions
// Run: node server.js

const express = require('express');
const { signup, login, getUserById } = require('./auth');
const { addVehicle, editVehicle, deleteVehicle, fetchAllVehicles } = require('./vehicles');
const { createBooking, getUserBookings, getAllBookings, updateBookingStatus } = require('./bookings');

const app = express();
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'FlexiRide Backend API' });
});

// ========== AUTH ENDPOINTS ==========

app.post('/api/auth/signup', async (req, res) => {
  const result = await signup(req.body);
  res.json(result);
});

app.post('/api/auth/login', async (req, res) => {
  const result = await login(req.body);
  res.json(result);
});

app.get('/api/auth/user/:uid', async (req, res) => {
  const result = await getUserById(req.params.uid);
  res.json(result);
});

// ========== VEHICLE ENDPOINTS ==========

app.get('/api/vehicles', async (req, res) => {
  const result = await fetchAllVehicles();
  res.json(result);
});

app.post('/api/vehicles', async (req, res) => {
  // For image upload, you'd use multer middleware
  const result = await addVehicle(req.body, null);
  res.json(result);
});

app.put('/api/vehicles/:id', async (req, res) => {
  const result = await editVehicle(req.params.id, req.body, null);
  res.json(result);
});

app.delete('/api/vehicles/:id', async (req, res) => {
  const result = await deleteVehicle(req.params.id);
  res.json(result);
});

// ========== BOOKING ENDPOINTS ==========

app.post('/api/bookings', async (req, res) => {
  const result = await createBooking(req.body);
  res.json(result);
});

app.get('/api/bookings/user/:userId', async (req, res) => {
  const result = await getUserBookings(req.params.userId);
  res.json(result);
});

app.get('/api/bookings/all', async (req, res) => {
  const result = await getAllBookings();
  res.json(result);
});

app.patch('/api/bookings/:id/status', async (req, res) => {
  const result = await updateBookingStatus(req.params.id, req.body.status);
  res.json(result);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 FlexiRide Backend API running on http://localhost:${PORT}`);
  console.log(`📚 API Endpoints:`);
  console.log(`   POST   /api/auth/signup`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   GET    /api/vehicles`);
  console.log(`   POST   /api/vehicles`);
  console.log(`   POST   /api/bookings`);
  console.log(`   GET    /api/bookings/user/:userId\n`);
});
