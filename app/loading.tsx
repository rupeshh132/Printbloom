import { LogoLoader } from "@/components/ui/logo-loader"

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LogoLoader className="w-80 md:w-96" />
    </div>
  )
}