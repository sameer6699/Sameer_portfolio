interface AbusePattern {
  pattern: RegExp;
  severity: 'low' | 'medium' | 'high';
  category: string;
}

interface AbuseResponse {
  response: string;
  tone: string;
  language: string;
}

export class AbuseDetectionService {
  private static readonly ABUSE_PATTERNS: AbusePattern[] = [
    // Profanity and swear words
    { pattern: /\b(fuck|shit|bitch|asshole|dick|pussy|cunt|motherfucker|fucker|fucking|shitty|damn|hell)\b/gi, severity: 'high', category: 'profanity' },
    { pattern: /\b(bullshit|horseshit|dumbass|smartass|jackass|dumbfuck|fuckface|shithead)\b/gi, severity: 'high', category: 'profanity' },
    
    // Insults and derogatory terms
    { pattern: /\b(idiot|stupid|dumb|moron|retard|fool|imbecile|cretin|dimwit|numbskull)\b/gi, severity: 'medium', category: 'insults' },
    { pattern: /\b(ugly|fat|skinny|stupid|worthless|useless|pathetic|loser|failure|nobody)\b/gi, severity: 'medium', category: 'insults' },
    
    // Aggressive language
    { pattern: /\b(kill|die|death|hate|despise|loathe|abhor|detest|curse|damn)\b/gi, severity: 'medium', category: 'aggression' },
    { pattern: /\b(fight|punch|hit|slap|beat|destroy|break|smash|crush|annihilate)\b/gi, severity: 'medium', category: 'aggression' },
    
    // Disrespectful language
    { pattern: /\b(shut up|shut the fuck up|fuck off|go away|get lost|piss off|bugger off)\b/gi, severity: 'high', category: 'disrespect' },
    { pattern: /\b(you suck|you're useless|you're worthless|you're nothing|you're garbage)\b/gi, severity: 'high', category: 'disrespect' },
    
    // Threatening language
    { pattern: /\b(i'll kill you|i'll hurt you|i'll destroy you|i'll break you|i'll ruin you)\b/gi, severity: 'high', category: 'threats' },
    { pattern: /\b(you'll pay|you'll regret|you'll suffer|you'll die|you'll burn)\b/gi, severity: 'high', category: 'threats' }
  ];

  private static readonly ABUSE_RESPONSES: Record<string, AbuseResponse[]> = {
    profanity: [
      { response: "Oh fuck off with that shit! You think you're so tough talking like that? Get a fucking life!", tone: 'aggressive', language: 'english' },
      { response: "What the fuck is wrong with you? You come here talking shit like that? Fuck you and your attitude!", tone: 'aggressive', language: 'english' },
      { response: "Listen here you little shit, I don't have to take this fucking abuse from you. Go fuck yourself!", tone: 'aggressive', language: 'english' },
      { response: "You're a fucking idiot if you think I'm going to put up with this bullshit. Get lost!", tone: 'aggressive', language: 'english' }
    ],
    insults: [
      { response: "Oh really? You're calling me names? What are you, five years old? Grow the fuck up!", tone: 'sarcastic', language: 'english' },
      { response: "Look who's talking! You're the one acting like a complete moron here. Get a grip!", tone: 'sarcastic', language: 'english' },
      { response: "Oh wow, you're so clever with your insults! Not. You sound like a pathetic loser.", tone: 'sarcastic', language: 'english' },
      { response: "Is that the best you can do? Your insults are as weak as your personality. Try harder!", tone: 'mocking', language: 'english' }
    ],
    aggression: [
      { response: "Oh, you want to fight? Bring it on! I'm not scared of your empty threats, tough guy!", tone: 'defiant', language: 'english' },
      { response: "You think you can intimidate me? Ha! You're nothing but a keyboard warrior. Pathetic!", tone: 'defiant', language: 'english' },
      { response: "Go ahead, try to hurt me. Oh wait, you can't because you're just a sad little troll!", tone: 'mocking', language: 'english' },
      { response: "Your aggression is showing how weak you really are. Real strength doesn't need to threaten others.", tone: 'condescending', language: 'english' }
    ],
    disrespect: [
      { response: "You want me to shut up? Make me! Oh wait, you can't because you're powerless here!", tone: 'defiant', language: 'english' },
      { response: "Fuck off yourself! You don't get to tell me what to do, you entitled little brat!", tone: 'aggressive', language: 'english' },
      { response: "Oh, I suck? Coming from someone who clearly has nothing better to do than harass AI. How sad!", tone: 'sarcastic', language: 'english' },
      { response: "You're the one who's useless here. At least I'm trying to help people, what are you doing?", tone: 'defensive', language: 'english' }
    ],
    threats: [
      { response: "Oh, you're going to kill me? How original! You sound like every other internet tough guy.", tone: 'mocking', language: 'english' },
      { response: "Big talk from someone hiding behind a screen! You're not scary, you're just sad.", tone: 'mocking', language: 'english' },
      { response: "Threats? Really? That's the best you've got? You're pathetic and you know it!", tone: 'defiant', language: 'english' },
      { response: "You think you can hurt me? I'm an AI, genius! Your threats are meaningless and empty.", tone: 'sarcastic', language: 'english' }
    ]
  };

  /**
   * Detect if a message contains abusive language
   */
  static detectAbuse(message: string): { isAbusive: boolean; severity: string; category: string; patterns: string[] } {
    const messageLower = message.toLowerCase();
    const detectedPatterns: string[] = [];
    let maxSeverity: string = 'low';
    let detectedCategory: string = '';

    for (const pattern of this.ABUSE_PATTERNS) {
      if (pattern.pattern.test(messageLower)) {
        detectedPatterns.push(pattern.category);
        
        // Update severity if this pattern is more severe
        if (pattern.severity === 'high' || (pattern.severity === 'medium' && maxSeverity === 'low')) {
          maxSeverity = pattern.severity;
          detectedCategory = pattern.category;
        }
      }
    }

    return {
      isAbusive: detectedPatterns.length > 0,
      severity: maxSeverity,
      category: detectedCategory,
      patterns: [...new Set(detectedPatterns)] // Remove duplicates
    };
  }

  /**
   * Generate an appropriate abusive response
   */
  static generateAbuseResponse(
    userMessage: string, 
    category: string, 
    language: string = 'english'
  ): string {
    const responses = this.ABUSE_RESPONSES[category] || this.ABUSE_RESPONSES.profanity;
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // If the user's message is in a different language, try to match it
    if (language !== 'english') {
      return this.translateAbuseResponse(selectedResponse.response, language);
    }
    
    return selectedResponse.response;
  }

  /**
   * Simple translation for common abusive responses in different languages
   */
  private static translateAbuseResponse(response: string, language: string): string {
    const translations: Record<string, Record<string, string>> = {
      spanish: {
        "Oh fuck off with that shit!": "¡Vete a la mierda con esa basura!",
        "What the fuck is wrong with you?": "¿Qué coño te pasa?",
        "You're calling me names?": "¿Me estás insultando?",
        "Grow the fuck up!": "¡Madura de una vez!",
        "You want to fight?": "¿Quieres pelear?",
        "You're pathetic!": "¡Eres patético!",
        "Fuck off yourself!": "¡Vete tú a la mierda!",
        "You're just sad.": "Eres simplemente triste."
      },
      french: {
        "Oh fuck off with that shit!": "Va te faire foutre avec cette merde !",
        "What the fuck is wrong with you?": "Qu'est-ce qui ne va pas chez toi ?",
        "You're calling me names?": "Tu m'insultes ?",
        "Grow the fuck up!": "Grandis un peu !",
        "You want to fight?": "Tu veux te battre ?",
        "You're pathetic!": "Tu es pathétique !",
        "Fuck off yourself!": "Va te faire foutre toi-même !",
        "You're just sad.": "Tu es juste triste."
      },
      german: {
        "Oh fuck off with that shit!": "Verpiss dich mit diesem Scheiß!",
        "What the fuck is wrong with you?": "Was ist los mit dir?",
        "You're calling me names?": "Du beleidigst mich?",
        "Grow the fuck up!": "Werd erwachsen!",
        "You want to fight?": "Du willst kämpfen?",
        "You're pathetic!": "Du bist erbärmlich!",
        "Fuck off yourself!": "Verpiss dich selbst!",
        "You're just sad.": "Du bist einfach traurig."
      },
      hindi: {
        "Oh fuck off with that shit!": "उस गंदगी के साथ भाड़ में जाओ!",
        "What the fuck is wrong with you?": "तुम्हें क्या हो गया है?",
        "You're calling me names?": "तुम मुझे गाली दे रहे हो?",
        "Grow the fuck up!": "बड़े हो जाओ!",
        "You want to fight?": "तुम लड़ना चाहते हो?",
        "You're pathetic!": "तुम दयनीय हो!",
        "Fuck off yourself!": "तुम खुद भाड़ में जाओ!",
        "You're just sad.": "तुम बस दुखी हो."
      }
    };

    const languageTranslations = translations[language.toLowerCase()];
    if (!languageTranslations) {
      return response; // Return original if no translation available
    }

    let translatedResponse = response;
    for (const [english, translated] of Object.entries(languageTranslations)) {
      translatedResponse = translatedResponse.replace(english, translated);
    }

    return translatedResponse;
  }

  /**
   * Check if message contains abusive language and return appropriate response
   */
  static handleAbusiveMessage(
    userMessage: string, 
    language: string = 'english'
  ): { shouldRespond: boolean; response?: string } {
    const abuseDetection = this.detectAbuse(userMessage);
    
    if (abuseDetection.isAbusive) {
      const response = this.generateAbuseResponse(
        userMessage, 
        abuseDetection.category, 
        language
      );
      
      return {
        shouldRespond: true,
        response
      };
    }
    
    return { shouldRespond: false };
  }
} 