export const translations = {
    uz: {
        nav: {
            dashboard: "Bosh sahifa",
            profile: "Profil",
            serviceCategories: "Xizmat turlari",
            settings: "Sozlamalar",
            logout: "Chiqish",
        },
        service_categories: {
            create_service: "Xizmat yaratish",
            uploading: "Yuklanmoqda...",
            modal: {
                title: "Yangi xizmat",
                subtitle: "Barcha tillarda to'ldiring",
                tab_uz: "O'zbekcha",
                tab_en: "English",
                tab_ru: "Русский",
                // UZ tab — o'zbek tilida yoziladi
                name_label_uz: "Nomi (UZ)",
                name_placeholder_uz: "Masalan: Tish davolash",
                desc_label_uz: "Tavsif (UZ)",
                desc_placeholder_uz: "Xizmat haqida qisqacha ma'lumot...",
                // EN tab — ingliz tilida yoziladi
                name_label_en: "Name (EN)",
                name_placeholder_en: "e.g. Dental Treatment",
                desc_label_en: "Description (EN)",
                desc_placeholder_en: "Brief description of the service...",
                // RU tab — rus tilida yoziladi
                name_label_ru: "Nomi (RU)",
                name_placeholder_ru: "Masalan: Stomatologik davolash",
                desc_label_ru: "Tavsif (RU)",
                desc_placeholder_ru: "Xizmat haqida qisqacha ma'lumot...",
            },
            table_headers: { id: "Id", action: "Amallar" },
            table_body: { no_results: "Natija yo'q", error: "Xatolik yuz berdi" },
            dropdown: { actions: "Amallar", info: "Ma'lumot", edit: "Tahrirlash" },
            pagination: { previous: "Oldingi", next: "Keyingi" },
        },
        common: {
            save: "Saqlash",
            cancel: "Bekor qilish",
        },
        settings: {
            title: "Sozlamalar",
            subtitle: "Til va ko'rinishni sozlang",
            language_section: "Til",
            theme_section: "Ko'rinish",
            theme_light: "Kunduzgi",
            theme_dark: "Tungi",
        },
    },
    en: {
        nav: {
            dashboard: "Dashboard",
            profile: "Profile",
            serviceCategories: "Service Categories",
            settings: "Settings",
            logout: "Logout",
        },
        service_categories: {
            create_service: "Create Service",
            uploading: "Uploading...",
            modal: {
                title: "New Service",
                subtitle: "Fill in all languages",
                tab_uz: "O'zbekcha",
                tab_en: "English",
                tab_ru: "Русский",
                // UZ tab — ingliz tilida yoziladi
                name_label_uz: "Name (UZ)",
                name_placeholder_uz: "e.g. Dental Treatment",
                desc_label_uz: "Description (UZ)",
                desc_placeholder_uz: "Brief description of the service...",
                // EN tab — ingliz tilida yoziladi
                name_label_en: "Name (EN)",
                name_placeholder_en: "e.g. Dental Treatment",
                desc_label_en: "Description (EN)",
                desc_placeholder_en: "Brief description of the service...",
                // RU tab — ingliz tilida yoziladi
                name_label_ru: "Name (RU)",
                name_placeholder_ru: "e.g. Dental Treatment",
                desc_label_ru: "Description (RU)",
                desc_placeholder_ru: "Brief description of the service...",
            },
            table_headers: { id: "Id", action: "Actions" },
            table_body: { no_results: "No results", error: "Error Occurred" },
            dropdown: { actions: "Actions", info: "Info", edit: "Edit" },
            pagination: { previous: "Previous", next: "Next" },
        },
        common: {
            save: "Save",
            cancel: "Cancel",
        },
        settings: {
            title: "Settings",
            subtitle: "Customize language and appearance",
            language_section: "Language",
            theme_section: "Appearance",
            theme_light: "Light",
            theme_dark: "Dark",
        },
    },
    ru: {
        nav: {
            dashboard: "Главная",
            profile: "Профиль",
            serviceCategories: "Категории услуг",
            settings: "Настройки",
            logout: "Выйти",
        },
        service_categories: {
            create_service: "Создать сервис",
            uploading: "Загрузка...",
            modal: {
                title: "Новый сервис",
                subtitle: "Заполните на всех языках",
                tab_uz: "O'zbekcha",
                tab_en: "English",
                tab_ru: "Русский",
                // UZ tab — rus tilida yoziladi
                name_label_uz: "Название (UZ)",
                name_placeholder_uz: "напр. Лечение зубов",
                desc_label_uz: "Описание (UZ)",
                desc_placeholder_uz: "Краткое описание услуги...",
                // EN tab — rus tilida yoziladi
                name_label_en: "Название (EN)",
                name_placeholder_en: "e.g. Dental Treatment",
                desc_label_en: "Описание (EN)",
                desc_placeholder_en: "Краткое описание услуги...",
                // RU tab — rus tilida yoziladi
                name_label_ru: "Название (RU)",
                name_placeholder_ru: "напр. Стоматологическое лечение",
                desc_label_ru: "Описание (RU)",
                desc_placeholder_ru: "Краткое описание услуги...",
            },
            table_headers: { id: "Id", action: "Действия" },
            table_body: { no_results: "Нет результатов", error: "Произошла ошибка" },
            dropdown: { actions: "Действия", info: "Информация", edit: "Редактировать" },
            pagination: { previous: "Назад", next: "Вперёд" },
        },
        common: {
            save: "Сохранить",
            cancel: "Отмена",
        },
        settings: {
            title: "Настройки",
            subtitle: "Настройте язык и внешний вид",
            language_section: "Язык",
            theme_section: "Внешний вид",
            theme_light: "Светлая",
            theme_dark: "Тёмная",
        },
    },
} as const;

export type Translations = typeof translations;
export type Lang = keyof Translations;