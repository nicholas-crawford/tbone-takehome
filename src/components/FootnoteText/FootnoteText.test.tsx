import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FootnoteText } from './FootnoteText'

function renderInParagraph(text: string) {
    const { container } = render(
        <p>
            <FootnoteText text={text} />
        </p>,
    )
    return container.querySelector('p')!
}

describe('FootnoteText', () => {
    it('renders plain text when there are no markers', () => {
        const p = renderInParagraph('280kW AWD · 603L boot')

        expect(p).toHaveTextContent('280kW AWD · 603L boot')
        expect(p.querySelector('sup')).toBeNull()
    })

    it('wraps a trailing marker in a superscript', () => {
        const p = renderInParagraph('Up to 488km range[G69]')

        expect(p.querySelector('sup')).toHaveTextContent('[G69]')
        expect(p).toHaveTextContent('Up to 488km range[G69]')
    })

    it('keeps the text either side of a marker in the middle of a string', () => {
        const p = renderInParagraph('1,500kg braked towing[G6] · V2L power')

        expect(p.querySelector('sup')).toHaveTextContent('[G6]')
        expect(p).toHaveTextContent('1,500kg braked towing[G6] · V2L power')
    })

    it('wraps every marker when there are several', () => {
        const p = renderInParagraph('Range[G66] and towing[G6]')

        const sups = Array.from(p.querySelectorAll('sup'), (sup) => sup.textContent)
        expect(sups).toEqual(['[G66]', '[G6]'])
    })
})
