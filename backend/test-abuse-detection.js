const { AbuseDetectionService } = require('./src/services/abuseDetectionService');

// Test cases for abuse detection
const testCases = [
  {
    message: "Hello, how are you?",
    expected: false,
    description: "Normal greeting"
  },
  {
    message: "You're a fucking idiot!",
    expected: true,
    description: "Profanity and insult"
  },
  {
    message: "Fuck off and die!",
    expected: true,
    description: "Aggressive profanity"
  },
  {
    message: "I'll kill you!",
    expected: true,
    description: "Threat"
  },
  {
    message: "You suck!",
    expected: true,
    description: "Disrespect"
  },
  {
    message: "Can you help me with React?",
    expected: false,
    description: "Normal technical question"
  },
  {
    message: "What's your problem, you stupid bot?",
    expected: true,
    description: "Insult with profanity"
  }
];

console.log('Testing Abuse Detection Service...\n');

testCases.forEach((testCase, index) => {
  const result = AbuseDetectionService.detectAbuse(testCase.message);
  const passed = result.isAbusive === testCase.expected;
  
  console.log(`Test ${index + 1}: ${testCase.description}`);
  console.log(`Message: "${testCase.message}"`);
  console.log(`Expected: ${testCase.expected}, Got: ${result.isAbusive}`);
  console.log(`Category: ${result.category}, Severity: ${result.severity}`);
  
  if (result.isAbusive) {
    const abuseResponse = AbuseDetectionService.generateAbuseResponse(
      testCase.message, 
      result.category, 
      'english'
    );
    console.log(`Response: "${abuseResponse}"`);
  }
  
  console.log(`Status: ${passed ? '✅ PASS' : '❌ FAIL'}\n`);
});

// Test different languages
console.log('Testing Language Support...\n');

const languageTests = [
  { message: "Fuck you!", language: "spanish" },
  { message: "You're stupid!", language: "french" },
  { message: "Go away!", language: "german" },
  { message: "You're useless!", language: "hindi" }
];

languageTests.forEach((test, index) => {
  const result = AbuseDetectionService.detectAbuse(test.message);
  if (result.isAbusive) {
    const response = AbuseDetectionService.generateAbuseResponse(
      test.message, 
      result.category, 
      test.language
    );
    console.log(`Test ${index + 1}: ${test.language.toUpperCase()}`);
    console.log(`Message: "${test.message}"`);
    console.log(`Response: "${response}"\n`);
  }
});

console.log('Abuse detection testing completed!'); 