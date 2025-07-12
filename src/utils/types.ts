/**
 * TypeScript Utilities
 * Common type operations and helpers for better type safety
 */

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if value is a string
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Type guard to check if value is a number
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Type guard to check if value is a boolean
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

/**
 * Type guard to check if value is an object
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Type guard to check if value is an array
 */
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

/**
 * Type guard to check if value is null or undefined
 */
export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

/**
 * Type guard to check if value is a function
 */
export const isFunction = (value: unknown): value is Function => {
  return typeof value === 'function';
};

/**
 * Type guard to check if value is a valid email
 */
export const isEmail = (value: unknown): value is string => {
  if (!isString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Type guard to check if value is a valid URL
 */
export const isURL = (value: unknown): value is string => {
  if (!isString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

// ============================================================================
// TYPE UTILITIES
// ============================================================================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Make all properties readonly recursively
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Pick properties from type and make them required
 */
export type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>>;

/**
 * Pick properties from type and make them optional
 */
export type OptionalPick<T, K extends keyof T> = Partial<Pick<T, K>>;

/**
 * Omit properties from type and make remaining required
 */
export type RequiredOmit<T, K extends keyof T> = Required<Omit<T, K>>;

/**
 * Extract the type of a function's return value
 */
export type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

/**
 * Extract the type of a function's parameters
 */
export type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;

/**
 * Extract the type of a promise's resolved value
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate that all required properties are present
 */
export const validateRequired = <T extends Record<string, unknown>>(
  obj: T,
  requiredKeys: (keyof T)[]
): boolean => {
  return requiredKeys.every(key => obj[key] !== undefined && obj[key] !== null);
};

/**
 * Validate object structure against a schema
 */
export const validateSchema = <T>(
  obj: unknown,
  schema: Record<keyof T, (value: unknown) => boolean>
): obj is T => {
  if (!isObject(obj)) return false;
  
  return Object.entries(schema).every(([key, validator]) => {
    return (validator as (value: unknown) => boolean)(obj[key]);
  });
};

/**
 * Safe property access with type checking
 */
export const safeGet = <T, K extends keyof T>(obj: T, key: K): T[K] | undefined => {
  return obj[key];
};

/**
 * Safe property access with default value
 */
export const safeGetWithDefault = <T, K extends keyof T>(
  obj: T,
  key: K,
  defaultValue: T[K]
): T[K] => {
  return obj[key] ?? defaultValue;
};

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

/**
 * Type-safe array filter
 */
export const filterArray = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] => {
  return array.filter(predicate);
};

/**
 * Type-safe array map
 */
export const mapArray = <T, U>(
  array: T[],
  mapper: (value: T, index: number, array: T[]) => U
): U[] => {
  return array.map(mapper);
};

/**
 * Type-safe array reduce
 */
export const reduceArray = <T, U>(
  array: T[],
  reducer: (accumulator: U, value: T, index: number, array: T[]) => U,
  initialValue: U
): U => {
  return array.reduce(reducer, initialValue);
};

/**
 * Find first element that matches predicate
 */
export const findFirst = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T | undefined => {
  return array.find(predicate);
};

/**
 * Find last element that matches predicate
 */
export const findLast = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T | undefined => {
  return array.slice().reverse().find(predicate);
};

// ============================================================================
// OBJECT UTILITIES
// ============================================================================

/**
 * Type-safe object keys
 */
export const objectKeys = <T extends Record<string, unknown>>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

/**
 * Type-safe object values
 */
export const objectValues = <T extends Record<string, unknown>>(obj: T): T[keyof T][] => {
  return Object.values(obj) as T[keyof T][];
};

/**
 * Type-safe object entries
 */
export const objectEntries = <T extends Record<string, unknown>>(
  obj: T
): [keyof T, T[keyof T]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
};

/**
 * Create object with only specified keys
 */
export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Create object without specified keys
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result as Omit<T, K>;
};

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

/**
 * Result type for operations that can fail
 */
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Create a successful result
 */
export const success = <T>(data: T): Result<T> => ({
  success: true,
  data
});

/**
 * Create an error result
 */
export const failure = <T, E = Error>(error: E): Result<T, E> => ({
  success: false,
  error
});

/**
 * Safe try-catch wrapper
 */
export const safeTry = <T>(fn: () => T): Result<T> => {
  try {
    return success(fn());
  } catch (error) {
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
};

/**
 * Safe async try-catch wrapper
 */
export const safeTryAsync = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    return success(await fn());
  } catch (error) {
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
};

// ============================================================================
// CONDITIONAL TYPES
// ============================================================================

/**
 * Conditional type that checks if T is a union type
 */
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

/**
 * Convert union type to intersection type
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Extract literal types from a union
 */
export type ExtractLiteral<T> = T extends string | number | boolean ? T : never;

/**
 * Create a type that excludes null and undefined
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

// ============================================================================
// REACT SPECIFIC UTILITIES
// ============================================================================

/**
 * Type for React component props
 */
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * Type for React component state
 */
export type ComponentState<T> = T extends React.Component<unknown, infer S> ? S : never;

/**
 * Type for React event handlers
 */
export type EventHandler<T = Event> = (event: T) => void;

/**
 * Type for React ref
 */
export type ReactRef<T> = React.RefObject<T> | React.MutableRefObject<T> | null;

/**
 * Type for React children
 */
export type ReactChildren = React.ReactNode | React.ReactNode[];

// ============================================================================
// API SPECIFIC UTILITIES
// ============================================================================

/**
 * Type for API request parameters
 */
export type RequestParams = Record<string, string | number | boolean | undefined>;

/**
 * Type for API request body
 */
export type RequestBody = Record<string, unknown> | unknown[] | string | FormData;

/**
 * Type for API response
 */
export type ApiResponse<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
};

/**
 * Type for API error
 */
export type ApiError = {
  message: string;
  status: number;
  statusText: string;
  data?: unknown;
};

/**
 * Type for paginated API response
 */
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ============================================================================
// FORM SPECIFIC UTILITIES
// ============================================================================

/**
 * Type for form field validation
 */
export type FieldValidation = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean | string;
};

/**
 * Type for form validation rules
 */
export type ValidationRules<T> = {
  [K in keyof T]?: FieldValidation;
};

/**
 * Type for form errors
 */
export type FormErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * Type for form state
 */
export type FormState<T> = {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}; 