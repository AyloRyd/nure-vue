import type { EventItem } from '../types/event'

export const eventsCatalog: EventItem[] = [
  {
    id: 'vue-conf-2026',
    title: 'Vue Community Meetup',
    description:
      'Зустріч розробників Vue: доклади про Composition API, composables та практики побудови SPA.',
    date: '2026-06-12',
    time: '18:30',
    location: 'ХНУРЕ, ауд. 331',
    category: 'tech',
    capacity: 80,
  },
  {
    id: 'js-deep-dive',
    title: 'JavaScript Deep Dive Workshop',
    description:
      'Практичний воркшоп з асинхронного JavaScript, Promise, fetch та обробки помилок.',
    date: '2026-06-18',
    time: '10:00',
    location: 'IT Hub Kharkiv',
    category: 'tech',
    capacity: 40,
  },
  {
    id: 'photo-walk',
    title: 'Міський фотопрогулянка',
    description:
      'Спільна прогулянка центром міста з практикою вуличної фотографії та обміном досвідом.',
    date: '2026-06-22',
    time: '16:00',
    location: 'Сумська, 2',
    category: 'culture',
    capacity: 25,
  },
  {
    id: 'jazz-evening',
    title: 'Вечір джазової музики',
    description:
      'Живий виступ локального гурту та знайомство з історією джазу в Харкові.',
    date: '2026-07-03',
    time: '19:00',
    location: 'Art Cafe Stage',
    category: 'culture',
    capacity: 60,
  },
  {
    id: 'charity-run',
    title: 'Благодійний забіг 5K',
    description:
      'Забіг на 5 км на підтримку місцевого благодійного фонду. Участь відкрита для всіх рівнів.',
    date: '2026-07-10',
    time: '08:30',
    location: 'Парк Горького',
    category: 'sport',
    capacity: 120,
  },
  {
    id: 'frontend-hack',
    title: 'Frontend Hack Night',
    description:
      'Нічний хакатон для frontend-розробників: команди створюють прототипи за 4 години.',
    date: '2026-07-15',
    time: '17:00',
    location: 'CoWorking Space Nova',
    category: 'tech',
    capacity: 50,
  },
  {
    id: 'open-air-yoga',
    title: 'Йога на відкритому повітрі',
    description:
      'Ранкова сесія йоги для початківців і практикуючих. Коврики надаються на місці.',
    date: '2026-07-20',
    time: '07:30',
    location: 'Caravan Park',
    category: 'sport',
    capacity: 30,
  },
  {
    id: 'book-club',
    title: 'Книжковий клуб: сучасна проза',
    description:
      'Обговорення обраної книги місяця, чай та короткі презентації учасників.',
    date: '2026-07-25',
    time: '18:00',
    location: 'Bookstore Loft',
    category: 'culture',
    capacity: 20,
  },
]
