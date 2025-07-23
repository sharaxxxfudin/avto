import { getContacts } from "@/app/lib/api/contact/contact.api";

export default async function TopBar() {
  const contacts = await getContacts();

  return (
    <div className="text-white text-xs sm:text-sm py-2 px-2 sm:px-4 bg-[#1a1a1a]">
      <div className="
        max-w-7xl mx-auto flex flex-col sm:flex-row
        sm:justify-between sm:items-center gap-2 sm:gap-0
      ">
        {/* Адрес и телефон */}
        <div className="
          flex flex-col xs:flex-row xs:items-center
          gap-1 xs:gap-4 sm:gap-6
          text-center xs:text-left
        ">
          <span className="font-regular">{contacts.address}</span>
          <span className="font-regular">{contacts.phone}</span>
        </div>
        {/* Соцсети */}
        <div className="
          flex gap-2 xs:gap-3 sm:gap-4 mt-1 sm:mt-0 justify-center sm:justify-end
        ">
          <a className="font-regular hover:text-[#e01a31] transition" href={contacts.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram</a>
          <a className="font-regular hover:text-[#25D366] transition" href={contacts.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a className="font-regular hover:text-[#C13584] transition" href={contacts.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  );
}
