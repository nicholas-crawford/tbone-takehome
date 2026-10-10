import { Fragment } from "react"

const endDateFormat = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Sydney",
})

export function withEndDate(text: string, endsAt: string) {
    return text.replaceAll("{endDate}", endDateFormat.format(new Date(endsAt)))
}

const priceFormat = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
})

export function formatPrice(amount: number) {
    return priceFormat.format(amount)
}

export function wrapTerm(text: string, term: string, className: string) {
    return text.split(term).map((part, index) => (
        <Fragment key={index}>
            {index > 0 && <span className={className}>{term}</span>}
            {part}
        </Fragment>
    ))
}
