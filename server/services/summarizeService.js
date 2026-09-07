// server/services/summarizeService.js
// Extractive summarization - fast, no model download needed

function summarizeText(text, length = 'medium') {
  const lengthMap = {
    short: { sentences: 1, words: 30 },
    medium: { sentences: 2, words: 60 },
    detailed: { sentences: 4, words: 120 }
  };
  
  const { sentences: maxSentences, words: maxWords } = lengthMap[length] || lengthMap.medium;
  
  // Split into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  if (sentences.length <= maxSentences) {
    return {
      summary: text.trim(),
      originalLength: text.length,
      summaryLength: text.length,
      reduction: 0
    };
  }
  
  // Score sentences by importance
  const wordFreq = {};
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Common stop words to ignore
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'and', 'but', 'if', 'or', 'because', 'until', 'while', 'this', 'that', 'these', 'those', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'whose', 'this', 'that', 'these', 'those', 'am', 'it', 's', 't', 'd', 'll', 'm', 're', 've', 'y', 'ma', 'didn', 'doesn', 'don', 'hadn', 'hasn', 'haven', 'isn', 'let', 'mustn', 'needn', 'shan', 'shouldn', 'wasn', 'weren', 'won', 'wouldn']);
  
  // Calculate word frequencies
  for (const word of words) {
    if (!stopWords.has(word) && word.length > 2) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  }
  
  // Score each sentence
  const scoredSentences = sentences.map((sentence, index) => {
    const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
    let score = 0;
    
    for (const word of sentenceWords) {
      if (wordFreq[word]) {
        score += wordFreq[word];
      }
    }
    
    // Normalize by sentence length
    score = score / Math.max(sentenceWords.length, 1);
    
    // Boost first and last sentences
    if (index === 0) score *= 1.5;
    if (index === sentences.length - 1) score *= 1.2;
    
    return { sentence: sentence.trim(), score, index };
  });
  
  // Sort by score and pick top sentences
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .sort((a, b) => a.index - b.index); // Restore original order
  
  let summary = topSentences.map(s => s.sentence).join(' ');
  
  // Trim to max words if needed
  const summaryWords = summary.split(' ');
  if (summaryWords.length > maxWords) {
    summary = summaryWords.slice(0, maxWords).join(' ') + '...';
  }
  
  return {
    summary,
    originalLength: text.length,
    summaryLength: summary.length,
    reduction: Math.round((1 - summary.length / text.length) * 100)
  };
}

module.exports = { summarizeText };
