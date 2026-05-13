// lib/constants.ts

export const orgMap: { [key: string]: string } = {
    SGH: "Starlane General Hospital",
    NMC: "Northcrest Medical Center",
    EHI: "Evergreen Health Institute",
    NCI: "NovaCare Institute",
    HGH: "Havenridge General Hospital"
  };

// Role: middleware stamps this cookie on every page response with the server-side
// UA verdict ("1" = phone, "0" = not phone). Client code reads it so the QR step
// and /mobile routing can never disagree about the same device, even if a
// browser extension has spoofed navigator.userAgent on the client side only.
export const IS_PHONE_COOKIE = "cidien_is_phone";
