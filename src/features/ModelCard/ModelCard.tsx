import { useId } from "react"
import type { Model } from "../../content/schema"
import { Button } from "../../components/Button/Button"
import { FootnoteText } from "../../components/FootnoteText/FootnoteText"
import { Swatch } from "../../components/Swatch/Swatch"

const priceFormat = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
})

type ModelCardProps = {
    model: Model
}

export function ModelCard({ model }: ModelCardProps) {
    const headingId = useId()
    return (
        <article aria-labelledby={headingId} className="w-full border border-line bg-white sm:max-w-174">
            <div className="relative aspect-343/132 overflow-hidden sm:aspect-696/231">
                <img
                    src="images/Blue%20dots.svg"
                    alt=""
                    className="absolute -top-[2.2%] right-0 w-[21.3%] sm:w-[18.4%]"
                />
                <img
                    src={model.image.src}
                    alt={model.image.alt}
                    width={model.image.width}
                    height={model.image.height}
                    className="absolute top-[2.6%] left-[13.3%] w-[73.3%] sm:top-[2.2%] sm:left-[11.5%] sm:w-[63.2%]"
                />
            </div>

            <div className="px-7 pt-9 pb-7 sm:px-10 sm:pt-21 sm:pb-16">
                <div className="flex items-center gap-3 sm:gap-2.5">
                    <h3 id={headingId} className="text-[22px] leading-none font-semibold sm:text-2xl">
                        {model.name}
                    </h3>
                    {model.isNew && (
                        <span className="inline-flex h-4.75 items-center rounded-xs bg-brand px-2 text-[9px] leading-none font-semibold tracking-widest text-white sm:h-4.5">
                            NEW
                        </span>
                    )}
                </div>

                <p className="pt-4 pb-3 text-sm leading-none sm:pb-3.5 sm:text-[15px]">{model.tagline}</p>

                <Swatch colours={model.colours} />

                <ul className="mt-4 border-b border-line">
                    {model.specs.map((spec) => (
                        <li key={spec} className="border-t border-line py-3.5 text-[12.5px] leading-none sm:py-4">
                            <FootnoteText text={spec} />
                        </li>
                    ))}
                </ul>

                <p className="pt-4 pb-0.5 text-[10px] leading-none tracking-[0.18em] text-muted">FROM</p>
                <p className="text-2xl leading-none font-semibold">
                    {priceFormat.format(model.priceFrom)}
                    <sup className="align-super text-[0.6em] leading-none">*</sup>
                </p>

                <a href="#" className="mt-4 inline-block text-[12.5px] leading-none text-brand underline-offset-2 hover:underline">
                    <FootnoteText text={model.bonusNote} />
                </a>

                <div className="mt-4">
                    <Button href={model.cta.href} variant={"light"} className="uppercase">
                        {model.cta.label}
                    </Button>
                </div>
            </div>
        </article>
    )
}
