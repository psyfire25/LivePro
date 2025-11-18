import { render, screen } from '@testing-library/react';
import { Card } from '../card';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('Card', () => {
    it('renders correctly with title and children', () => {
        render(
            <Card title="Test Title" href="https://example.com">
                Test Description
            </Card>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders as a link with correct href', () => {
        render(
            <Card title="Link Card" href="https://test.com">
                Content
            </Card>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
