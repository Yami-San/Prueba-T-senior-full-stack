import { Button } from "@/components/ui/button"

interface CenterButtonProps {
    children: React.ReactNode
  }

export function CenterButton({ children }: CenterButtonProps) {
  return (
    <Button
        variant="outline"
        className="w-1/4 h-32 rounded-3xl bg-gradient-to-r from-slate-300 via-teal-100 to-gray-500 flex justify-center items-center transition-transform hover:scale-125 hover:bg-gradient-to-b hover:from-primary hover:via-amber-100 text-3xl"
    >
      {children}
    </Button>
  )
}

