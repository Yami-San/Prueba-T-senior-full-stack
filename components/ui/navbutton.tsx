import { Button } from "@/components/ui/button"

interface NavButtonProps {
    children: React.ReactNode
  }

export function NavButton({ children }: NavButtonProps) {
  return (
    <Button
        variant="outline"
        className="w-full p-6 bg-gradient-to-tl from-blue-900 text-white hover:scale-105"
    >
      {children}
    </Button>
  )
}

