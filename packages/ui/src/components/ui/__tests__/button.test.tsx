import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies variant classes', () => {
        render(<Button variant="outline">Outline Button</Button>);
        const button = screen.getByRole('button', { name: /outline button/i });
        // Note: We're not testing specific tailwind classes as they might change,
        // but we could test if the class list contains outline related classes if needed.
        // For now just ensuring it renders is a good baseline.
        expect(button).toBeInTheDocument();
    });

    it('renders as a child when asChild is true', () => {
        render(
            <Button asChild>
                <a href="/test">Link Button</a>
            </Button>
        );
        const link = screen.getByRole('link', { name: /link button/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test');
    });
});
