# MARKDOWN-BASED CLASSIFIED DOCUMENT TEMPLATE

This template demonstrates how to create classified documents using Markdown syntax that can be converted to HTML.

---

## Document Header Template

```markdown
---
classification: TOP SECRET
document_id: TS-2026-FBI-00234
date: 20 JANUARY 2026
originator: FEDERAL BUREAU OF INVESTIGATION
warning: "This document contains information affecting national security..."
---
```

---

## Basic Document Structure

### Executive Summary

Use standard markdown with special markers for redacted content:

```markdown
This report provides assessment of intelligence gathered during Operation Nightfall.
The operation identified [REDACTED:short] individuals and uncovered [REDACTED:medium].
Key findings indicate [REDACTED:long] has been operating in the region.
```

### Redaction Syntax Options

**Option 1: HTML-style tags in Markdown**
```markdown
This subject <span class="redacted">████████</span> was observed at location.
```

**Option 2: Custom Markdown syntax**
```markdown
The agent {{redacted}} contacted {{redacted:block}} on the date {{redacted}}.
```

**Option 3: Special characters**
```markdown
The location ███████ was compromised and agent ████████ extracted.
```

---

## Full Markdown Document Example

```markdown
# OPERATION NIGHTFALL: INTELLIGENCE ASSESSMENT

**Classification:** TOP SECRET  
**Document ID:** TS-2026-FBI-00234  
**Date:** 20 January 2026

---

## ⚠️ WARNING NOTICE

**WARNING:** This document contains information affecting the national security 
of the United States. Unauthorized disclosure is prohibited by law.

---

## EXECUTIVE SUMMARY

This report provides comprehensive assessment of Operation Nightfall conducted 
between {{REDACTED}} and 15 January 2026. The operation successfully identified 
{{REDACTED}} individuals of interest and uncovered evidence of {{REDACTED:long}}.

Key findings indicate that {{REDACTED}} has been operating in the {{REDACTED}} 
region with assistance from {{REDACTED:block}}.

---

## BACKGROUND

Intelligence operations began on {{REDACTED}} following credible reports. 
Initial surveillance revealed contact between:

- Subject {{REDACTED}} (codename: CARDINAL)
- Associate {{REDACTED}} (codename: SPARROW)

### Timeline of Events

| Day | Event | Classification |
|-----|-------|----------------|
| 1 | Surveillance commenced | CONFIDENTIAL |
| 3 | First contact observed | SECRET |
| 7 | Electronic surveillance authorized | {{REDACTED}} |
| 12 | Critical intelligence breakthrough | TOP SECRET |
| 15 | Operation concluded | SECRET |

---

## INCIDENT REPORT

**Incident No:** IR-2026-001  
**Severity:** CRITICAL

On 14 January 2026 at {{REDACTED}} hours, surveillance teams observed 
subject CARDINAL meeting with {{REDACTED:block}} at SAFE HOUSE BRAVO.

> **FULLY REDACTED SECTION**
> 
> {{PARAGRAPH:REDACTED}}

Following the incident, tactical teams successfully {{REDACTED}} without 
civilian casualties. Evidence recovered includes {{REDACTED}} encrypted devices.

---

## INTELLIGENCE ASSESSMENT

| Subject | Designation | Threat Level | Status |
|---------|-------------|--------------|--------|
| {{REDACTED}} | CARDINAL | CRITICAL | DETAINED |
| {{REDACTED}} | SPARROW | HIGH | DETAINED |
| {{REDACTED}} | RAVEN | MEDIUM | AT LARGE |

---

## RECOMMENDATIONS

1. Continue surveillance of location {{REDACTED}} for 90 days
2. Coordinate with {{REDACTED:block}} to monitor connections
3. Deploy resources to locate subject RAVEN
4. Implement enhanced security protocols
5. Maintain classified status pending review

---

**DECLASSIFY ON:** {{REDACTED}} or upon completion of investigation

---

**Document Footer:**
- Prepared by: {{REDACTED}}
- Reviewed by: {{REDACTED}}
- Approved by: {{REDACTED}}
```

