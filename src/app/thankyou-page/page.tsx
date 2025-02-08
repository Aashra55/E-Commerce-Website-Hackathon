export default function ThankYou() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <h3 className="text-2xl font-semibold text-gray-800">
          Thank You for Shopping!
        </h3>
        <p className="text-gray-600 mt-2">
          Your order has been successfully placed. You will be redirected
          shortly...
        </p>
      </div>
    </div>
  );
}
