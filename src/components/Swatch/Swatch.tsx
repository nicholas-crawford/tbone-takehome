import { useId } from "react"
import type { Colour, SwatchKey } from "../../content/schema"

const swatchBg: Record<SwatchKey, string> = {
    black: "bg-swatch--black",
    white: "bg-swatch--white",
    "light-grey": "bg-swatch--light-grey",
    grey: "bg-swatch--grey",
    "dark-grey": "bg-swatch--dark-grey",
    slate: "bg-swatch--slate",
    red: "bg-swatch--red",
    navy: "bg-swatch--navy",
    "dark-navy": "bg-swatch--dark-navy",
}

type SwatchProps = {
    colours: Colour[]
}

export function Swatch({ colours }: SwatchProps) {
    const labelId = useId()
    return (
        <div className="flex items-center gap-3">
            <p id={labelId} className="text-[12.5px] font-normal">Available in:</p>
            <ul role="list" aria-labelledby={labelId} className="flex flex-wrap gap-2">
                {colours.map((colour) => (
                    <li key={colour.swatch}>
                        <span
                            aria-hidden="true"
                            className={`block size-4 rounded-full ring-1 ring-swatch-ring forced-color-adjust-none ${swatchBg[colour.swatch]}`}
                        />
                        <span className="sr-only">{colour.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
