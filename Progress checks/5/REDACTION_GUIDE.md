# REDACTION STYLING TECHNIQUES GUIDE

Complete guide to creating authentic-looking redacted text for classified documents.

---

## Table of Contents
1. [Basic Redaction Styles](#basic-redaction-styles)
2. [Advanced Techniques](#advanced-techniques)
3. [CSS Methods](#css-methods)
4. [JavaScript Enhancement](#javascript-enhancement)
5. [Best Practices](#best-practices)

---

## Basic Redaction Styles

### Method 1: Black Box (Most Common)

```html
<span class="redacted">████████</span>
```

```css
.redacted {
    background-color: #000000;
    color: #000000;
    padding: 2px 4px;
    border-radius: 2px;
    user-select: none;
}
```

**Use for:** Names, dates, short phrases

---

### Method 2: Block Redaction

```html
<span class="redacted-block">████████████████</span>
```

```css
.redacted-block {
    background-color: #000000;
    color: #000000;
    padding: 2px 8px;
    display: inline-block;
    min-width: 120px;
    border-radius: 2px;
}
```

**Use for:** Longer phrases, locations, classifications

---

### Method 3: Full Line Redaction

```html
<p class="redacted-line">████████████████████████████████</p>
```

```css
.redacted-line {
    background-color: #000000;
    color: #000000;
    height: 20px;
    margin: 5px 0;
    border-radius: 2px;
}
```

**Use for:** Complete sentences, full addresses

---

### Method 4: Paragraph Redaction

```html
<div class="redacted-paragraph">
    <p class="fully-redacted">████████████████████████████████████████</p>
</div>
```

```css
.redacted-paragraph {
    background-color: #f0f0f0;
    border-left: 4px solid #000000;
    padding: 15px;
    margin: 15px 0;
}

.fully-redacted {
    background-color: #000000;
    color: #000000;
    padding: 10px;
    line-height: 1.8;
}
```

**Use for:** Sensitive sections, classified paragraphs

---

## Advanced Techniques

### Technique 1: Partial Redaction

```html
The agent's name is Jo<span class="redacted">██</span> Sm<span class="redacted">███</span>
```

**Effect:** Creates impression of partially visible information

---

### Technique 2: Variable-Width Redaction

```css
.redacted-xs { min-width: 30px; }
.redacted-sm { min-width: 60px; }
.redacted-md { min-width: 100px; }
.redacted-lg { min-width: 150px; }
.redacted-xl { min-width: 200px; }
```

```html
Subject <span class="redacted redacted-md">████████</span> was located at 
<span class="redacted redacted-lg">████████████</span>
```

---

### Technique 3: Strikethrough Style

```html
<span class="redacted-strike">CLASSIFIED INFORMATION</span>
```

```css
.redacted-strike {
    background: repeating-linear-gradient(
        45deg,
        #000,
        #000 2px,
        #fff 2px,
        #fff 4px
    );
    color: transparent;
    padding: 2px 8px;
}
```

**Effect:** Diagonal stripes pattern (alternative style)

---

### Technique 4: Pixelated Redaction

```css
.redacted-pixel {
    filter: blur(8px);
    background-color: #000;
    color: #000;
    padding: 2px 8px;
}
```

**Effect:** Blurred/pixelated appearance

---

### Technique 5: Document-Style Marker

```html
<span class="redacted-marker">[REDACTED BY ORDER OF DIR. FBI]</span>
```

```css
.redacted-marker {
    background-color: #ffeb3b;
    color: #000;
    padding: 2px 8px;
    font-weight: bold;
    font-size: 10px;
    border: 1px solid #fbc02d;
}
```

**Effect:** Shows redaction was intentional with official notice

---

## CSS Methods

### Method 1: Using Unicode Block Characters

```html
<!-- Direct characters -->
█████████

<!-- CSS Generated -->
<span class="redacted-generated"></span>
```

```css
.redacted-generated::before {
    content: "████████";
    background-color: #000;
}
```

---

### Method 2: Background Gradients

```css
.redacted-gradient {
    background: linear-gradient(to right, #000 0%, #333 50%, #000 100%);
    color: transparent;
    padding: 2px 8px;
}
```

**Effect:** Subtle gradient for depth

---

### Method 3: Shadow Effects

```css
.redacted-shadow {
    background-color: #000;
    color: #000;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
}
```

**Effect:** Adds subtle texture

---

### Method 4: Border Variations

```css
.redacted-bordered {
    background-color: #000;
    border: 2px solid #333;
    color: #000;
    padding: 2px 8px;
}
```

---

## JavaScript Enhancement

### Dynamic Redaction Generator

```javascript
class RedactionGenerator {
    static generate(text, type = 'full') {
        const length = text.length;
        const block = '█';
        
        switch(type) {
            case 'full':
                return block.repeat(length);
            case 'partial':
                return text.split('').map((char, i) => 
                    i % 3 === 0 ? char : block
                ).join('');
            case 'random':
                return text.split('').map(char => 
                    Math.random() > 0.3 ? block : char
                ).join('');
            default:
                return block.repeat(length);
        }
    }
    
    static redactElement(element, type = 'full') {
        const original = element.textContent;
        const redacted = this.generate(original, type);
        
        element.textContent = redacted;
        element.classList.add('redacted');
        element.dataset.original = original; // Store for potential reveal
    }
}

// Usage
RedactionGenerator.redactElement(document.querySelector('.sensitive-info'));
```

---

### Interactive Redaction Reveal (Educational Only)

```javascript
function setupRedactionReveal() {
    document.querySelectorAll('.redacted').forEach(element => {
        element.addEventListener('click', function(e) {
            if (e.ctrlKey && e.shiftKey) { // Require Ctrl+Shift+Click
                this.style.backgroundColor = 'yellow';
                this.style.color = '#000';
                
                setTimeout(() => {
                    this.style.backgroundColor = '#000';
                    this.style.color = '#000';
                }, 3000); // Re-redact after 3 seconds
            }
        });
    });
}
```

---

### Auto-Redaction Based on Patterns

```javascript
function autoRedact(text) {
    // Redact SSN patterns
    text = text.replace(/\d{3}-\d{2}-\d{4}/g, 
        '<span class="redacted">███-██-████</span>');
    
    // Redact email addresses
    text = text.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, 
        '<span class="redacted">████████@███████</span>');
    
    // Redact phone numbers
    text = text.replace(/\d{3}-\d{3}-\d{4}/g, 
        '<span class="redacted">███-███-████</span>');
    
    // Redact dates
    text = text.replace(/\d{1,2}\/\d{1,2}\/\d{4}/g, 
        '<span class="redacted">██/██/████</span>');
    
    return text;
}
```

---

## Best Practices

### ✅ DO:
- Use consistent styling throughout document
- Match redaction length roughly to original text
- Consider accessibility (use aria-label if needed)
- Prevent text selection with `user-select: none`
- Use semantic HTML with proper classes
- Test print appearance

### ❌ DON'T:
- Make redactions too small or too large
- Use actual sensitive data in examples
- Allow redaction reveal in production
- Forget mobile responsiveness
- Overlook print stylesheets

---

## Accessibility Considerations

```html
<span class="redacted" 
      aria-label="redacted content" 
      role="img">
    ████████
</span>
```

```css
.redacted:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}
```

---

## Print-Specific Styles

```css
@media print {
    .redacted,
    .redacted-block,
    .redacted-long {
        background-color: #000 !important;
        color: #000 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}
```

---

## Complete Example

```html
<div class="classified-content">
    <p>
        The operation took place on 
        <span class="redacted redacted-md">██/██/████</span> at location
        <span class="redacted-block">████████████████</span>.
        Agent <span class="redacted">████████</span> reported that
        <span class="redacted-long">████████████████████████████</span>
        was successfully completed.
    </p>
    
    <div class="redacted-paragraph">
        <p class="fully-redacted">
            ████████████████████████████████████████████████████
            ████████████████████████████████████████████████████
        </p>
    </div>
    
    <p>
        Further details available in report 
        <span class="redacted">TS-████-███</span>.
    </p>
</div>
```

---

## Quick Reference Chart

| Style | HTML Class | Best For | Width |
|-------|-----------|----------|-------|
| Basic | `.redacted` | Names, short text | Auto |
| Block | `.redacted-block` | Phrases | 120px+ |
| Long | `.redacted-long` | Sentences | 200px+ |
| Line | `.redacted-line` | Full lines | 100% |
| Paragraph | `.fully-redacted` | Sections | 100% |

---

**Remember:** This is for educational and creative purposes only. All examples are fictional.
