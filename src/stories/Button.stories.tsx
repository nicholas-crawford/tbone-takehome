import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Button } from '../components/Button/Button'

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
    args: { href: '#', children: 'GET A QUOTE ON bZ4X TOURING' },
    argTypes: {
        variant: { control: 'inline-radio', options: ['dark', 'light'] },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {
    args: { variant: 'dark' },
    play: async ({ canvas }) => {
        await expect(
            canvas.getByRole('link', { name: 'GET A QUOTE ON bZ4X TOURING' }),
        ).toBeInTheDocument()
    },
}

export const Light: Story = {
    args: { variant: 'light', children: 'GET A QUOTE ON bZ4X' },
    decorators: [
        (Story) => (
            <div className="bg-ink p-7">
                <Story />
            </div>
        ),
    ],
}

// Mobile: fills the container, gutter comes from the parent.
export const MobileInCard: Story = {
    args: { variant: 'dark' },
    globals: { viewport: { value: 'mobile1' } },
    decorators: [
        (Story) => (
            <div className="bg-white px-7 py-6">
                <Story />
            </div>
        ),
    ],
}
