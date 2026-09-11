export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}