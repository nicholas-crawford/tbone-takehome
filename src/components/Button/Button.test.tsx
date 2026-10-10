import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
    it('renders a link with its label as the accessible name', () => {
        render(<Button href="/quote">GET A QUOTE ON bZ4X</Button>)

        expect(screen.getByRole('link', { name: 'GET A QUOTE ON bZ4X' })).toHaveAttribute(
            'href',
            '/quote',
        )
    })

    it('renders the label exactly as given, without changing its case', () => {
        render(<Button href="/quote">GET A QUOTE ON bZ4X</Button>)

        expect(screen.getByRole('link')).toHaveTextContent('GET A QUOTE ON bZ4X')
    })

    it('passes native anchor attributes through', () => {
        render(
            <Button href="/quote" target="_blank" rel="noopener">
                Quote
            </Button>,
        )

        const link = screen.getByRole('link', { name: 'Quote' })
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener')
    })
})
