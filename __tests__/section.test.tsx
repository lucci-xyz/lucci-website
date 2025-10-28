import { render, screen } from '@testing-library/react';
import { Section } from '@/components/section';
import { describe, it, expect } from 'vitest';

describe('Section', () => {
  it('renders children correctly', () => {
    render(
      <Section>
        <h1>Test Content</h1>
      </Section>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Section className="custom-class">
        <p>Content</p>
      </Section>
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('applies id attribute when provided', () => {
    const { container } = render(
      <Section id="test-section">
        <p>Content</p>
      </Section>
    );

    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'test-section');
  });

  it('has default padding classes', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );

    const section = container.querySelector('section');
    expect(section?.className).toMatch(/py-16/);
  });

  it('contains a container div', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );

    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
  });
});

