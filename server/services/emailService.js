// server/services/emailService.js
// Fast extractive email analysis

function summarizeEmail(email) {
  const lines = email.split('\n');
  const headers = {};
  let body = '';
  let subject = '';
  let from = '';
  
  const emptyLineIndex = lines.findIndex(line => line.trim() === '');
  
  if (emptyLineIndex !== -1) {
    const headerLines = lines.slice(0, emptyLineIndex);
    body = lines.slice(emptyLineIndex + 1).join('\n');
    
    for (const line of headerLines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.substring(0, colonIndex).trim().toLowerCase();
        const value = line.substring(colonIndex + 1).trim();
        headers[key] = value;
      }
    }
    
    subject = headers['subject'] || '';
    from = headers['from'] || '';
  } else {
    body = email;
  }
  
  // Clean body - normalize whitespace but preserve line breaks for action items
  const cleanBody = body.replace(/\s+/g, ' ').trim();
  
  // Summarize body using extractive approach
  const sentences = cleanBody.match(/[^.!?]+[.!?]+/g) || [cleanBody];
  const summary = sentences.slice(0, 2).map(s => s.trim()).join(' ');
  
  // Extract action items from original body (preserve line breaks)
  const actionItems = extractActionItems(body);
  
  // Extract key points
  const keyPoints = extractKeyPoints(summary);
  
  return {
    subject: subject || 'No subject detected',
    from: from || 'Unknown sender',
    summary,
    actionItems,
    keyPoints,
    priority: calculatePriority(body, subject),
    sentiment: analyzeSentiment(body),
    wordCount: cleanBody.length
  };
}

function extractActionItems(text) {
  const actionKeywords = ['please', 'need to', 'must', 'should', 'deadline', 'urgent', 'asap', 'action required', 'reply', 'confirm', 'send', 'submit', 'review', 'approve', 'complete', 'finish'];
  const lines = text.split('\n');
  const actions = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    const lower = trimmed.toLowerCase();
    
    // Skip empty lines and very short lines
    if (trimmed.length < 10 || trimmed.length > 200) continue;
    
    // Remove bullet points and numbers
    const cleanLine = trimmed.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '');
    if (cleanLine.length < 10) continue;
    
    // Check for action keywords
    for (const keyword of actionKeywords) {
      if (lower.includes(keyword)) {
        actions.push(cleanLine);
        break;
      }
    }
  }
  
  return actions.slice(0, 5);
}

function extractKeyPoints(summary) {
  const sentences = summary.split(/[.!?]+/);
  return sentences
    .map(s => s.trim())
    .filter(s => s.length > 15 && s.length < 200)
    .slice(0, 5);
}

function calculatePriority(body, subject) {
  const urgentKeywords = ['urgent', 'asap', 'immediately', 'deadline', 'emergency', 'critical', 'important', 'action required'];
  const text = (subject + ' ' + body).toLowerCase();
  
  let score = 0;
  for (const keyword of urgentKeywords) {
    if (text.includes(keyword)) score += 2;
  }
  
  if (score >= 4) return 'High';
  if (score >= 2) return 'Medium';
  return 'Low';
}

function analyzeSentiment(text) {
  const positive = ['thank', 'great', 'excellent', 'good', 'happy', 'pleased', 'appreciate', 'love', 'best', 'successfully', 'completed'];
  const negative = ['bad', 'terrible', 'angry', 'disappointed', 'frustrated', 'issue', 'problem', 'complaint', 'fail', 'delayed', 'critical'];
  
  const lower = text.toLowerCase();
  let posScore = 0;
  let negScore = 0;
  
  for (const word of positive) {
    if (lower.includes(word)) posScore++;
  }
  for (const word of negative) {
    if (lower.includes(word)) negScore++;
  }
  
  if (posScore > negScore) return 'Positive';
  if (negScore > posScore) return 'Negative';
  return 'Neutral';
}

module.exports = { summarizeEmail };
