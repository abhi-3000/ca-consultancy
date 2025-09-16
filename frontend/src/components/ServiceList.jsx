// This component displays the grid of available services.
function ServiceList({ services, onSelectService }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Services</h1>
      <p className="text-gray-600 mb-8">Select a service to get started.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left flex flex-col"
          >
            <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
            <p className="text-gray-600 mt-2 text-sm flex-grow">
              {service.description}
            </p>
            <button
              onClick={() => onSelectService(service)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition w-full"
            >
              Request Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceList;
