import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { swatchKeys } from '../content/schema'
import { Swatch } from '../components/Swatch/Swatch'

const meta = {
    title: 'Components/Swatch',
    component: Swatch,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
} satisfies Meta<typeof Swatch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        colours: [
            { name: 'Black', swatch: 'black' },
            { name: 'White', swatch: 'white' },
            { name: 'Slate', swatch: 'slate' },
            { name: 'Red', swatch: 'red' },
            { name: 'Navy', swatch: 'navy' },
        ],
    },
    play: async ({ canvas }) => {
        const list = canvas.getByRole('list', { name: 'Available in:' })
        await expect(list).toBeInTheDocument()
        await expect(canvas.getAllByRole('listitem')).toHaveLength(5)
        await expect(canvas.getByText('Red')).toBeInTheDocument()
    },
}

export const SingleColour: Story = {
    args: {
        colours: [{ name: 'White', swatch: 'white' }],
    },
}

// Every key in the schema, so a missing colour token shows up as a blank dot
export const AllColours: Story = {
    args: {
        colours: swatchKeys.map((swatch) => ({ name: swatch, swatch })),
    },
}
