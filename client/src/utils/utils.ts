
// //  Форматирование разрядов числа
// export default function numberFormat(value: number, locale = 'ru-RU', options = {}) {
//     return new Intl.NumberFormat(locale, options).format(value);
//   }

export const SERVER_API_URL =
    import.meta.env.MODE === 'development'
        ? '' // работает через Vite proxy
        : import.meta.env.VITE_SERVER_API_URL;
