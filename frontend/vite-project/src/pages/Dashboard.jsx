import React from "react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "₹1,25,450",
      icon: "💰",
    },
    {
      title: "Products",
      value: "245",
      icon: "📦",
    },
    {
      title: "Customers",
      value: "1,248",
      icon: "👥",
    },
    {
      title: "Today's Orders",
      value: "42",
      icon: "🛒",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-slate-800">
                  {item.value}
                </h2>
              </div>

              <div className="text-4xl">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              Recent Sales
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4">Invoice</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="p-4">INV-1001</td>
                  <td className="p-4">Rahul Kumar</td>
                  <td className="p-4">₹2,500</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">INV-1002</td>
                  <td className="p-4">Amit Singh</td>
                  <td className="p-4">₹4,800</td>
                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">INV-1003</td>
                  <td className="p-4">Priya Sharma</td>
                  <td className="p-4">₹1,250</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
              Add Product
            </button>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
              Create Sale
            </button>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
              Add Customer
            </button>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;