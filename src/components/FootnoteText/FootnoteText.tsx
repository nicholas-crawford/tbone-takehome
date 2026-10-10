import { Fragment } from "react"

// Matches footnote markers like [G69] or [F30]. The capture group keeps them in split() output.
const footnotePattern = /(\[[A-Z]+\d+\])/

type FootnoteTextProps = {
    text: string
}

export function FootnoteText({ text }: FootnoteTextProps) {
    return text.split(footnotePattern).map((part, index) =>
        index % 2 === 1 ? (
            <sup key={index} className="align-super text-[0.6em] leading-none">{part}</sup>
        ) : (
            <Fragment key={index}>{part}</Fragment>
        ),
    )
}
