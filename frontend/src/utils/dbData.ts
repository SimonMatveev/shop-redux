import { ENUM_CATEGORY, ENUM_PLATFORMS, IItemInsert } from "../types/types";

export const DB_DATA: IItemInsert[] = [
  {
    name: 'Dark Souls Remastered',
    description: 'DARK SOULS: REMASTERED - это уже ставшая культовой японская экшен/РПГ, вышедшая в 2011 году. Разработкой занималась студия From Software. Ремастированная версия вышла в мае 2018 года с подачи QLOC. Итак, что же представляют собой нашумевшие "Темные души"? Во-первых, это высококачественный ролевой боевик, с видом от третьего лица. В самом начале вам потребуется задать своему персонажу ряд характеристик: особенности внешности и класс. С классами тут дело обстоит довольно не традиционным образом. Главный герой — падший воин, который попал в мрачный мир игры.Теперь ему предстоит пройти ряд тяжелых испытаний, прежде чем он достигнет своей цели.Если в прочих играх данной жанровой направленности, разновидности классов делятся на боевые, дальнобойные и магические, то здесь одни только воины.Каждый из этих классов обладает своими достоинствами и недостатками.Рыцарь, к примеру, хорошо защищен, но весьма неповоротлив и тихоходен, в то время как разбойник проворен и силен, но защиты, как таковой, у него нет. Отдельного внимания заслуживают здесь схватки с босами, к каждому из которых нужен свой определенный подход.На одного боса можно потратить уйму времени, ведь общедоступно известный факт - DARK SOULS одна из наиболее сложных экшен / РПГ в истории жанра.Впечатляющая боевая система по праву считается одной, из наиболее продвинутых в целом, состязаться с ней может лишь аналогия из серии игр про Геральта из Ривии, но все равно, в "Темных душах" она хоть и менее динамичная и ритмичная, но куда более вдумчивая.Схватки с противниками превращаются в самый настоящий турнир по шахматам.',
    studio: 'From Software',
    price: 2000,
    priceWithSale: 1000,
    category: [
      ENUM_CATEGORY.ACTION,
      ENUM_CATEGORY.SOULS_LIKE,
      ENUM_CATEGORY.THIRD_PERSON,
      ENUM_CATEGORY.RPG,
    ],
    inStockAmount: 3000,
    releaseDate: '24.05.2018',
    platforms: [
      ENUM_PLATFORMS.PC,
      ENUM_PLATFORMS.PS4,
      ENUM_PLATFORMS.PS5,
      ENUM_PLATFORMS.SWITCH,
      ENUM_PLATFORMS.XBOX_ONE,
      ENUM_PLATFORMS.XBOX_X,
    ],
    series: 'Dark Souls',
    images: [
      'https://yesofcorsa.com/wp-content/uploads/2019/08/Dark-Souls-Remastered-Wallpaper-HQ1.jpg',
      'https://pic.rutubelist.ru/video/66/2f/662f7f044ae08c3ab2013167ead71c26.jpg',
      'https://givemegame.ru/upload/iblock/496/496d4b29076b266a69642a59d5449f33.jpg',
    ]
  }, {
    name: 'Dark Souls 2 Scholar Of The First Sin Edition',
    description: 'Так же как и её предшественница – Dark Souls, игра выполнена в жанре action RPG в сеттинге средневековья и тёмного фэнтези. Мир разбит на несколько десятков подземелий, замков и прочих лабиринтов, наполненных разнообразными опасными монстрами и боссами. Здесь Вам предстоит прокачать своего персонажа, найти новое оружие, броню и магию.',
    studio: 'From Software',
    price: 2000,
    priceWithSale: 1500,
    category: [
      ENUM_CATEGORY.ACTION,
      ENUM_CATEGORY.SOULS_LIKE,
      ENUM_CATEGORY.THIRD_PERSON,
      ENUM_CATEGORY.RPG,
    ],
    inStockAmount: 4700,
    releaseDate: '20.04.2014',
    platforms: [
      ENUM_PLATFORMS.PC,
      ENUM_PLATFORMS.PS4,
      ENUM_PLATFORMS.PS5,
      ENUM_PLATFORMS.SWITCH,
      ENUM_PLATFORMS.XBOX_ONE,
      ENUM_PLATFORMS.XBOX_X,
    ],
    series: 'Dark Souls',
    images: [
      'https://vip-apteka1.ru/wp-content/uploads/8/7/0/8700dc020d9dad7826c0d8ec9638001b.jpeg',
      'https://www.digiseller.ru/preview/730077/p1_3064940_35014743.jpeg',
      'https://i.playground.ru/p/seNAUDHek4W50fle4nZfhA.jpeg',
    ]
  }, {
    name: 'Assassin`s Creed Origins',
    description: 'Assassin`s Creed Origins — это экшен, который разработан студией Ubisoft Quebec. Игра разворачивается в Древнем Египте. У героя будет свой личный сокол, обладающий набором определенных способностей. Размеры мира этой части в разы увеличатся — просторы Assassin`s Creed Origins обещают быть куда больше, чем в любой другой части серии',
    studio: 'Ubisoft',
    price: 2000,
    category: [
      ENUM_CATEGORY.ACTION,
      ENUM_CATEGORY.THIRD_PERSON,
      ENUM_CATEGORY.RPG,
    ],
    inStockAmount: 970,
    releaseDate: '27.10.2017',
    platforms: [
      ENUM_PLATFORMS.PC,
      ENUM_PLATFORMS.PS4,
      ENUM_PLATFORMS.XBOX_ONE,
    ],
    series: 'Assassin`s Creed',
    images: [
      'https://store-images.s-microsoft.com/image/apps.51508.63657969076271726.154f5a09-55ab-4b31-bc57-4e0335fab06a.8c56d9de-b95f-4f50-931b-818bc7d5711c',
      'https://assassinscreed-fan.ru/wp-content/uploads/2022/05/image.jpg?v=1652973435',
      'https://www.notebookcheck.net/fileadmin/Notebooks/Sonstiges/Games/AC_Origins/acorigins__12__1.jpg',
    ]
  }, {
    name: 'Бесконечное Лето',
    description: 'Бесконечное лето – это визуальная новелла от российских разработчиков, дарящая самые искренние и светлые переживания об ушедших днях и надеждах, которым ещё предстоит сбыться. Встретив на улице Семена, главного героя игры, вы бы никогда не обратили на него внимания – действительно, подобных людей в каждом городе тысячи и даже сотни тысяч.',
    studio: 'Soviet Games',
    price: 300,
    priceWithSale: 100,
    category: [
      ENUM_CATEGORY.VN,
    ],
    inStockAmount: 823,
    releaseDate: '02.11.2013',
    platforms: [
      ENUM_PLATFORMS.PC,
    ],
    images: [
      'https://pic.rutubelist.ru/video/62/71/62711ae6bc5356bf3fde5366572c9c12.jpg',
      'https://abrakadabra.fun/uploads/posts/2022-02/1644238678_5-abrakadabra-fun-p-beskonechnoe-leto-oboi-na-android-5.jpg',
      'https://clubgta.ru/wp-content/uploads/1/4/7/1479adcb027b56a3847dabc5283a8f1b.jpeg',
    ]
  }, {
    name: 'Assassin`s Creed Brotherhood',
    description: 'ssassin’s Creed Brotherhood (Ассасин Крид Бразерхуд) – приключенческий экшен с видом от третьего лица, где ты вновь окунешься в продолжение истории и примешь на себя роль профессионального ассасина. По предыдущей истории мы могли узнать, что наш главный герой стал Великим Магистром итальянского ордена. Действие игры отправит тебя на территорию Рима пятнадцатого – шестнадцатого веков. Представители могущественного клана стали для тебя и твоих товарищей тотальной угрозой, которую необходимо устранить как можно быстрее, пока не начались ужасающие последствия. В игре, как и прежде, имеется отличная и очень интересная линия сюжета, где жизнь главного героя напрямую зависит от тебя',
    studio: 'Ubisoft',
    price: 500,
    priceWithSale: 300,
    category: [
      ENUM_CATEGORY.ACTION,
      ENUM_CATEGORY.THIRD_PERSON,
    ],
    inStockAmount: 905,
    releaseDate: '22.03.2011',
    platforms: [
      ENUM_PLATFORMS.PC,
      ENUM_PLATFORMS.PS4,
      ENUM_PLATFORMS.XBOX_ONE,
    ],
    series: 'Assassin`s Creed',
    images: [
      'https://files.vgtimes.ru/gallery/main/148426/acb-box-artwork.jpg',
      'http://squarefaction.ru/files/game/274/gallery/20150108235704_91d034bd.jpg',
      'http://squarefaction.ru/files/game/274/gallery/20150108235716_da728da5.jpg',
      'https://m.media-amazon.com/images/M/MV5BMWFjMzBhMTgtNmE5YS00YzIzLWFiOTgtYTM3OWZmMzFlMzc1XkEyXkFqcGdeQXVyNzAwNzU5NzA@._V1_.jpg',
    ]
  }, {
    name: 'Titanfall 2',
    description: 'Подобно своему предшественнику, игра представляет собой шутер от первого лица, в котором игроки могут контролировать пилота и робота «Титана». Пилот имеет арсенал способностей, которые позволяют совершать прыжки и бег по отвесным стенам с помощью «прыжкового модуля пилота». Эти способности могут быть использованы друг с другом для того, чтобы быстро перемещаться по игровым локациям. Скорость паркура значительно медленнее, чем в предыдущей игре серии, что делает игру более доступной для новых игроков[источник не указан 2567 дней]. Матчи были переработаны так, что игроки теперь имеют достаточно времени, чтобы изучить карту и её особенности.',
    studio: 'Respawn Entertainment',
    price: 800,
    category: [
      ENUM_CATEGORY.ACTION,
      ENUM_CATEGORY.SHOOTER,
      ENUM_CATEGORY.FIRST_PERSION,
    ],
    inStockAmount: 384,
    releaseDate: '11.04.2016',
    platforms: [
      ENUM_PLATFORMS.PC,
      ENUM_PLATFORMS.PS4,
      ENUM_PLATFORMS.XBOX_ONE,
    ],
    series: 'Titanfall',
    images: [
      'https://gamerjournalist.com/wp-content/uploads/2022/11/Titanfall-2.jpg?resize=768',
      'https://portagame.ru/katalog/game/xbox-game/xbox-one-titanfall-2_5.jpg',
      'https://pirategames.ru/uploads/posts/2021-03/1614874410_titanfall-2-screen-1.jpg',
    ]
  }, {
    name: 'Yakuza 0',
    description: 'Являясь ролевой игрой с множеством диалогов, раскрывающих глубокий сюжет, Yakuza 0 претендует на звание игры, в которой сочетается дружба, любовь к себе, поиск истинного призвания. Якудза — крупнейшая в Японии мафиозная группировка, которая управляет всем, что можно взять под управление. События начинаются с 1988 года, когда два персонажа, состоящие в Якудза — Кадзума Кирю и Горо Мадзима, принимают участие в схватке за небольшой промышленный участок в центре Камуротё. Пустая земля по праву никому не принадлежит, поэтому все группировки Японии приезжают захватить это место во что бы то ни стало. Однако наши герои являются преданными своему клану, несмотря на то, что Горо был изгнан, а Кадзума является самым низшим рангом.',
    studio: 'SEGA',
    price: 1000,
    category: [
      ENUM_CATEGORY.ACTION,
      ENUM_CATEGORY.THIRD_PERSON,
    ],
    inStockAmount: 384,
    releaseDate: '12.03.2015',
    platforms: [
      ENUM_PLATFORMS.PC,
      ENUM_PLATFORMS.PS4,
      ENUM_PLATFORMS.XBOX_ONE,
    ],
    series: 'Yakuza',
    images: [
      'https://images.stopgame.ru/blogs/2023/07/25/c1808x1008/_-kM2-WiechosBf5Xg64hw/NB305WE-0.jpg',
      'https://files.vgtimes.ru/gallery/thumb/136947/pocket_racer.jpg',
      'https://main-cdn.sbermegamarket.ru/big2/hlr-system/-1/88/86/74/46/77/31/100026993539b4.jpg',
    ]
  }, {
    name: 'Deus Ex: Human Revolution',
    description: 'третья часть в одноименной серии игр, являющаяся одновременно продолжением и перезапуском франшизы. Игра разработана в киберпанк-сеттинге и относится к так называемому жанру иммерсив-сим - играм, где нет четких границ и условий прохождения миссии - поступайте так, как считаете нужным или в меру своих возможностей и логики.',
    studio: 'Eidos Montreal',
    price: 1000,
    priceWithSale: 700,
    category: [
      ENUM_CATEGORY.ACTION,
      ENUM_CATEGORY.IMMERSIVE_SIM,
      ENUM_CATEGORY.FIRST_PERSION,
    ],
    inStockAmount: 1238,
    releaseDate: '25.10.2013',
    platforms: [
      ENUM_PLATFORMS.PC,
      ENUM_PLATFORMS.PS4,
      ENUM_PLATFORMS.XBOX_ONE,
    ],
    series: 'Deus Ex',
    images: [
      'https://assets.rpgsite.net/images/images/000/003/730/original/Deus_Ex_Human_Revolution_artwork_1.JPG',
      'https://i.pinimg.com/originals/1a/b2/26/1ab2263dcfd22f7c39ed4b4f36427dc2.jpg',
      'https://www.newgamenetwork.com/images/uploads/gallery/DeusExHumanRev/dxhr%202011-08-21%2010-24-35-40.jpg',
      'https://aksakovufamuseum.ru/wp-content/uploads/9/7/b/97bdf001620f7347591b4a9332c57fb4.jpeg',
    ]
  },
]


