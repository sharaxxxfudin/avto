export const entryService = {
  async getContacts() {
    return {
      data: {
        email: "info@avtostatus.com",
        phone: "+7 (909) 878-18-89",
        address: "г. Москва, ул. Ленина, д. 1",
        schedule: "Пн-Пт: 9:00-20:00, Сб-Вс: выходной",
        social: {
          instagram: "https://www.instagram.com/avtostatusdv?igsh=MTg2Z2djdzF3ZDUzNQ%3D%3D&utm_source=qr",
          whatsapp: "https://api.whatsapp.com/send/?phone=79098781898",
          telegram: "https://t.me/avtostatusdv",
        },
        watermark: "shadowmind",
      },
    };
  },
  async getConsumers() {
    return {
      data: {
        
      },
    };
  },
};
