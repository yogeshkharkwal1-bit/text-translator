// server/services/fakeEmailService.js
// ML-based Fake Email Detector - Fixed Version

async function detectFakeEmail(email) {
  const analysis = {
    score: 0,
    maxScore: 100,
    indicators: [],
    verdict: 'unknown',
    confidence: 0
  };
  
  const { headers, body, subject, from } = parseEmail(email);
  
  // 1. Header Analysis (30 points)
  const headerScore = analyzeHeaders(headers, from);
  analysis.score += headerScore.score;
  analysis.indicators.push(...headerScore.indicators);
  
  // 2. Content Analysis (35 points) - INCREASED
  const contentScore = analyzeContent(body, subject);
  analysis.score += contentScore.score;
  analysis.indicators.push(...contentScore.indicators);
  
  // 3. Link Analysis (20 points)
  const linkScore = analyzeLinks(body);
  analysis.score += linkScore.score;
  analysis.indicators.push(...linkScore.indicators);
  
  // 4. Language Pattern Analysis (15 points)
  const langScore = analyzeLanguage(body);
  analysis.score += langScore.score;
  analysis.indicators.push(...langScore.indicators);
  
  // Determine verdict - LOWERED THRESHOLD
  if (analysis.score >= 50) {  // Was 70, now 50
    analysis.verdict = 'fake';
    analysis.confidence = Math.min(analysis.score + 20, 98);
  } else if (analysis.score >= 25) {  // Was 40, now 25
    analysis.verdict = 'suspicious';
    analysis.confidence = analysis.score + 20;
  } else {
    analysis.verdict = 'real';
    analysis.confidence = 100 - analysis.score;
  }
  
  return {
    verdict: analysis.verdict,
    confidence: analysis.confidence,
    riskScore: analysis.score,
    indicators: analysis.indicators,
    details: {
      headerAnalysis: headerScore.details,
      contentAnalysis: contentScore.details,
      linkAnalysis: linkScore.details,
      languageAnalysis: langScore.details
    }
  };
}

function parseEmail(email) {
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
  
  return { headers, body, subject, from };
}

function analyzeHeaders(headers, from) {
  let score = 0;
  const indicators = [];
  const details = {};
  
  if (!from) {
    score += 10;
    indicators.push({ type: 'warning', message: 'Missing or empty From header' });
    details.missingFrom = true;
  }
  
  const suspiciousDomains = ['tempmail.com', 'guerrillamail.com', 'throwaway.email', 'mailinator.com', 'fakeinbox.com', 'lottery-winner.com', 'amaz0n'];
  if (suspiciousDomains.some(domain => from.toLowerCase().includes(domain))) {
    score += 20;
    indicators.push({ type: 'danger', message: 'Suspicious email domain detected' });
    details.suspiciousDomain = true;
  }
  
  // Check for lookalike domains (e.g., paypa1, amaz0n)
  const lookalikePatterns = [
    { pattern: /paypa1/i, brand: 'PayPal' },
    { pattern: /amaz0n/i, brand: 'Amazon' },
    { pattern: /g00gle/i, brand: 'Google' },
    { pattern: /faceb00k/i, brand: 'Facebook' },
    { pattern: /micr0soft/i, brand: 'Microsoft' },
    { pattern: /bankofamerica-secure/i, brand: 'Bank of America' }
  ];
  
  for (const { pattern, brand } of lookalikePatterns) {
    if (pattern.test(from)) {
      score += 25;
      indicators.push({ type: 'danger', message: `Lookalike domain detected: pretending to be ${brand}` });
      details.lookalikeDomain = brand;
    }
  }
  
  if (!headers['subject']) {
    score += 5;
    indicators.push({ type: 'warning', message: 'Missing Subject header' });
    details.missingSubject = true;
  }
  
  return { score, indicators, details };
}

