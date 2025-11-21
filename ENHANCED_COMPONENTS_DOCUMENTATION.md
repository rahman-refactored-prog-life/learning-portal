# Enhanced UI Components Documentation

## Overview

This document provides comprehensive documentation for the Enhanced UI Component Library, including usage examples, accessibility guidelines, and migration guide.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Enhanced Cards](#enhanced-cards)
3. [Enhanced Buttons](#enhanced-buttons)
4. [Animations](#animations)
5. [Accessibility](#accessibility)
6. [Migration Guide](#migration-guide)

---

## Design Tokens

### Usage

Design tokens are CSS custom properties that ensure consistent styling across the application.

```css
/* Import in your CSS file */
@import './styles/design-tokens.css';

/* Use in your styles */
.my-component {
  color: var(--color-primary);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  transition: all var(--duration-200) var(--ease-out);
}
```

### Available Tokens

**Colors**: `--color-primary`, `--color-success`, `--color-warning`, `--color-error`, `--color-neutral-*`

**Spacing**: `--space-1` through `--space-32` (4px base unit)

**Typography**: `--font-size-xs` through `--font-size-6xl`, `--font-weight-*`, `--line-height-*`

**Shadows**: `--shadow-xs` through `--shadow-2xl`, `--shadow-primary`, `--shadow-success`

**Animations**: `--duration-*`, `--ease-*`

---

## Enhanced Cards

### ModuleCard

Display learning modules with progress tracking.

**Props**:
- `title` (string, required): Module title
- `description` (string, required): Module description
- `icon` (ReactNode, optional): Module icon
- `difficulty` (string, optional): Difficulty level
- `progress` (number, optional): Progress percentage (0-100)
- `topicCount` (number, optional): Number of topics
- `estimatedHours` (number, optional): Estimated hours
- `onClick` (function, optional): Click handler
- `className` (string, optional): Additional CSS classes

**Example**:
```tsx
<ModuleCard
  title="Java Fundamentals"
  description="Master the basics of Java programming"
  icon={<BookIcon />}
  difficulty="Beginner"
  progress={65}
  topicCount={25}
  estimatedHours={12}
  onClick={() => navigate('/modules/java')}
/>
```

**Accessibility**:
- ✅ Keyboard navigable (when onClick provided)
- ✅ Focus visible outline
- ✅ Semantic HTML
- ✅ ARIA labels automatically applied

---

### StatCard

Display dashboard statistics with trend indicators.

**Props**:
- `title` (string, required): Stat title
- `value` (string | number, required): Stat value
- `icon` (ReactNode, optional): Stat icon
- `change` (string, optional): Change indicator
- `trend` ('up' | 'down' | 'neutral', optional): Trend direction
- `color` (string, optional): Custom icon color
- `className` (string, optional): Additional CSS classes

**Example**:
```tsx
<StatCard
  title="Modules Completed"
  value={12}
  icon={<CheckIcon />}
  change="+2 this week"
  trend="up"
  color="var(--color-success)"
/>
```

---

### QuickActionCard

Display common user actions.

**Props**:
- `title` (string, required): Action title
- `description` (string, optional): Action description
- `icon` (ReactNode, optional): Action icon
- `onClick` (function, optional): Click handler
- `color` (string, optional): Custom icon color
- `className` (string, optional): Additional CSS classes

**Example**:
```tsx
<QuickActionCard
  title="Practice Interview Questions"
  description="500+ FAANG questions"
  icon={<CodeIcon />}
  onClick={() => navigate('/interview-prep')}
  color="var(--color-primary)"
/>
```

---

### ProgressCard

Display milestone tracking with priority indicators.

**Props**:
- `title` (string, required): Milestone title
- `description` (string, optional): Milestone description
- `progress` (number, required): Current progress
- `target` (number, optional): Target value (default: 100)
- `dueDate` (string, optional): Due date
- `priority` ('low' | 'medium' | 'high', optional): Priority level
- `className` (string, optional): Additional CSS classes

**Example**:
```tsx
<ProgressCard
  title="Spring Boot Expert"
  description="Complete Spring Framework module"
  progress={65}
  target={100}
  dueDate="Next week"
  priority="high"
/>
```

---

### AchievementCard

Display user achievements.

**Props**:
- `title` (string, required): Achievement title
- `description` (string, required): Achievement description
- `icon` (string, optional): Achievement icon (emoji)
- `date` (string, optional): Date earned
- `type` (string, optional): Achievement type
- `className` (string, optional): Additional CSS classes

**Example**:
```tsx
<AchievementCard
  title="Java Master"
  description="Completed Java Fundamentals with 95% score"
  icon="🏆"
  date="2 days ago"
/>
```

---

## Enhanced Buttons

### EnhancedButton

Base button component with multiple variants.

**Props**:
- `children` (ReactNode, required): Button content
- `variant` ('primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'danger', optional): Button variant
- `size` ('sm' | 'md' | 'lg', optional): Button size
- `icon` (ReactNode, optional): Button icon
- `iconPosition` ('left' | 'right', optional): Icon position
- `loading` (boolean, optional): Loading state
- `disabled` (boolean, optional): Disabled state
- `fullWidth` (boolean, optional): Full width button
- `onClick` (function, optional): Click handler
- `type` ('button' | 'submit' | 'reset', optional): Button type

**Example**:
```tsx
<EnhancedButton
  variant="primary"
  size="md"
  icon={<PlayIcon />}
  iconPosition="left"
  loading={isLoading}
  onClick={handleSubmit}
>
  Start Learning
</EnhancedButton>
```

**Variant Components**:
```tsx
<PrimaryButton>Primary</PrimaryButton>
<SecondaryButton>Secondary</SecondaryButton>
<GhostButton>Ghost</GhostButton>
<SuccessButton>Success</SuccessButton>
<WarningButton>Warning</WarningButton>
<DangerButton>Danger</DangerButton>
```

---

### IconButton

Icon-only button with tooltip.

**Props**:
- `icon` (ReactNode, required): Button icon
- `size` ('sm' | 'md' | 'lg', optional): Button size
- `variant` (ButtonVariant, optional): Button variant
- `tooltip` (string, optional): Tooltip text
- `onClick` (function, optional): Click handler
- `disabled` (boolean, optional): Disabled state

**Example**:
```tsx
<IconButton
  icon={<HeartIcon />}
  tooltip="Like"
  variant="primary"
  onClick={handleLike}
/>
```

---

### FloatingActionButton

Fixed position circular button.

**Props**:
- `icon` (ReactNode, required): Button icon
- `onClick` (function, optional): Click handler
- `tooltip` (string, optional): Tooltip text
- `position` ('bottom-right' | 'bottom-left' | 'top-right' | 'top-left', optional): Button position

**Example**:
```tsx
<FloatingActionButton
  icon={<PlusIcon />}
  tooltip="Add New"
  position="bottom-right"
  onClick={handleAdd}
/>
```

---

### ButtonGroup

Group related buttons.

**Props**:
- `children` (ReactNode, required): Button elements
- `orientation` ('horizontal' | 'vertical', optional): Group orientation

**Example**:
```tsx
<ButtonGroup orientation="horizontal">
  <SecondaryButton>Left</SecondaryButton>
  <SecondaryButton>Middle</SecondaryButton>
  <SecondaryButton>Right</SecondaryButton>
</ButtonGroup>
```

---

## Animations

### Utility Classes

**Fade In**:
```tsx
<div className="animate-fade-in">Content</div>
<div className="animate-fade-in-up">Content</div>
<div className="animate-fade-in-down">Content</div>
```

**Hover Effects**:
```tsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-scale">Scales on hover</div>
<div className="hover-glow">Glows on hover</div>
```

**Staggered Animations**:
```tsx
<div className="stagger-children">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Accessibility

### WCAG 2.1 AA Compliance

All enhanced components meet WCAG 2.1 AA standards:

✅ **Color Contrast**: All text meets 4.5:1 contrast ratio
✅ **Keyboard Navigation**: All interactive elements are keyboard accessible
✅ **Focus Indicators**: Visible focus outlines on all interactive elements
✅ **Screen Reader Support**: Semantic HTML and ARIA labels
✅ **Reduced Motion**: Respects `prefers-reduced-motion` preference

### Keyboard Navigation

**Cards with onClick**:
- `Tab`: Focus card
- `Enter` or `Space`: Activate card

**Buttons**:
- `Tab`: Focus button
- `Enter` or `Space`: Activate button

**Button Groups**:
- `Tab`: Navigate between buttons
- `Arrow keys`: Navigate within group

### Screen Reader Support

All components include appropriate ARIA labels:

```tsx
<IconButton
  icon={<DeleteIcon />}
  tooltip="Delete item"
  aria-label="Delete item"
/>
```

### Reduced Motion

Users who prefer reduced motion will see instant transitions:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Migration Guide

### From Basic to Enhanced Components

**Step 1**: Import enhanced components
```tsx
// Before
import { Button, Card } from './components';

// After
import { Button, Card, EnhancedButton, ModuleCard } from './components';
```

**Step 2**: Use enhanced components alongside existing ones
```tsx
// Existing components still work
<Button variant="primary">Old Button</Button>

// New enhanced components
<PrimaryButton>New Button</PrimaryButton>
```

**Step 3**: Gradually migrate
```tsx
// Replace one component at a time
// Before
<Card>
  <h3>Module Title</h3>
  <p>Description</p>
</Card>

// After
<ModuleCard
  title="Module Title"
  description="Description"
  progress={50}
/>
```

### No Breaking Changes

✅ All existing components remain functional
✅ Enhanced components are additions, not replacements
✅ Can use both old and new components together
✅ Migrate at your own pace

---

## Best Practices

### Performance

1. **Use hardware acceleration** for animations:
```css
.my-component {
  transform: translateZ(0);
  will-change: transform;
}
```

2. **Limit animations** to transform and opacity:
```css
/* Good */
transition: transform 200ms, opacity 200ms;

/* Avoid */
transition: width 200ms, height 200ms;
```

### Consistency

1. **Use design tokens** for all styling:
```css
/* Good */
color: var(--color-primary);

/* Avoid */
color: #3b82f6;
```

2. **Follow spacing scale**:
```css
/* Good */
padding: var(--space-4);

/* Avoid */
padding: 17px;
```

### Accessibility

1. **Always provide tooltips** for icon buttons:
```tsx
<IconButton icon={<Icon />} tooltip="Action name" />
```

2. **Use semantic HTML**:
```tsx
/* Good */
<button onClick={handleClick}>Click me</button>

/* Avoid */
<div onClick={handleClick}>Click me</div>
```

---

## Support

For questions or issues:
1. Check this documentation
2. Review component showcase at `/showcase` (dev mode)
3. Check design tokens in `frontend/src/styles/design-tokens.css`
4. Review source code in `frontend/src/components/`

---

**Last Updated**: 2024-11-20
**Version**: 1.0.0
**Status**: Production Ready
