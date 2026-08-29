"use client"
import * as React from "react"
import { CalendarDays, Cake, Heart, Plus, Trash2, Bell } from "lucide-react"
import { addUserReminder, deleteUserReminder } from "@/app/actions/user-reminders"

export function SmartReminders({ reminders }: { reminders: any[] }) {
  const [isAdding, setIsAdding] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleAdd(formData: FormData) {
    setIsSubmitting(true)
    try {
      await addUserReminder(formData)
      setIsAdding(false)
    } catch (error) {
      console.error(error)
      alert("Failed to add reminder")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this reminder?")) return
    try {
      await deleteUserReminder(id)
    } catch (error) {
      console.error(error)
      alert("Failed to delete reminder")
    }
  }

  const getDaysLeft = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    eventDate.setFullYear(today.getFullYear());
    
    if (eventDate < today) {
      eventDate.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = Math.abs(eventDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-[#221F1C]">Smart Reminders</h2>
          <p className="text-sm text-[#6B6259] mt-1">Never miss a special occasion again.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-sm font-medium bg-[#221F1C] text-white px-4 py-2 rounded-full hover:bg-black transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Reminder
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-[#FBF6EE] border border-[#E0D9CF] rounded-sm p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-medium text-[#221F1C] mb-4">Add New Event</h3>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs text-[#9A8F85] mb-1 block">Whose special day is it?</label>
              <input required name="person_name" type="text" placeholder="E.g. Mom, Rohit, etc." className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm bg-white" />
            </div>
            
            <div>
              <label className="text-xs text-[#9A8F85] mb-1 block">Event Type</label>
              <select required name="event_type" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm bg-white">
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="other">Other Occasion</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-[#9A8F85] mb-1 block">Date</label>
              <input required name="event_date" type="date" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm bg-white" />
            </div>

            <div className="md:col-span-2 pt-4 flex gap-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#C1502E] text-white px-6 py-3 rounded-full font-medium hover:bg-[#A33D20] transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Save Reminder"}
              </button>
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="px-6 py-3 border border-[#E0D9CF] text-[#221F1C] rounded-full font-medium hover:bg-white transition-colors bg-transparent"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!reminders || reminders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-[#E0D9CF] border-dashed rounded-sm bg-[#FBF6EE]">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#9A8F85] mb-4 shadow-sm">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-medium text-[#221F1C] mb-2">No reminders set</h3>
          <p className="text-[#6B6259] mb-6 max-w-md">Add birthdays and anniversaries of your loved ones, and we'll remind you 7 days before with a special discount!</p>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 border border-[#C1502E] text-[#C1502E] rounded-full font-medium hover:bg-[#C1502E] hover:text-white transition-colors"
            >
              Add First Reminder
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reminders.map((reminder) => {
            const dateObj = new Date(reminder.event_date);
            const dateStr = dateObj.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
            const daysLeft = getDaysLeft(reminder.event_date);
            
            return (
              <div key={reminder.id} className="border border-[#E0D9CF] rounded-sm p-5 relative bg-white flex items-start gap-4 hover:border-[#9A8F85] transition-colors group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${reminder.event_type === 'anniversary' ? 'bg-pink-100 text-pink-500' : 'bg-blue-100 text-blue-500'}`}>
                  {reminder.event_type === 'anniversary' ? <Heart className="w-6 h-6" /> : <Cake className="w-6 h-6" />}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-[#221F1C] text-lg capitalize">{reminder.person_name}'s {reminder.event_type}</h4>
                  <p className="text-[#6B6259] text-sm mt-0.5">{dateStr}</p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${daysLeft <= 14 ? 'bg-[#FFF8DD] text-[#A67F12]' : 'bg-gray-100 text-gray-600'}`}>
                      <Bell className="w-3 h-3" /> 
                      {daysLeft === 0 ? "Today!" : `In ${daysLeft} days`}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(reminder.id)}
                  className="absolute top-4 right-4 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all p-1"
                  title="Delete reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
