import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return "N/A"
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  } catch (e) {
    return "Invalid Date"
  }
}

export function formatDateWithoutYear(dateString: string | Date | null | undefined): string {
  if (!dateString) return "N/A"
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long"
    })
  } catch (e) {
    return "Invalid Date"
  }
}

export function formatDateTime(dateString: string | Date | null | undefined): string {
  if (!dateString) return "N/A"
  try {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
  } catch (e) {
    return "Invalid Date"
  }
}