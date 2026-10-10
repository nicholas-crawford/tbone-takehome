import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { formatPrice, withEndDate, wrapTerm } from './format'

describe('withEndDate', () => {
    it('replaces the placeholder with a long-form Australian date', () => {
        expect(withEndDate('Offer ends {endDate}.', '2026-09-30T23:59:59+10:00')).toBe('Offer ends 30 September 2026.')
    })

    it('formats in Sydney time, not the machine time zone', () => {
        expect(withEndDate('{endDate}', '2026-09-30T23:30:00Z')).toBe('1 October 2026')
    })

    it('replaces every placeholder', () => {
        expect(withEndDate('{endDate} / {endDate}', '2026-09-30T23:59:59+10:00')).toBe('30 September 2026 / 30 September 2026')
    })

    it('leaves text without a placeholder unchanged', () => {
        expect(withEndDate('No date here', '2026-09-30T23:59:59+10:00')).toBe('No date here')
    })
})

describe('formatPrice', () => {
    it('formats whole Australian dollars with a thousands separator', () => {
        expect(formatPrice(58990)).toBe('$58,990')
    })

    it('rounds away cents', () => {
        expect(formatPrice(58990.6)).toBe('$58,991')
    })
})

function renderWrapped(text: string) {
    const { container } = render(<p>{wrapTerm(text, 'bZ4X', 'normal-case')}</p>)
    return container.querySelector('p')!
}

describe('wrapTerm', () => {
    it('wraps the term in a span with the given class', () => {
        const p = renderWrapped('Get a quote on bZ4X Touring')

        const span = p.querySelector('span')
        expect(span).toHaveTextContent('bZ4X')
        expect(span).toHaveClass('normal-case')
        expect(p).toHaveTextContent('Get a quote on bZ4X Touring')
    })

    it('wraps every occurrence', () => {
        const p = renderWrapped('bZ4X and bZ4X Touring')

        expect(p.querySelectorAll('span')).toHaveLength(2)
        expect(p).toHaveTextContent('bZ4X and bZ4X Touring')
    })

    it('adds no span when the term is missing', () => {
        const p = renderWrapped('Personalise')

        expect(p.querySelector('span')).toBeNull()
        expect(p).toHaveTextContent('Personalise')
    })
})
