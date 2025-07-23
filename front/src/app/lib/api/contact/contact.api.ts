import { apiClient } from "../http";
import { ContactDTO, toContactDTO, RawContact } from "@/app/lib/api/dto/main/contact.dto";

export async function getContacts(): Promise<ContactDTO> {
  const res = await apiClient.get<RawContact>("/data/contacts");
  return toContactDTO(res.data);
}