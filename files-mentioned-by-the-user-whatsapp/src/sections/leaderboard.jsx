// src/sections/Leaderboard.jsx

import React from "react";

const leaderboardData = [
  {
    id: 1,
    name: "Aarav Sharma",
    points: 2450,
    badge: "Eco Hero",
    reports: 82,
  },
  {
    id: 2,
    name: "Priya Patil",
    points: 2210,
    badge: "Green Warrior",
    reports: 74,
  },
  {
    id: 3,
    name: "Rahul Verma",
    points: 1980,
    badge: "Cleanup Master",
    reports: 69,
  },
  {
    id: 4,
    name: "Sneha Joshi",
    points: 1760,
    badge: "Waste Fighter",
    reports: 58,
  },
];

const Leaderboard = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-5xl font-bold text-center text-green-800 mb-4">
          Eco Leaderboard
        </h1>

        <p className="text-center text-gray-700 mb-12 text-lg">
          Citizens contributing towards a cleaner environment 🌍
        </p>

        <div className="grid gap-6">
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300"
            >
              
              <div className="flex items-center gap-5">
                
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white
                  ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-gray-400"
                      : index === 2
                      ? "bg-orange-500"
                      : "bg-green-600"
                  }`}
                >
                  #{index + 1}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {user.name}
                  </h2>

                  <p className="text-green-700 font-medium">
                    {user.badge}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <h3 className="text-3xl font-bold text-green-800">
                  {user.points}
                </h3>

                <p className="text-gray-600">
                  {user.reports} Reports
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <h2 className="text-4xl font-bold text-green-700">1200+</h2>
            <p className="text-gray-600 mt-2">Garbage Reports</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <h2 className="text-4xl font-bold text-green-700">340</h2>
            <p className="text-gray-600 mt-2">Active Citizens</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <h2 className="text-4xl font-bold text-green-700">89%</h2>
            <p className="text-gray-600 mt-2">Cleanup Efficiency</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Leaderboard;