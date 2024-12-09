export default function VehicleDetails() {
    const vehicles = [
      {
        lot: "1-51188714",
        vin: "1GCDC14Z2KE266021",
        yearModel: "1989 GMT",
        odometer: "10883 - Actual",
        color: "White",
        engineType: "lorem ipsum",
        condition: "Used",
        transmission: "Manual",
        fuel: "Gas",
        location: "Kansas City KS"
      },
      {
        lot: "1-51188714",
        vin: "1GCDC14Z2KE266021",
        yearModel: "1989 GMT",
        odometer: "10883 - Actual",
        color: "White",
        engineType: "lorem ipsum",
        condition: "Used",
        transmission: "Manual",
        fuel: "Gas",
        location: "Kansas City KS"
      },
      {
        lot: "1-51188714",
        vin: "1GCDC14Z2KE266021",
        yearModel: "1989 GMT",
        odometer: "10883 - Actual",
        color: "White",
        engineType: "lorem ipsum",
        condition: "Used",
        transmission: "Manual",
        fuel: "Gas",
        location: "Kansas City KS"
      }
    ];
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Vehicle Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-3">
                <DetailRow label="Lot" value={vehicle.lot} />
                <DetailRow label="VIN" value={vehicle.vin} />
                <DetailRow label="Year/Make/Model" value={vehicle.yearModel} />
                <DetailRow label="Odometer" value={vehicle.odometer} />
                <DetailRow label="Color" value={vehicle.color} />
                <DetailRow label="Engine Type" value={vehicle.engineType} />
                <DetailRow label="Condition" value={vehicle.condition} />
                <DetailRow label="Transmission" value={vehicle.transmission} />
                <DetailRow label="Fuel" value={vehicle.fuel} />
                <DetailRow label="Location" value={vehicle.location} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  function DetailRow({ label, value }) {
    return (
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    );
  }
  
  