function analyzeContent(body, subject) {
  let score = 0;
  const indicators = [];
  const details = {};
  
  const lowerBody = body.toLowerCase();
  const lowerSubject = subject.toLowerCase();
  
  // Urgency language
  const urgencyWords = ['urgent', 'immediate', 'act now', 'limited time', 'expires', 'act immediately', 'now only', 'final warning', 'warning'];
  const urgencyCount = urgencyWords.filter(word => lowerBody.includes(word) || lowerSubject.includes(word)).length;
  
  if (urgencyCount >= 2) {
    score += 15;
    indicators.push({ type: 'warning', message: 'High urgency language detected (pressure tactic)' });
    details.urgencyLanguage = true;
  }
  
  // Request for sensitive info
  const sensitiveRequests = ['password', 'credit card', 'ssn', 'social security', 'bank account', 'verify your account', 'confirm your identity', 'cvv', 'debit card', 'mother\'s maiden name'];
  const sensitiveCount = sensitiveRequests.filter(word => lowerBody.includes(word)).length;
  
  if (sensitiveCount >= 2) {
    score += 20;
    indicators.push({ type: 'danger', message: 'Requests for sensitive information detected' });
    details.sensitiveRequests = true;
  }
  
  // Too good to be true offers - INCREASED SCORE
  const tooGood = ['you won', 'congratulations', 'lottery', 'million dollars', 'free money', 'claim your prize', 'winner', 'prize', 'selected as the winner', 'email lottery'];
  const tooGoodCount = tooGood.filter(word => lowerBody.includes(word)).length;
  
  if (tooGoodCount >= 1) {
    score += 25;  // Was 15, now 25
    indicators.push({ type: 'danger', message: 'Too-good-to-be-true offer detected' });
    details.tooGoodOffer = true;
  }
  
  // Generic greeting
  const genericGreetings = ['dear customer', 'dear user', 'dear valued', 'greetings', 'dear sir/madam'];
  if (genericGreetings.some(word => lowerBody.includes(word))) {
    score += 10;
    indicators.push({ type: 'info', message: 'Generic greeting detected' });
    details.genericGreeting = true;
  }
  
  // Fee request
  const feeRequests = ['processing fee', 'western union', 'money gram', 'send fee', 'payment fee', 'transfer fee'];
  if (feeRequests.some(word => lowerBody.includes(word))) {
    score += 20;
    indicators.push({ type: 'danger', message: 'Request for payment/fee detected' });
    details.feeRequest = true;
  }
  
  return { score, indicators, details };
}

function analyzeLinks(body) {
  let score = 0;
  const indicators = [];
  const details = {};
  
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  const urls = body.match(urlRegex) || [];
  
  details.linkCount = urls.length;
  
  if (urls.length === 0) {
    return { score, indicators, details };
  }
  
  // IP-based URLs
  const ipUrls = urls.filter(url => /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url));
  if (ipUrls.length > 0) {
    score += 15;
    indicators.push({ type: 'warning', message: 'IP address based URLs detected' });
    details.ipBasedUrls = true;
  }
  
  // URL shorteners
  const shorteners = ['bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd'];
  const shortenedUrls = urls.filter(url => shorteners.some(s => url.includes(s)));
  
  if (shortenedUrls.length > 0) {
    score += 10;
    indicators.push({ type: 'info', message: 'URL shortener detected' });
    details.shortenedUrls = true;
  }
  
  // HTTP (not HTTPS)
  const httpUrls = urls.filter(url => url.startsWith('http://'));
  if (httpUrls.length > 0) {
    score += 10;
    indicators.push({ type: 'warning', message: 'Non-secure HTTP links detected' });
    details.insecureUrls = true;
  }
  
  return { score, indicators, details };
}

function analyzeLanguage(body) {
  let score = 0;
  const indicators = [];
  const details = {};
  
  const lowerBody = body.toLowerCase();
  
  // Phishing phrases
  const phishingPhrases = [
    'verify your account immediately',
    'suspended',
    'unusual activity',
    'click here to update',
    'confirm your identity',
    'unauthorized access',
    'security alert',
    'update your information'
  ];
  
  const phishingCount = phishingPhrases.filter(phrase => lowerBody.includes(phrase)).length;
  
  if (phishingCount >= 2) {
    score += 15;
    indicators.push({ type: 'danger', message: 'Multiple phishing indicator phrases detected' });
    details.phishingPhrases = true;
  }
  
  // Brand spoofing
  const spoofingWords = ['paypal', 'apple', 'amazon', 'netflix', 'google', 'microsoft', 'bank'];
  const spoofingCount = spoofingWords.filter(word => lowerBody.includes(word)).length;
  
  if (spoofingCount >= 2) {
    score += 10;
    indicators.push({ type: 'warning', message: 'Brand impersonation detected' });
    details.brandSpoofing = true;
  }
  
  // Threat language
  const threatWords = ['suspend', 'terminate', 'close your account', 'legal action', 'penalty', 'frozen', 'permanent'];
  const threatCount = threatWords.filter(word => lowerBody.includes(word)).length;
  
  if (threatCount >= 1) {
    score += 15;
    indicators.push({ type: 'danger', message: 'Threatening language detected' });
    details.threatLanguage = true;
  }
  
  return { score, indicators, details };
}

module.exports = { detectFakeEmail };
