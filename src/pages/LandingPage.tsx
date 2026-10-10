import type { PageContent } from "../content/schema"
import { Button } from "../components/Button/Button"
import { FootnoteText } from "../components/FootnoteText/FootnoteText"
import { ModelCard } from "../features/ModelCard/ModelCard"
import { withEndDate, wrapTerm } from "../utils/format"

type LandingPageProps = {
    content: PageContent
}

export function LandingPage({ content }: LandingPageProps) {
    const { hero, finance, models, footer, stickyCta, offer } = content

    return (
        <>
            <main>
                <section className="relative isolate flex h-150 flex-col justify-end overflow-hidden bg-ink pb-5 text-white sm:h-242.5 sm:border-b sm:border-line sm:pb-20">
                    <img
                        src={hero.image.src}
                        alt={hero.image.alt}
                        width={hero.image.width}
                        height={hero.image.height}
                        className="absolute inset-x-0 top-0 -z-10 h-84 w-full object-cover object-center sm:inset-0 sm:h-full sm:origin-[50%_95%] sm:scale-130"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 -z-10 h-84 bg-linear-to-t from-ink to-transparent to-40% sm:inset-0 sm:h-full sm:to-50%"
                    />

                    <div className="mx-auto flex w-full max-w-200 flex-col items-center gap-5 px-4 text-center sm:gap-7.5 sm:px-0">
                        <p className="bg-brand p-1.25 text-[9px] leading-none tracking-[0.18em] uppercase sm:p-2.5 sm:text-xs sm:tracking-[0.22em]">
                            {withEndDate(hero.eyebrow, offer.endsAt)}
                        </p>

                        <div className="flex flex-col gap-2.5">
                            <h1 className="text-2xl leading-[1.15] font-semibold sm:text-[44px] sm:leading-[1.1] sm:whitespace-pre-line">
                                <FootnoteText text={hero.heading} />
                            </h1>
                            <p className="text-base leading-[1.15] font-semibold sm:text-2xl sm:leading-[1.1]">
                                {hero.subheading}
                            </p>
                        </div>

                        <div className="flex w-full flex-col-reverse gap-5 sm:w-auto sm:flex-row sm:justify-center">
                            {hero.ctas.map((cta) => (
                                <Button key={cta.label} href={cta.href} variant="light" className="uppercase">
                                    {wrapTerm(cta.label, "bZ4X", "normal-case")}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white px-4 py-16 text-center text-ink sm:px-0 sm:py-24">
                    <div className="mx-auto flex max-w-200 flex-col items-center">
                        <p className="mb-4.5 text-[10px] leading-none tracking-[0.22em] uppercase">{finance.eyebrow}</p>

                        <h2 className="mb-6.5 text-[29px] leading-[1.18] font-normal sm:mb-7 sm:text-[44px] sm:leading-[1.14]">
                            {finance.heading}
                        </h2>

                        {finance.body.map((paragraph, index) => (
                            <p key={index} className="mb-4.5 text-[15px] leading-[1.6] sm:mb-7.5 sm:text-[17px]">
                                <FootnoteText text={withEndDate(paragraph, offer.endsAt)} />
                            </p>
                        ))}

                        <div className="mt-2 flex w-full flex-col-reverse gap-5 sm:mt-0 sm:w-auto sm:flex-row sm:justify-center">
                            {finance.ctas.map((cta) => (
                                <Button key={cta.label} href={cta.href} variant="dark" className="uppercase">
                                    {wrapTerm(cta.label, "bZ4X", "normal-case")}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white px-4 pb-16 text-ink sm:px-6 sm:pb-24">
                    <h2 className="mb-7.5 text-center text-[28px] leading-[1.18] font-normal text-balance sm:mb-10 sm:text-[44px] sm:leading-[1.14]">
                        {wrapTerm(models.heading, "bZ4X", "text-brand")}
                    </h2>

                    <div className="mx-auto max-w-150 lg:max-w-306">
                        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                            {models.items.map((model) => (
                                <ModelCard key={model.id} model={model} />
                            ))}
                        </div>

                        <p className="mt-4 text-[11px] leading-normal text-muted sm:text-xs">{models.priceNote}</p>
                    </div>
                </section>
            </main>

            <footer className="bg-footer px-4 pt-21.5 pb-6 sm:px-6 sm:pt-10 sm:pb-10">
                <div className="mx-auto max-w-306">
                    <p className="mb-4.5 text-[11.5px] leading-[1.65] text-footer-text sm:mb-6 sm:text-xs">
                        {footer.acknowledgement}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-5">
                            <ul className="flex gap-5">
                                {footer.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-xs leading-none text-footer-link underline">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <p className="leading-none">
                                <small className="text-[10px] leading-none text-footer-fine">{footer.copyright}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="sticky bottom-0 border-t border-line bg-white p-4 sm:hidden">
                <Button href={stickyCta.href} variant="dark" className="uppercase">
                    {stickyCta.label}
                </Button>
            </div>
        </>
    )
}
