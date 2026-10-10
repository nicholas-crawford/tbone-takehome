import { z } from 'zod'

const cta = z.object({
    label: z.string().min(1),
    href: z.string().min(1),
})

const image = z.object({
    src: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
})

export const swatchKeys = [
    'black',
    'white',
    'light-grey',
    'grey',
    'dark-grey',
    'slate',
    'red',
    'navy',
    'dark-navy',
] as const

const colour = z.object({
    name: z.string().min(1),
    swatch: z.enum(swatchKeys),
})

const model = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    isNew: z.boolean(),
    tagline: z.string(),
    image: image.extend({ alt: z.string() }),
    colours: z.array(colour).min(1),
    specs: z.array(z.string()).min(1),
    priceFrom: z.number().int().positive(),
    bonusNote: z.string(),
    cta,
})

export const pageContentSchema = z.object({
    offer: z.object({
        endsAt: z.iso.datetime({ offset: true }),
    }),
    hero: z.object({
        eyebrow: z.string(),
        heading: z.string(),
        subheading: z.string(),
        image: z.object({ alt: z.string(), mobile: image, desktop: image }),
        ctas: z.array(cta).min(1),
    }),
    finance: z.object({
        eyebrow: z.string(),
        heading: z.string(),
        body: z.array(z.string()).min(1),
        ctas: z.array(cta).min(1),
    }),
    models: z.object({
        heading: z.string(),
        items: z.array(model).min(1),
        priceNote: z.string(),
    }),
    footer: z.object({
        logo: image.extend({ alt: z.string() }),
        acknowledgement: z.string(),
        links: z.array(cta),
        copyright: z.string(),
    }),
    stickyCta: cta,
})

export type PageContent = z.infer<typeof pageContentSchema>
export type Cta = z.infer<typeof cta>
export type Colour = z.infer<typeof colour>
export type SwatchKey = Colour['swatch']
export type Model = z.infer<typeof model>
export type HeroContent = PageContent['hero']
export type FinanceContent = PageContent['finance']
export type ModelsContent = PageContent['models']
export type FooterContent = PageContent['footer']
