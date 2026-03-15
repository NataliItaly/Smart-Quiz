import { describe, it, expect } from 'vitest';
import { createElement } from '../scripts/utils/createElement';

describe('createElement', () => {

  it('should create element with correct tag', () => {
    const el = createElement({
      tag: 'div',
      className: 'test'
    });

    // tagName property in the DOM always returns the tag name in uppercase
    expect(el.tagName).toBe('DIV');
  });

  it('should add single class', () => {
    const el = createElement({
      tag: 'span',
      className: 'test-class'
    });

    expect(el.classList.contains('test-class')).toBe(true);
  });

  it('should add multiple classes', () => {
    const el = createElement({
      tag: 'div',
      className: ['a', 'b', 'c']
    });

    expect(el.classList.contains('a')).toBe(true);
    expect(el.classList.contains('b')).toBe(true);
    expect(el.classList.contains('c')).toBe(true);
  });

  it('should set id and text content', () => {
    const el = createElement({
      tag: 'p',
      className: 'text',
      id: 'paragraph',
      text: 'This is test paragraph'
    });

    expect(el.id).toBe('paragraph');
    expect(el.textContent).toBe('This is test paragraph');
  });

  it('should set attributes', () => {
    const el = createElement({
      tag: 'button',
      className: 'btn',
      attributes: {
        type: 'submit',
        'data-test': 'button'
      }
    });

    expect(el.getAttribute('type')).toBe('submit');
    expect(el.getAttribute('data-test')).toBe('button');
  });

});