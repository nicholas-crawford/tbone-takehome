import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Colour } from '../../content/schema'
import { Swatch } from './Swatch'

const colours: Colour[] = [
    { name: 'Black', swatch: 'black' },
    { name: 'Slate', swatch: 'slate' },
    { name: 'Red', swatch: 'red' },
]

describe('Swatch', () => {
    it('renders a list labelled by the "Available in:" text', () => {
        render(<Swatch colours={colours} />)

        expect(screen.getByRole('list', { name: 'Available in:' })).toBeInTheDocument()
    })

    it('renders one list item per colour, in order', () => {
        render(<Swatch colours={colours} />)

        const items = within(screen.getByRole('list')).getAllByRole('listitem')
        expect(items.map((item) => item.textContent)).toEqual(['Black', 'Slate', 'Red'])
    })

    it('exposes each colour name as text but hides the dot from assistive tech', () => {
        render(<Swatch colours={[{ name: 'Red', swatch: 'red' }]} />)

        const item = screen.getByRole('listitem')
        expect(within(item).getByText('Red')).toBeInTheDocument()
        expect(item.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    })

    it('labels each list independently when rendered more than once', () => {
        render(
            <>
                <Swatch colours={colours} />
                <Swatch colours={colours} />
            </>,
        )

        const lists = screen.getAllByRole('list', { name: 'Available in:' })
        expect(lists).toHaveLength(2)
        expect(lists[0].getAttribute('aria-labelledby')).not.toBe(
            lists[1].getAttribute('aria-labelledby'),
        )
    })
})
