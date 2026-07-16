import { getStore } from "@netlify/blobs";

const MAX_BODY_LENGTH = 64_000;

const SERVICE_OPTIONS = [
  "Animated Video Production",
  "Social Media Management",
  "Website Design and Hosting",
  "Brand Identity",
  "Content Writing and SEO",
  "Product Photography",
  "Video Production",
  "Google Ads",
  "CRM Systems",
  "Multiple Services",
  "Not Sure Yet",
] as const;

const CONTACT_METHODS = ["Email", "Phone", "WhatsApp"] as const;

const SUCCESS_MESSAGE =
  "Thank you for contacting Word of Mouth. Your request has been received, and our team will get in touch with you shortly.";
const FAILURE_MESSAGE =
  "We couldn't submit your request. Please check the required fields or contact us directly by phone, email, or WhatsApp.";

type JsonRecord = Record<string, unknown>;
type FieldErrors = Record<string, string>;

function json(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n?/g, "\n");
}

function requireText(
  payload: JsonRecord,
  field: string,
  label: string,
  errors: FieldErrors,
  options: { min?: number; max: number },
) {
  const value = cleanText(payload[field]);
  const min = options.min ?? 1;

  if (!value) {
    errors[field] = `${label} is required.`;
  } else if (value.length < min) {
    errors[field] = `${label} must be at least ${min} characters.`;
  } else if (value.length > options.max) {
    errors[field] = `${label} must be ${options.max} characters or fewer.`;
  }

  return value;
}

function canonicalChoice<T extends readonly string[]>(value: string, options: T) {
  const normalized = value.toLocaleLowerCase("en-US");
  return options.find((option) => option.toLocaleLowerCase("en-US") === normalized);
}

function validatePayload(payload: JsonRecord) {
  const errors: FieldErrors = {};

  const fullName = requireText(payload, "fullName", "Full name", errors, {
    min: 2,
    max: 120,
  });
  const companyName = requireText(payload, "companyName", "Company name", errors, {
    max: 160,
  });
  const phoneNumber = requireText(payload, "phoneNumber", "Phone number", errors, {
    max: 40,
  });
  const jobTitle = requireText(payload, "jobTitle", "Job title", errors, {
    min: 2,
    max: 120,
  });
  const emailAddress = requireText(payload, "emailAddress", "Email address", errors, {
    max: 254,
  }).toLocaleLowerCase("en-US");
  const serviceInput = requireText(payload, "serviceRequired", "Service required", errors, {
    max: 80,
  });
  const estimatedBudget = requireText(
    payload,
    "estimatedBudget",
    "Estimated budget",
    errors,
    { max: 100 },
  );
  const contactMethodInput = requireText(
    payload,
    "preferredContactMethod",
    "Preferred contact method",
    errors,
    { max: 40 },
  );
  const projectDetails = requireText(payload, "projectDetails", "Project details", errors, {
    min: 20,
    max: 5_000,
  });

  if (emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
    errors.emailAddress = "Enter a valid email address.";
  }

  const phoneDigits = phoneNumber.replace(/\D/g, "");
  if (
    phoneNumber &&
    (!/^[+\d\s().-]+$/.test(phoneNumber) || phoneDigits.length < 7 || phoneDigits.length > 20)
  ) {
    errors.phoneNumber = "Enter a valid phone number.";
  }

  const serviceRequired = canonicalChoice(serviceInput, SERVICE_OPTIONS);
  if (serviceInput && !serviceRequired) {
    errors.serviceRequired = "Choose a service from the available options.";
  }

  const preferredContactMethod = canonicalChoice(contactMethodInput, CONTACT_METHODS);
  if (contactMethodInput && !preferredContactMethod) {
    errors.preferredContactMethod = "Choose Email, Phone, or WhatsApp.";
  }

  if (payload.consent !== true) {
    errors.consent = "Consent is required before submitting your request.";
  }

  if (Object.keys(errors).length > 0 || !serviceRequired || !preferredContactMethod) {
    return { ok: false as const, errors };
  }

  return {
    ok: true as const,
    value: {
      fullName,
      companyName,
      phoneNumber,
      jobTitle,
      emailAddress,
      serviceRequired,
      estimatedBudget,
      preferredContactMethod,
      projectDetails,
      consentGiven: true,
    },
  };
}

function isHoneypotFilled(payload: JsonRecord) {
  return [payload.website, payload.websiteUrl, payload.companyWebsite].some(
    (value) => cleanText(value).length > 0,
  );
}

function successResponse(requestId: string) {
  return json(
    {
      ok: true,
      requestId,
      message: SUCCESS_MESSAGE,
    },
    201,
  );
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLocaleLowerCase("en-US").includes("application/json")) {
    return json(
      {
        ok: false,
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "Send the quote request as JSON.",
      },
      415,
      { Accept: "application/json" },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_LENGTH) {
    return json(
      {
        ok: false,
        code: "PAYLOAD_TOO_LARGE",
        message: "The quote request is too large.",
      },
      413,
    );
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_LENGTH) {
      return json(
        {
          ok: false,
          code: "PAYLOAD_TOO_LARGE",
          message: "The quote request is too large.",
        },
        413,
      );
    }
    payload = JSON.parse(body);
  } catch {
    return json(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "The quote request contains invalid JSON.",
      },
      400,
    );
  }

  if (!isJsonRecord(payload)) {
    return json(
      {
        ok: false,
        code: "INVALID_PAYLOAD",
        message: "The quote request must be a JSON object.",
      },
      400,
    );
  }

  // A filled hidden website field marks automated spam. Return the same public
  // success shape without storing it so bots cannot tune around the trap.
  if (isHoneypotFilled(payload)) {
    return successResponse(crypto.randomUUID());
  }

  const validation = validatePayload(payload);
  if (!validation.ok) {
    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: FAILURE_MESSAGE,
        fieldErrors: validation.errors,
      },
      400,
    );
  }

  const requestId = crypto.randomUUID();

  try {
    const quoteStore = getStore({ name: "quote-requests", consistency: "strong" });
    await quoteStore.setJSON(`requests/${requestId}.json`, {
      id: requestId,
      ...validation.value,
      status: "new",
      receivedAt: new Date().toISOString(),
    });

    return successResponse(requestId);
  } catch (error) {
    console.error("Unable to save quote request", error);
    return json(
      {
        ok: false,
        code: "STORAGE_UNAVAILABLE",
        message: FAILURE_MESSAGE,
      },
      503,
    );
  }
}
