/**
 * Application error hierarchy — Part F2
 *
 * Maps to the standardised error format:
 * { error: { code, message, requestId, fields? } }
 */

export type ErrorField = {
  path: string;
  message: string;
};

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly fields?: ErrorField[];

  constructor(
    code: string,
    message: string,
    statusCode: number,
    fields?: ErrorField[]
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.fields = fields;
  }

  toJSON(requestId?: string) {
    return {
      error: {
        code: this.code,
        message: this.message,
        requestId: requestId ?? undefined,
        ...(this.fields && { fields: this.fields }),
      },
    };
  }
}

// ─── Specific Error Classes ─────────────────────────────

export class ValidationError extends AppError {
  constructor(message: string, fields?: ErrorField[]) {
    super('VALIDATION_FAILED', message, 422, fields);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(entity: string, identifier: string) {
    super('NOT_FOUND', `${entity} not found: ${identifier}`, 404);
    this.name = 'NotFoundError';
  }
}

export class DuplicateNameError extends AppError {
  public readonly existing: { id: string; name: string };

  constructor(name: string, existing: { id: string; name: string }) {
    super('DUPLICATE_NAME', `"${name}" already exists as "${existing.name}"`, 409);
    this.name = 'DuplicateNameError';
    this.existing = existing;
  }

  override toJSON(requestId?: string) {
    const base = super.toJSON(requestId);
    return {
      ...base,
      error: {
        ...base.error,
        existing: this.existing,
      },
    };
  }
}

export class InUseError extends AppError {
  public readonly references: { type: string; count: number; names?: string[] };

  constructor(entity: string, references: { type: string; count: number; names?: string[] }) {
    super(
      'IN_USE',
      `${entity} is used by ${references.count} ${references.type}(s)`,
      409
    );
    this.name = 'InUseError';
    this.references = references;
  }

  override toJSON(requestId?: string) {
    const base = super.toJSON(requestId);
    return {
      ...base,
      error: {
        ...base.error,
        references: this.references,
      },
    };
  }
}

export class HamperFestivalMismatchError extends AppError {
  constructor(productNames: string[]) {
    super(
      'HAMPER_FESTIVAL_MISMATCH',
      `These products do not belong to the hamper's festival: ${productNames.join(', ')}`,
      422
    );
    this.name = 'HamperFestivalMismatchError';
  }
}

export class UnauthenticatedError extends AppError {
  constructor() {
    super('UNAUTHENTICATED', 'Authentication required', 401);
    this.name = 'UnauthenticatedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(reason: string = 'Access denied') {
    super('FORBIDDEN', reason, 403);
    this.name = 'ForbiddenError';
  }
}

export class CsrfError extends AppError {
  constructor() {
    super('CSRF_FAILED', 'Invalid or missing CSRF token', 403);
    this.name = 'CsrfError';
  }
}

export class RateLimitError extends AppError {
  public readonly retryAfter: number;

  constructor(retryAfterSeconds: number) {
    const mins = Math.ceil(retryAfterSeconds / 60);
    const msg =
      mins > 1
        ? `Too many attempts. Please wait ${mins} minutes before trying again.`
        : `Too many attempts. Please wait ${retryAfterSeconds} seconds before trying again.`;
    super('RATE_LIMITED', msg, 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfterSeconds;
  }
}

export class FileTooLargeError extends AppError {
  constructor(maxMB: number) {
    super('FILE_TOO_LARGE', `File exceeds the ${maxMB} MB limit`, 413);
    this.name = 'FileTooLargeError';
  }
}

export class UnsupportedMediaTypeError extends AppError {
  constructor() {
    super(
      'UNSUPPORTED_MEDIA_TYPE',
      'This file is not a valid image. Please upload a JPG, PNG or WebP photo.',
      415
    );
    this.name = 'UnsupportedMediaTypeError';
  }
}

export class ImageCountExceededError extends AppError {
  constructor() {
    super(
      'IMAGE_COUNT_EXCEEDED',
      '2 photos added. Remove one to add another.',
      422
    );
    this.name = 'ImageCountExceededError';
  }
}

export class ImageInvalidError extends AppError {
  constructor(reason: string) {
    super('IMAGE_INVALID', reason, 422);
    this.name = 'ImageInvalidError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409);
    this.name = 'ConflictError';
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super('BAD_REQUEST', message, 400);
    this.name = 'BadRequestError';
  }
}
