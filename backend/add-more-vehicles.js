// Add More Sample Vehicles Script
// Run: node backend/add-more-vehicles.js

const { db } = require('./config');

async function addMoreVehicles() {
  console.log('\n🚗 Adding more sample vehicles...\n');

  try {
    const vehicles = [
      // Cars
      {
        name: 'Tesla Model 3',
        type: 'car',
        pricePerDay: 3500,
        imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
        fuelType: 'Electric',
        transmission: 'Automatic',
        seats: 5,
        availability: true,
        description: 'Premium electric sedan with autopilot features'
      },
      {
        name: 'Maruti Swift',
        type: 'car',
        pricePerDay: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        fuelType: 'Petrol',
        transmission: 'Manual',
        seats: 5,
        availability: true,
        description: 'Compact and fuel-efficient city car'
      },
      {
        name: 'Toyota Innova',
        type: 'car',
        pricePerDay: 2500,
        imageUrl: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400',
        fuelType: 'Diesel',
        transmission: 'Manual',
        seats: 7,
        availability: true,
        description: 'Spacious MPV perfect for family trips'
      },
      {
        name: 'BMW 3 Series',
        type: 'car',
        pricePerDay: 4500,
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        seats: 5,
        availability: true,
        description: 'Luxury sedan with premium features'
      },
      {
        name: 'Mahindra Thar',
        type: 'car',
        pricePerDay: 2800,
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
        fuelType: 'Diesel',
        transmission: 'Manual',
        seats: 4,
        availability: true,
        description: 'Rugged off-road SUV for adventure'
      },

      // Bikes
      {
        name: 'Yamaha R15',
        type: 'bike',
        pricePerDay: 700,
        imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
        fuelType: 'Petrol',
        transmission: 'Manual',
        availability: true,
        description: 'Sporty bike with great performance'
      },
      {
        name: 'KTM Duke 390',
        type: 'bike',
        pricePerDay: 1000,
        imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400',
        fuelType: 'Petrol',
        transmission: 'Manual',
        availability: true,
        description: 'Powerful street bike with aggressive styling'
      },
      {
        name: 'Bajaj Pulsar',
        type: 'bike',
        pricePerDay: 500,
        imageUrl: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=400',
        fuelType: 'Petrol',
        transmission: 'Manual',
        availability: true,
        description: 'Popular commuter bike with good mileage'
      },
      {
        name: 'Hero Splendor',
        type: 'bike',
        pricePerDay: 400,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        fuelType: 'Petrol',
        transmission: 'Manual',
        availability: true,
        description: 'Economic bike for city rides'
      },
      {
        name: 'Harley Davidson Street 750',
        type: 'bike',
        pricePerDay: 2500,
        imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400',
        fuelType: 'Petrol',
        transmission: 'Manual',
        availability: true,
        description: 'Premium cruiser bike for long rides'
      }
    ];

    let addedCount = 0;
    for (const vehicle of vehicles) {
      const docRef = await db.collection('vehicles').add({
        ...vehicle,
        createdAt: new Date().toISOString()
      });
      console.log(`✅ ${vehicle.name} (${vehicle.type}) - ₹${vehicle.pricePerDay}/day`);
      addedCount++;
    }

    console.log(`\n✅ Successfully added ${addedCount} vehicles!\n`);
    console.log('📱 Login to admin panel to manage vehicles:\n');
    console.log('   Email: admin@flexiride.com');
    console.log('   Password: Admin123!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  process.exit(0);
}

addMoreVehicles();