---

## Conversion to HTML

### Method 1: Manual HTML conversion with CSS classes

```javascript
// Simple JavaScript converter
function convertMarkdownRedactions(markdown) {
    // Convert {{REDACTED}} to HTML
    markdown = markdown.replace(/\{\{REDACTED\}\}/g, '<span class="redacted">████████</span>');
    markdown = markdown.replace(/\{\{REDACTED:short\}\}/g, '<span class="redacted">████</span>');
    markdown = markdown.replace(/\{\{REDACTED:medium\}\}/g, '<span class="redacted-block">████████████</span>');
    markdown = markdown.replace(/\{\{REDACTED:long\}\}/g, '<span class="redacted-long">████████████████████</span>');
    markdown = markdown.replace(/\{\{PARAGRAPH:REDACTED\}\}/g, '<p class="fully-redacted">████████████████████████████████████████████</p>');
    
    return markdown;
}
```

### Method 2: Using markdown-it library

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="classified-styles.css">
    <script src="https://cdn.jsdelivr.net/npm/markdown-it@13/dist/markdown-it.min.js"></script>
</head>
<body>
    <div id="markdown-content"></div>
    
    <script>
        const md = window.markdownit();
        
        // Your markdown content
        const markdownText = `
## EXECUTIVE SUMMARY
This is a {{REDACTED}} document about {{REDACTED:block}}.
        `;
        
        // Convert and inject
        let html = md.render(markdownText);
        html = convertMarkdownRedactions(html);
        document.getElementById('markdown-content').innerHTML = html;
    </script>
</body>
</html>
```

---

## Advanced: Custom Markdown Renderer

```javascript
class ClassifiedMarkdownRenderer {
    constructor() {
        this.md = window.markdownit();
        this.setupCustomRules();
    }
    
    setupCustomRules() {
        // Add custom inline rule for redactions
        this.md.inline.ruler.before('text', 'redaction', this.parseRedaction.bind(this));
    }
    
    parseRedaction(state, silent) {
        const marker = '{{';
        const pos = state.pos;
        
        if (state.src.slice(pos, pos + 2) !== marker) {
            return false;
        }
        
        const endPos = state.src.indexOf('}}', pos + 2);
        if (endPos === -1) return false;
        
        if (!silent) {
            const content = state.src.slice(pos + 2, endPos);
            const token = state.push('redaction', '', 0);
            token.content = content;
        }
        
        state.pos = endPos + 2;
        return true;
    }
    
    render(markdown) {
        this.md.renderer.rules.redaction = (tokens, idx) => {
            const content = tokens[idx].content;
            const type = content.includes(':') ? content.split(':')[1] : 'default';
            
            const classes = {
                'short': 'redacted',
                'medium': 'redacted-block',
                'long': 'redacted-long',
                'default': 'redacted'
            };
            
            const className = classes[type] || classes.default;
            return `<span class="${className}">████████</span>`;
        };
        
        return this.md.render(markdown);
    }
}

// Usage
const renderer = new ClassifiedMarkdownRenderer();
const html = renderer.render(markdownContent);
```

---

## CSS Integration

All markdown-rendered content should be wrapped in a container with proper styling:

```html
<div class="classification-banner top-banner">
    TOP SECRET // SPECIAL ACCESS REQUIRED
</div>

<div class="document-container">
    <div id="markdown-rendered-content">
        <!-- Markdown content goes here -->
    </div>
</div>

<div class="classification-banner bottom-banner">
    TOP SECRET // SPECIAL ACCESS REQUIRED
</div>
```

---

## Ready-to-Use Templates

### Template 1: Mission Report
- Executive Summary
- Mission Objectives  
- Operational Details
- Outcome Assessment

### Template 2: Intelligence Briefing
- Threat Assessment
- Source Analysis
- Recommended Actions
- Distribution List

### Template 3: Incident Report
- Incident Summary
- Timeline
- Response Actions
- Lessons Learned

---

**Note:** This is for educational/creative purposes only. All content is fictional.
