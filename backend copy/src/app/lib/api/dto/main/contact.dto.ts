export interface RawContact {
  email: string;
  phone: string;
  address: string;
  schedule: string;
  social: {
    instagram: string;
    whatsapp: string;
    telegram: string;
  };
}
export interface ContactDTO {
  email: string;
  phone: string;
  address: string;
  schedule: string;
  whatsappUrl: string;
  telegramUrl: string;
  instagramUrl: string;
}
export function toContactDTO(raw: RawContact): ContactDTO {
  return {
    email: raw.email,
    phone: raw.phone,
    address: raw.address,
    schedule: raw.schedule,
    whatsappUrl: raw.social.whatsapp,
    telegramUrl: raw.social.telegram,
    instagramUrl: raw.social.instagram,
  };
}
