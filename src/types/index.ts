// ============================================================================
// CORE INTERFACES
// ============================================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'freelancing' | 'academic' | 'openSource';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools';
}

export interface AppointmentSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface AppointmentForm {
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
  type: 'consultation' | 'quick-chat' | 'project-discussion';
}

export interface Message {
  sender: 'user' | 'sam';
  text: string;
  isFallback?: boolean;
  fallbackMessage?: string;
  isAbuse?: boolean;
  abuseMessage?: string;
}

// ============================================================================
// API & COMMUNICATION TYPES
// ============================================================================

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatContext {
  systemMessage?: string;
  maxHistoryLength?: number;
  language?: string;
  abuseDetected?: boolean;
  fallbackMode?: boolean;
}

export interface ChatRequest {
  messages: ChatMessage[];
  sessionId?: string;
  context?: ChatContext;
}

export interface ChatResponse {
  response: string;
  sessionId?: string;
  context?: ChatContext;
  isFallback?: boolean;
  fallbackMessage?: string;
  updatedContext?: ChatContext;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  success: boolean;
}

// ============================================================================
// SECURITY & STORAGE TYPES
// ============================================================================

export interface StorageData<T = unknown> {
  value: T;
  timestamp: number;
  expiresAt?: number;
}

export interface CSRFConfig {
  tokenLength?: number;
  expiresIn?: number;
  headerName?: string;
  paramName?: string;
}

export interface CSRFToken {
  token: string;
  expiresAt: number;
}

export interface APIConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface APIError {
  message: string;
  status: number;
  statusText: string;
  data?: unknown;
}

// ============================================================================
// SECURITY CONFIGURATION TYPES
// ============================================================================

export interface SecurityConfig {
  csrf: {
    tokenLength: number;
    expiresIn: number;
    headerName: string;
    paramName: string;
  };
  storage: {
    encryptionKey: string;
    prefix: string;
    defaultExpiration: number;
  };
  api: {
    timeout: number;
    retries: number;
    retryDelay: number;
    maxPayloadSize: number;
  };
  csp: {
    defaultSrc: string[];
    scriptSrc: string[];
    styleSrc: string[];
    imgSrc: string[];
    connectSrc: string[];
    fontSrc: string[];
    objectSrc: string[];
    mediaSrc: string[];
    frameSrc: string[];
  };
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface NavbarProps {
  className?: string;
}

export interface HeroProps {
  onBookAppointment: () => void;
}

export interface AboutProps {
  className?: string;
}

export interface SkillsProps {
  className?: string;
}

export interface PortfolioProps {
  className?: string;
}

export interface ExperienceProps {
  className?: string;
}

export interface AchievementsProps {
  className?: string;
}

export interface ContactProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface BookAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SocialHandlesProps {
  className?: string;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export interface CounterProps {
  end: number;
  duration?: number;
  className?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Language = 'english' | 'hindi' | 'spanish' | 'french' | 'german';

export type Theme = 'light' | 'dark';

export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'hackerrank' | 'hackerearth' | 'leetcode';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
  icon: string;
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'location';
  value: string;
  href?: string;
  icon: string;
  label: string;
}

// ============================================================================
// ERROR & VALIDATION TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormErrors {
  [key: string]: ValidationError;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: ValidationError[];
}

// ============================================================================
// ENVIRONMENT & CONFIG TYPES
// ============================================================================

export interface EnvironmentConfig {
  VITE_BACKEND_URL?: string;
  NODE_ENV: 'development' | 'production' | 'test';
  DEV: boolean;
  PROD: boolean;
}

export interface BuildConfig {
  version: string;
  buildTime: string;
  environment: EnvironmentConfig;
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface ScrollAnimationHook {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
}

export interface ThemeHook {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export interface CSRFHook {
  token: string | null;
  refreshToken: () => string;
  headerName: string;
  paramName: string;
}

// ============================================================================
// EVENT TYPES
// ============================================================================

export interface FormSubmitEvent {
  preventDefault: () => void;
  target: HTMLFormElement;
}

export interface InputChangeEvent {
  target: HTMLInputElement | HTMLTextAreaElement;
  currentTarget: HTMLInputElement | HTMLTextAreaElement;
}

export interface ButtonClickEvent {
  preventDefault: () => void;
  currentTarget: HTMLButtonElement;
}

// ============================================================================
// ANIMATION & TRANSITION TYPES
// ============================================================================

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  repeat?: number;
  repeatDelay?: number;
}

export interface TransitionConfig {
  enter: AnimationConfig;
  exit: AnimationConfig;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
}

// ============================================================================
// RESPONSIVE & BREAKPOINT TYPES
// ============================================================================

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// ============================================================================
// BACKEND SPECIFIC TYPES (for frontend-backend communication)
// ============================================================================

export interface OllamaModel {
  name: string;
  size: number;
  modified_at: string;
  digest: string;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export interface NgrokTunnel {
  name: string;
  uri: string;
  public_url: string;
  proto: string;
  config: {
    addr: string;
    inspect: boolean;
  };
}

export interface NgrokStatus {
  status: 'running' | 'stopped' | 'error';
  tunnels: NgrokTunnel[];
  timestamp: string;
}

// ============================================================================
// TYPE GUARDS & UTILITIES
// ============================================================================

export const isMessage = (obj: unknown): obj is Message => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'sender' in obj &&
    'text' in obj &&
    (obj.sender === 'user' || obj.sender === 'sam') &&
    typeof obj.text === 'string'
  );
};

export const isChatMessage = (obj: unknown): obj is ChatMessage => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'role' in obj &&
    'content' in obj &&
    (obj.role === 'user' || obj.role === 'assistant' || obj.role === 'system') &&
    typeof obj.content === 'string'
  );
};

export const isAPIError = (obj: unknown): obj is APIError => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    'status' in obj &&
    'statusText' in obj &&
    typeof obj.message === 'string' &&
    typeof obj.status === 'number' &&
    typeof obj.statusText === 'string'
  );
};

export const isValidationError = (obj: unknown): obj is ValidationError => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'field' in obj &&
    'message' in obj &&
    typeof obj.field === 'string' &&
    typeof obj.message === 'string'
  );
};