"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Eye, EyeOff, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog"

interface AdminLoginProps {
  onClose: () => void
  onLogin: () => void
}

export default function AdminLogin({ onClose, onLogin }: AdminLoginProps) {
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
    // In a real app, you would update the password in a database
    setError("Password changed successfully")
    setShowForgotPassword(false)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-bold">Admin Login</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DialogDescription className="mb-4">
          Enter your admin credentials to access the admin panel.
        </DialogDescription>

        {!showForgotPassword ? (
          <>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
              <Button
                variant="link"
                className="w-full"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full" onClick={handleChangePassword}>
              Change Password
            </Button>
            <Button
              variant="link"
              className="w-full"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
