import type { ComponentProps } from "react"

export type ButtonVariant = "dark" | "light"

const variantClasses: Record<ButtonVariant, string> = {
    dark: "bg-ink text-white hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink",
    light: "bg-white text-ink hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white",
}

type ButtonProps = ComponentProps<"a"> & {
    href: string
    variant?: ButtonVariant
}

export function Button({ variant = "dark", className = "", children, ...props }: ButtonProps) {
    return (
        <a
            {...props}
            className={`inline-flex h-12 w-full items-center justify-center rounded-full border border-ink px-9.5 text-center text-[13px] font-semibold tracking-[0.16em] whitespace-nowrap sm:w-auto transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent ${variantClasses[variant]} ${className}`}
        >
           <span>{children}</span>
        </a>
    )
}
