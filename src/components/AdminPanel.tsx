"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface AdminPanelProps {
  timeSlots: string[]
  currentDate: string
  results: { [key: string]: string }
  onUpdateResult: (time: string, result: string) => void
}

export default function AdminPanel({
  timeSlots,
  currentDate,
  results,
  onUpdateResult,
}: AdminPanelProps) {
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
    <Card className="p-6 mt-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Time</label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter Result</label>
          <Input
            type="text"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Enter result"
          />
        </div>
      </div>
      <Button className="mt-6 w-full" onClick={handleSubmit}>
        Update Result
      </Button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Today's Results</h3>
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((time) => (
            <div key={time} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{time}:</span>
              <span className="font-bold">
                {results[`${currentDate}-${time}`] || "-"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
