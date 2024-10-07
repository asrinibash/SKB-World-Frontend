/* eslint-disable react/prop-types */

const PricingCard = ({ plan, price, features, color }) => {
  return (
    <div
      className={`max-w-xs p-6 border rounded-lg shadow-lg ${color} transform transition-transform hover:scale-105 duration-300`}
    >
      <h2 className="text-xl font-bold mb-4 text-black">{plan}</h2>
      <p className="text-4xl font-bold mb-4 text-black">${price}</p>
      <p className="text-gray-600 mb-6">
        Lorem ipsum dolor sit amet, consec Lorem ipsum dolor
      </p>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center mb-2 ${
              feature.included ? "text-green-500" : "text-red-500"
            }`}
          >
            <span className="mr-2">{feature.included ? "✔" : "✖"}</span>
            {feature.name}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 text-white font-bold rounded transition-colors duration-300 hover:shadow-lg ${
          plan === "BASIC"
            ? "bg-orange-500 hover:bg-orange-600"
            : plan === "STANDARD"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-yellow-500 hover:bg-yellow-600"
        }`}
      >
        BUY
      </button>
    </div>
  );
};

const Subscriptions = () => {
  const pricingPlans = [
    {
      plan: "BASIC",
      price: "9.9",
      color: "bg-green-100",
      features: [
        { name: "Lorem ipsum dolor", included: true },
        { name: "Lorem ipsum dolor", included: true },
        { name: "Lorem ipsum dolor", included: false },
      ],
    },
    {
      plan: "STANDARD",
      price: "29.9",
      color: "bg-green-200",
      features: [
        { name: "Lorem ipsum dolor", included: true },
        { name: "Lorem ipsum dolor", included: true },
        { name: "Lorem ipsum dolor", included: false },
      ],
    },
    {
      plan: "PRO",
      price: "49.9",
      color: "bg-green-300",
      features: [
        { name: "Lorem ipsum dolor", included: true },
        { name: "Lorem ipsum dolor", included: true },
        { name: "Lorem ipsum dolor", included: false },
      ],
    },
  ];

  return (
    <div className="text-center my-10">
      {/* Heading Section */}
      <h1 className="text-3xl font-bold mb-4">Subscription Plans</h1>
      <p className="text-gray-600 mb-8">
        Choose the perfect plan that suits your needs. Each plan is crafted to
        give you the best experience.
      </p>

      {/* Pricing Cards Section */}
      <div className="flex justify-center space-x-6">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            plan={plan.plan}
            price={plan.price}
            features={plan.features}
            color={plan.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
