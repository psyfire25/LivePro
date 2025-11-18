import { render, screen } from '@testing-library/react';
import { Input } from '../input';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('Input', () => {
    it('renders correctly', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('accepts value and onChange', () => {
        const handleChange = jest.fn();
        render(<Input value="test value" onChange={handleChange} />);
        const input = screen.getByDisplayValue('test value');
        expect(input).toBeInTheDocument();
    });

    it('renders with type', () => {
        render(<Input type="password" placeholder="Password" />);
        const input = screen.getByPlaceholderText('Password');
        expect(input).toHaveAttribute('type', 'password');
    });
});
