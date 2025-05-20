"use client"

import React, { useState } from "react"

function AdminLogin({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleLogin = () => {
    if (password === "paisa@08") {
      onLogin()
    } else {
      setError("Invalid password")
    }
  }

  const handleChangePassword = () => {
    if (oldPassword !== "paisa@08") {
      setError("Invalid old password")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }
    setError("Password changed successfully")
    setShowForgotPassword(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Admin Login</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>

        {!showForgotPassword ? (
          <>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleLogin}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Login
              </button>
              <button
                onClick={() => setShowForgotPassword(true)}
                className="w-full text-blue-600 underline"
              >
                Forgot Password?
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleChangePassword}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Change Password
            </button>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-blue-600 underline"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function AdminPanel({
  timeSlots,
  currentDate,
  results,
  onUpdateResult,
}: {
  timeSlots: string[]
  currentDate: string
  results: { [key: string]: string }
  onUpdateResult: (time: string, result: string) => void
}) {
  const [selectedTime, setSelectedTime] = useState("")
  const [result, setResult] = useState("")

  const handleSubmit = () => {
    if (selectedTime && result) {
      onUpdateResult(selectedTime, result)
      setResult("")
      setSelectedTime("")
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 mt-4 shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select time slot</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter Result</label>
          <input
            type="text"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Enter result"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Update Result
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Today's Results</h3>
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((time) => (
            <div
              key={time}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="font-medium">{time}:</span>
              <span className="font-bold">{results[`${currentDate}-${time}`] || "-"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PAISA08App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0])
  const [results, setResults] = useState<{ [key: string]: string }>({})

  const timeSlots: string[] = []
  let currentTime = new Date()
  currentTime.setHours(8, 30, 0)
  const endTime = new Date()
  endTime.setHours(18, 0, 0)

  while (currentTime <= endTime) {
    timeSlots.push(
      currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    )
    currentTime.setMinutes(currentTime.getMinutes() + 30)
  }

  const handleUpdateResult = (time: string, result: string) => {
    setResults((prev) => ({
      ...prev,
      [`${currentDate}-${time}`]: result,
    }))
  }

  return (
    <main className="min-h-screen bg-blue-400 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">PAISA 08</h1>
          {!isAdmin ? (
            <button
              onClick={() => setShowAdminLogin(true)}
              className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Admin Login
            </button>
          ) : (
            <button
              onClick={() => setIsAdmin(false)}
              className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          )}
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="w-48 rounded px-3 py-2"
          />
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="grid grid-cols-4 gap-4 font-semibold mb-4 text-center">
            <div>Time</div>
            <div>Coupon A</div>
            <div>Result</div>
            <div>Coupon B</div>
          </div>

          {timeSlots.map((time, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 mb-2 text-center"
            >
              <div>{time}</div>
              <div>{`A-${index + 1}`}</div>
              <div>{results[`${currentDate}-${time}`] || "-"}</div>
              <div>{`B-${index + 1}`}</div>
            </div>
          ))}
        </div>

        {showAdminLogin && (
          <AdminLogin
            onClose={() => setShowAdminLogin(false)}
            onLogin={() => {
              setIsAdmin(true)
              setShowAdminLogin(false)
            }}
          />
        )}

        {isAdmin && (
          <AdminPanel
            timeSlots={timeSlots}
            currentDate={currentDate}
            results={results}
            onUpdateResult={handleUpdateResult}
          />
        )}
      </div>
    </main>
  )
}

/*
Deployment Instructions:

- Build command: next build
- Publish directory: .next

Use these settings when deploying on Netlify or similar platforms.
*/
