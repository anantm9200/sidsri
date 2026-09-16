import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
  "https://static.wixstatic.com/media/548938_f62846ba164e46ef9c722e67b3ae2076~mv2.jpg",
  "https://static.wixstatic.com/media/548938_995acf11ce4d45b3a3f9138bee23e6c1~mv2.jpg",
  "https://static.wixstatic.com/media/548938_e391b9d5756a4477b2211a2fc3dd03ae~mv2.jpg",
  "https://static.wixstatic.com/media/548938_5ecc695809b948df9069a41fdf9b30b7~mv2.jpg",
  "https://static.wixstatic.com/media/548938_2df5e88fe8bc4d94b08813b66e64735a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_45d7534b0f0b4479a1266b8ad050fd80~mv2.jpg",
  "https://static.wixstatic.com/media/548938_5473e8fd41ec4eefb537b72fa37de320~mv2.jpg",
  "https://static.wixstatic.com/media/548938_8ce2bc9c3b8743698d5bf83607b0a9c1~mv2.jpg",
  "https://static.wixstatic.com/media/548938_183660d8ee1c407ca2b61c65f2f09e33~mv2.jpg",
  "https://static.wixstatic.com/media/548938_1b29c53bb37940488f781b277b235d4d~mv2.jpg",
  "https://static.wixstatic.com/media/548938_aad3e1b45dfd47ff89cbdcd39c156264~mv2.jpg",
  "https://static.wixstatic.com/media/548938_3f6d40bd67aa4ea495d8922d6f73214a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_00fc91a3e95149d09ce2064f4ebbf149~mv2.jpg",
  "https://static.wixstatic.com/media/548938_3a0fb42b407d40f691ae9bb59fd51d5a~mv2.jpg",
  "https://static.wixstatic.com/media/548938_d515d2de1ed045ef92b955c14d6753df~mv2.jpg",
  "https://static.wixstatic.com/media/548938_0a940d6217ad436faab14175cc4bb5b2~mv2.jpg"
];

const VIMEO_PROFILE = 'https://vimeo.com/siddharthdop';

const SELECTED_WORK = [
  {
    id: '01',
    title: 'KAALA TEASER',
    type: 'WEBSERIES',
    image: 'https://i.vimeocdn.com/video/1739105513-07073d98c87993ef1f14236f4c23a6aca90335e583316bbe1904a8f7d072d253-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/874827009',
  },
  {
    id: '02',
    title: 'DUET — TRAILER',
    type: 'SHORT FILM',
    image: 'https://i.vimeocdn.com/video/2183812349-79b371485af04b26078db91c7de4eb4f22468ac342bd837df1d789e91b2644cb-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1213203318',
  },
  {
    id: '03',
    title: 'ORALAND x Suryakumar Yadav',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2170653403-84eeea23fd2d8be3dc278abfcac15edfad3d352f622b8b28f3076307faeb5473-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1202805509',
  },
  {
    id: '04',
    title: 'ASIA CUP x Harmanpreet Kaur',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2199295186-0b260aeb2fcb5ebedc25df02ca1e66ea3200d35d60d90538c0091a12072aaeb6-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1225544749',
  },
  {
    id: '05',
    title: 'SONYSPORT x Rakesh Bedi',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2167617865-d6b4b183cb7a204692d40356c570a47d4162c448de3705e68ab90157a4312c75-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1200507675',
  },
  {
    id: '06',
    title: 'VIVO V27',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1670231235-e01965db7936054cd433c502188f372e04afc45c52b730aa02d20e86499ffe0c-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/810797934',
  },
  {
    id: '07',
    title: 'PERFECT JUSTICE',
    type: 'FEATURE FILM',
    image: 'https://i.vimeocdn.com/video/2190890551-73ee2d7719500a4ac1f24235e5165e6f26ec0f6e14ec28c04b8b69e032a75772-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/309167152',
  },
  {
    id: '08',
    title: 'PAATAL LOK PROMO x Jaideep Ahlawat',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2030567140-abfddb4fb0795741924b1159ade035378f1d6a318986f492e9895e963b88e9f2-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1046320358',
  },
  {
    id: '09',
    title: 'VIVO V50',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1985808395-d239c3e4048ba9119ef969c823a2479f92bab1f95b8fee960b8c740490ee2b45-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1059452766',
  },
  {
    id: '10',
    title: 'DISCOVERY',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1637879798-d18277d49527a99a8ffbc2a1221740124d71ef9afe9918e07da3427f101a6176-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/810437793',
  },
  {
    id: '11',
    title: 'LAZY DAY x Milind Soman',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2050737179-6a2805ff04b45edfeeca63229f22c5f8e50381d7ffccdfc36ecfca71d639da62-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1112487367',
  },
  {
    id: '12',
    title: 'OPPO N3 FLIP x Siddhanth and Jackie',
    type: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2015191516-21f776e61014f4c5d2dd35c1ad79e2a69c0641633e71c5b7ff860682f020e6cc-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/882346836',
  },
];

const NARRATIVE_WORK = [
  {
    id: 1,
    title: 'KAALA',
    info: 'HOTSTAR | WEBSERIES',
    poster: 'https://i.vimeocdn.com/video/1739105513-07073d98c87993ef1f14236f4c23a6aca90335e583316bbe1904a8f7d072d253-d_1280x720?&r=pad&region=us',
    videos: [
      { label: 'TEASER', link: 'https://vimeo.com/874827009' },
      { label: 'TRAILER', link: 'https://vimeo.com/874840844' },
    ],
  },
  {
    id: 2,
    title: 'DUET',
    info: 'SHORT FILM',
    poster: 'https://i.vimeocdn.com/video/2183812349-79b371485af04b26078db91c7de4eb4f22468ac342bd837df1d789e91b2644cb-d_1280x720?&r=pad&region=us',
    videos: [
      { label: 'TRAILER', link: 'https://vimeo.com/1213203318' },
    ],
  },
  {
    id: 3,
    title: 'PERFECT JUSTICE',
    info: 'TAIWANESE | FEATURE FILM',
    poster: 'https://i.vimeocdn.com/video/2190890551-73ee2d7719500a4ac1f24235e5165e6f26ec0f6e14ec28c04b8b69e032a75772-d_1280x720?&r=pad&region=us',
    videos: [
      { label: 'FIRST LOOK', link: 'https://vimeo.com/309167152' },
    ],
  },
  {
    id: 4,
    title: 'GUILTY MINDS',
    info: 'AMAZON PRIME | SERIES',
    poster: 'https://i.vimeocdn.com/video/2157761084-c2f60fd7c587780f435c296d53c045b9cfddced4366831012a8fe7ff1bd0c0e2-d_1280x720?&r=pad&region=us',
    videos: [
      { label: 'TRAILER', link: 'https://vimeo.com/1076651680' },
      { label: 'OPENING TITLE', link: 'https://vimeo.com/823623520' },
    ],
  },
  {
    id: 5,
    title: 'AVE MARIA',
    info: 'SHORT FILM | FIRST LOOK',
    poster: 'https://i.vimeocdn.com/video/1744043776-fff0c1c16ce3085393ddf0e718271ab3bc7217ea8932c14ae04b4b471e9bfe9f-d_1280x720?&r=pad&region=us',
    videos: [
      { label: 'FIRST LOOK', link: 'https://vimeo.com/878187717' },
    ],
  },
];

const COMMERCIAL_WORK = [
  {
    id: 1,
    title: 'ORALAND x Suryakumar Yadav',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2170653403-84eeea23fd2d8be3dc278abfcac15edfad3d352f622b8b28f3076307faeb5473-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1202805509',
  },
  {
    id: 2,
    title: 'ASIA CUP x Harmanpreet Kaur',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2199295186-0b260aeb2fcb5ebedc25df02ca1e66ea3200d35d60d90538c0091a12072aaeb6-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1225544749',
  },
  {
    id: 3,
    title: 'SONYSPORT x Rakesh Bedi',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2167617865-d6b4b183cb7a204692d40356c570a47d4162c448de3705e68ab90157a4312c75-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1200507675',
  },
  {
    id: 4,
    title: 'VIVO V27',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1670231235-e01965db7936054cd433c502188f372e04afc45c52b730aa02d20e86499ffe0c-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/810797934',
  },
  {
    id: 5,
    title: 'PAATAL LOK PROMO x Jaideep Ahlawat',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2030567140-abfddb4fb0795741924b1159ade035378f1d6a318986f492e9895e963b88e9f2-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1046320358',
  },
  {
    id: 6,
    title: 'VIVO V50',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1985808395-d239c3e4048ba9119ef969c823a2479f92bab1f95b8fee960b8c740490ee2b45-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1059452766',
  },
  {
    id: 7,
    title: 'DISCOVERY',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1637879798-d18277d49527a99a8ffbc2a1221740124d71ef9afe9918e07da3427f101a6176-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/810437793',
  },
  {
    id: 8,
    title: 'LAZY DAY x Milind Soman',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2050737179-6a2805ff04b45edfeeca63229f22c5f8e50381d7ffccdfc36ecfca71d639da62-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1112487367',
  },
  {
    id: 9,
    title: 'OPPO N3 FLIP x Siddhanth and Jackie',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2015191516-21f776e61014f4c5d2dd35c1ad79e2a69c0641633e71c5b7ff860682f020e6cc-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/882346836',
  },
  {
    id: 10,
    title: 'REALME NARZO x Vaani Kapoor and Rohit Saraf',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2005860683-1c884461faca3f3e71d77888dccec34d774a3980fffd0d793666470c15fe3ce7-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/844561544',
  },
  {
    id: 11,
    title: 'TATA ACE',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1837783649-356fad17c42d3ffd660b959edb41f513a233459e35f7683838b3a67bffc91766-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/937263553',
  },
  {
    id: 12,
    title: 'AMAZON MX PLAYER x Shikhar Dhawan and Orry',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1981624915-e4b17936c1a6856f46d62e6b43f845e37264b2230aa37543c87b02f6b7db79fd-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1054564777',
  },
  {
    id: 13,
    title: 'SBI x R Ashwin',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2073749699-293d89dc66bcc482a9b7d878b2a490097059ef54864b4b4fd585feb96f2c0fbc-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1130153129',
  },
  {
    id: 14,
    title: 'ZEPTO X THUMSUP X-FORCE',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2021113799-86d289d866574eb21302e61d46db75c20440016cafcfba33e0815d50629e5d1a-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1075566726',
  },
  {
    id: 15,
    title: 'OPPO N3 FLIP x Babil Khan',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2005862338-c50a95e070d4ca904722fd4bf19f736a046f44b7fd4e241ba20b2978f89a259e-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/885123312',
  },
  {
    id: 16,
    title: 'STRANGER THINGS x Rohit Sharma',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2133300207-15d59f0fcb238360b58abc2f67f079654febdda728820e3641eb35b81b346986-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1173175350',
  },
  {
    id: 17,
    title: 'TATA INTRA',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2015187675-55b2988633904687fefd43ea4a36652ed3db843690343db954b1d0273b6ca449-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/945681444',
  },
  {
    id: 18,
    title: 'FAMILY MAN x Ananya Pandey',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2135988806-f30b6adeb0675af97e12a682dbbeaa85d148f3f7840c1743f444d198adc8617b-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1173536105',
  },
  {
    id: 19,
    title: 'FLIPKART',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2133298417-4e39466248e9b3601e1031670610295623b09eed83137405c355c18266806fee-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1173173217',
  },
  {
    id: 20,
    title: 'GYAN MUSEUM TEASER',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/722101098-c2d804c59861a32da96db843504ef9dc9d9dc801fe16dda838884595ec318bbd-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/287055894',
  },
  {
    id: 21,
    title: 'USHA FAN TVC',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1607690942-448fd66f34433234f8d3c9e95560bf8d66bab2d5c02e4c5098587c3cca745c56-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/338817509',
  },
  {
    id: 22,
    title: 'INTRA V50 x Randeep Hooda',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2011482224-6e3b679fea3b7cb12fd47918fcac0527c0d58156552c36f9b990ffe14aaca4fc-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1011767096',
  },
  {
    id: 23,
    title: 'LINC PENS',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1894650421-e9bf16e1c217152488b08f1ce90ec7c6d05e95ba8b27dca0ebcb8b37da4f630f-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/320270389',
  },
  {
    id: 24,
    title: 'ACE RAKSHAK x Vineet Kumar',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1939358077-d0b5f9ea58222eb9b282ec6667a83e65416eae04cc6a0d99f58ea78b82e92adf-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1020733885',
  },
  {
    id: 25,
    title: 'OPPO x Sanya Malhotra',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2023851926-f076f3c46b66e62e5d2dbee2a6d68892a851e7654c4e7b44f737a27a5c412616-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/879654438',
  },
  {
    id: 26,
    title: 'NATGEO CASE FILES x Sharad Kelkar',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1449949664-fdfdcebca0eead1ca23633e6ccb0519c3be4751b3d7798e33fcc6f2bc9c7cf7d-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/719717068',
  },
  {
    id: 27,
    title: 'TVS',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2074649140-6a30b6be7e67182d663b374bd2eb5d6cd1f132a136b72a0aac138b251ad33b67-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/1130838252',
  },
  {
    id: 28,
    title: 'BAJAJ CHETAK ELECTRIC',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1805667603-b8a1fc793fb46eb081b24033ef5ccc904ffa09d634981c987a5e3d85656807d1-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/917381809',
  },
  {
    id: 29,
    title: 'OPPO N3 FLIP x Sharvari',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1754520010-ccdfe705a55ecf03f9ee10a710f6cac66a854a91cb977683698d5f02e128c3a8-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/885121772',
  },
  {
    id: 30,
    title: 'KBC PROMO',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/2021113198-87ba7aa4919da85e90bf603911c6c4dc158e6678938dc707510903aacb5206f4-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/736770572',
  },
  {
    id: 31,
    title: 'OPPO N3 FLIP x Harshvarrdhan Kapoor',
    category: 'COMMERCIAL',
    image: 'https://i.vimeocdn.com/video/1754526063-556eab032997ab3635b721c3965a1491880464f3d6ece3b8830c9dea1f1da9e7-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/885125851',
  },
  {
    id: 32,
    title: 'THE LONGEST ENGAGEMENT',
    category: 'MUSIC / FASHION',
    image: 'https://i.vimeocdn.com/video/2015927642-c35d8756c6147d596093fb008fb120c4bd062b0ec9a83c2a75591868f28eeb95-d_1280x720?&r=pad&region=us',
    link: 'https://vimeo.com/164061841',
  },
];

const SELECTED_VIDEO_PLAYLIST = SELECTED_WORK.map((work) => ({
  link: work.link,
  title: work.title,
}));

const COMMERCIAL_VIDEO_PLAYLIST = COMMERCIAL_WORK.map((work) => ({
  link: work.link,
  title: work.title,
}));

const NARRATIVE_VIDEO_PLAYLIST = NARRATIVE_WORK.flatMap((work) =>
  work.videos.map((video) => ({
    link: video.link,
    title: `${work.title} — ${video.label}`,
  }))
);

const getPagination = (current, total, windowSize = 5) => {
  const start = Math.floor(current / windowSize) * windowSize;
  const visibleCount = Math.min(windowSize, total - start);

  return Array.from({ length: visibleCount }, (_, index) => start + index);
};

const getVimeoEmbedUrl = (link) => {
  const videoId = link.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
  return videoId
    ? `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`
    : '';
};

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [activeVideo, setActiveVideo] = useState(null);
  
  const footerRef = useRef(null);
  const aboutRef = useRef(null); 
  const nextSectionRef = useRef(null);
  const playerShellRef = useRef(null);
  const videoHistoryPushedRef = useRef(false);

  useEffect(() => {
    setIsAppLoaded(true);
  }, []);

  useEffect(() => {
    if (activeView !== 'home') return;

    // Keep every hero image on screen for 9 seconds.
    // This timeout restarts after manual navigation so no slide changes early.
    const timeout = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 9000);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, activeView]);

  useEffect(() => {
    const closeVideoOnBack = () => {
      if (!videoHistoryPushedRef.current) return;
      videoHistoryPushedRef.current = false;
      setActiveVideo(null);
    };

    window.addEventListener('popstate', closeVideoOnBack);
    return () => window.removeEventListener('popstate', closeVideoOnBack);
  }, []);

  useEffect(() => {
    if (!activeVideo) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;

      if (videoHistoryPushedRef.current) {
        window.history.back();
      } else {
        setActiveVideo(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeVideo]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const playVideo = (link, title, playlist) => {
    const videoIndex = Math.max(
      0,
      playlist.findIndex((video) => video.link === link && video.title === title)
    );

    if (!videoHistoryPushedRef.current) {
      window.history.pushState(
        { ...(window.history.state || {}), portfolioVideo: true },
        '',
        window.location.href
      );
      videoHistoryPushedRef.current = true;
    }

    setActiveVideo({ link, title, playlist, index: videoIndex });
  };

  const closeVideo = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }

    if (videoHistoryPushedRef.current) {
      window.history.back();
    } else {
      setActiveVideo(null);
    }
  };

  const playNextVideo = () => {
    if (!activeVideo?.playlist?.length) return;
    const nextIndex = (activeVideo.index + 1) % activeVideo.playlist.length;
    const nextVideo = activeVideo.playlist[nextIndex];
    setActiveVideo({ ...nextVideo, playlist: activeVideo.playlist, index: nextIndex });
  };

  const enterVideoFullscreen = () => {
    const playerShell = playerShellRef.current;
    if (!playerShell) return;

    if (playerShell.requestFullscreen) {
      playerShell.requestFullscreen().catch(() => {});
    } else if (playerShell.webkitRequestFullscreen) {
      playerShell.webkitRequestFullscreen();
    }
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    if (activeView !== 'home') {
      setActiveView('home');
      const scrollWhenReady = (attempt = 0) => {
        if (aboutRef.current) {
          aboutRef.current.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        if (attempt < 120) {
          requestAnimationFrame(() => scrollWhenReady(attempt + 1));
        }
      };

      requestAnimationFrame(() => scrollWhenReady());
    } else {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className={`siddharth-site min-h-screen overflow-x-clip selection:bg-neutral-500/30 font-sans transition-colors duration-1000 ease-in-out ${theme === 'dark' ? 'bg-[#050505] text-[#ededed]' : 'bg-[#f4f4f4] text-[#111111]'}`}>
      <style>{`
        :root {
          --site-gutter: clamp(1rem, 4vw, 6rem);
        }

        html,
        body,
        #root {
          min-width: 0;
          overflow-x: clip;
        }

        .site-frame {
          width: min(100%, 2400px);
          margin-inline: auto;
        }

        .site-gutter {
          padding-left: max(var(--site-gutter), env(safe-area-inset-left));
          padding-right: max(var(--site-gutter), env(safe-area-inset-right));
        }

        .site-header {
          padding-top: max(clamp(1rem, 3vh, 2.5rem), env(safe-area-inset-top));
        }

        .hero-section {
          min-height: 100svh;
          padding-top: clamp(6.75rem, 12vh, 10rem);
          padding-bottom: max(clamp(2rem, 6vh, 5rem), env(safe-area-inset-bottom));
        }

        .hero-stage {
          height: clamp(20rem, 68svh, 75rem);
        }

        .footer-signature {
          font-size: clamp(1rem, 2vw, 2rem);
        }

        .video-player-shell:fullscreen,
        .video-player-shell:-webkit-full-screen {
          width: 100vw !important;
          max-width: none !important;
          height: 100vh !important;
          padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #050505;
        }

        .video-player-shell:fullscreen .video-player-frame,
        .video-player-shell:-webkit-full-screen .video-player-frame {
          width: min(100%, calc((100vh - 9rem) * 16 / 9));
          margin-inline: auto;
        }

        /* Keep the mobile composition cinematic while removing excess dead space. */
        @media (max-width: 639px) and (orientation: portrait) {
          .hero-stage {
            height: 58svh;
          }

          .hero-lower-nav {
            margin-top: 1.25rem;
          }
        }

        @media (max-width: 359px) {
          :root {
            --site-gutter: 0.75rem;
          }

          .brand-title {
            max-width: 7rem;
            font-size: 9px;
            line-height: 1.15;
          }

          .header-nav-label {
            font-size: 8px;
            letter-spacing: 0.12em;
          }

          .hero-page-button:not([aria-current='true']) {
            display: none;
          }

          .hero-stage {
            height: 52svh;
          }
        }

        @media (orientation: landscape) and (max-height: 600px) {
          .site-header {
            padding-top: max(0.75rem, env(safe-area-inset-top));
          }

          .hero-section {
            min-height: 100dvh;
            padding-top: 4.75rem;
            padding-bottom: max(1rem, env(safe-area-inset-bottom));
          }

          .hero-stage {
            height: 58dvh;
            min-height: 13rem;
          }

          .hero-lower-nav {
            margin-top: 0.75rem;
          }
        }

        @media (min-width: 1800px) {
          .hero-stage {
            width: min(92vw, 2200px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .siddharth-site *,
          .siddharth-site *::before,
          .siddharth-site *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      {/* Fixed Header */}
      <header className={`site-frame site-gutter site-header fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 pb-4 sm:pb-6 flex justify-between items-start gap-3 pointer-events-none transition-colors duration-1000 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <div 
          onClick={() => { setActiveView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
          className="min-w-0 flex flex-col items-center cursor-pointer pointer-events-auto group w-fit"
        >
          <div className="text-center">
            <h1 className="brand-title font-sans text-[clamp(10px,1.5vw,18px)] tracking-[0.12em] sm:tracking-widest uppercase font-semibold leading-none whitespace-normal sm:whitespace-nowrap">Siddharth Srinivasan</h1>
            <p className="font-mono text-[8px] sm:text-[10px] md:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase mt-1.5 sm:mt-2 opacity-80">DOP</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-6 lg:gap-12 pointer-events-auto">
          <button onClick={scrollToAbout} className="cursor-pointer w-fit py-2 px-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current" aria-label="Go to the About section">
             <div>
               <span className="header-nav-label font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase">ABOUT</span>
             </div>
          </button>
          <button onClick={scrollToFooter} className="cursor-pointer w-fit py-2 px-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current" aria-label="Go to the Contact section">
             <div>
               <span className="header-nav-label font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase">CONTACT</span>
             </div>
          </button>
          
          <button 
            onClick={toggleTheme}
            className={`relative flex shrink-0 items-center w-12 h-6 sm:w-14 sm:h-7 rounded-full p-1 transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#e5e5e5]'}`}
            aria-label="Toggle Theme"
            aria-pressed={theme === 'dark'}
          >
            <div 
              className={`absolute left-1 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm overflow-hidden transition-all duration-700 ease-[0.19,1,0.22,1] ${
                theme === 'dark' ? 'translate-x-6 sm:translate-x-7 rotate-[360deg] bg-black' : 'translate-x-0 rotate-0 bg-white'
              }`}
            >
              {/* Light Mode Icon (f/2.8) */}
              <svg className={`absolute w-3 h-3 text-black transition-opacity duration-500 ease-in-out ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12,4 18.9,8 18.9,16 12,20 5.1,16 5.1,8" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="20.7" y1="7" x2="18.9" y2="8" />
                <line x1="20.7" y1="17" x2="18.9" y2="16" />
                <line x1="12" y1="22" x2="12" y2="20" />
                <line x1="3.3" y1="17" x2="5.1" y2="16" />
                <line x1="3.3" y1="7" x2="5.1" y2="8" />
              </svg>

              {/* Dark Mode Icon (f/8) */}
              <svg className={`absolute w-3 h-3 text-white transition-opacity duration-500 ease-in-out ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12,8 15.5,10 15.5,14 12,16 8.5,14 8.5,10" />
                <line x1="12" y1="2" x2="12" y2="8" />
                <line x1="20.5" y1="7" x2="15.5" y2="10" />
                <line x1="20.5" y1="17" x2="15.5" y2="14" />
                <line x1="12" y1="22" x2="12" y2="16" />
                <line x1="3.5" y1="17" x2="8.5" y2="14" />
                <line x1="3.5" y1="7" x2="8.5" y2="10" />
              </svg>
            </div>
          </button>
        </div>
      </header>

      {/* In-page Vimeo player: project clicks never leave the portfolio. */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/95 p-3 sm:p-5 lg:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeVideo}
          >
            <motion.div
              ref={playerShellRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Video player: ${activeVideo.title}`}
              className="video-player-shell bg-[#050505] text-white"
              style={{ width: 'min(94vw, 1100px, calc((100svh - 9rem) * 16 / 9))' }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex min-h-12 items-center justify-between gap-4 border-b border-white/15 px-3 py-3 sm:px-4">
                <p className="min-w-0 truncate font-mono text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.16em]">
                  {activeVideo.title}
                </p>
                <button
                  type="button"
                  onClick={closeVideo}
                  autoFocus
                  className="shrink-0 border border-white/30 px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Close video player"
                >
                  Close ×
                </button>
              </div>
              <div className="video-player-frame relative w-full aspect-video overflow-hidden bg-black shadow-2xl">
                <iframe
                  src={getVimeoEmbedUrl(activeVideo.link)}
                  title={activeVideo.title}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex min-h-14 flex-wrap items-center justify-between gap-2 border-t border-white/15 px-3 py-3 sm:px-4">
                <button
                  type="button"
                  onClick={closeVideo}
                  className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  ← Back to projects
                </button>
                <span className="hidden font-mono text-[9px] tracking-[0.18em] text-white/40 sm:inline">
                  {String(activeVideo.index + 1).padStart(2, '0')} / {String(activeVideo.playlist.length).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-3 sm:gap-5">
                  <button
                    type="button"
                    onClick={enterVideoFullscreen}
                    className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  >
                    Fullscreen
                  </button>
                  <button
                    type="button"
                    onClick={playNextVideo}
                    className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-white transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  >
                    Next video →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* === HOME VIEW === */}
        {activeView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* HERO SECTION */}
            <section className="site-frame hero-section relative w-full flex flex-col items-center justify-center">
              
              {/* Viewport-aware stage: contained on phones, tablets and ultra-wide screens. */}
              <div className="hero-stage w-[calc(100%_-_2rem)] sm:w-[94vw] max-w-[2200px] min-h-0 relative flex flex-col pointer-events-auto justify-center items-center">
                
                <div className="w-full min-h-0 flex-1 relative flex justify-center items-center overflow-hidden">
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={currentImageIndex}
                      src={HERO_IMAGES[currentImageIndex]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      // Increased transition duration to 2.5s for a much slower, softer dissolve
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                      className="absolute w-full h-full object-contain"
                      alt={`Cinematic still ${currentImageIndex + 1} of ${HERO_IMAGES.length}`}
                    />
                  </AnimatePresence>
                </div>

                <div className="w-full mt-4 sm:mt-6 lg:mt-8 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-4">
                   
                   {/* Left-aligned Previous Button */}
                   <button 
                     onClick={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
                     disabled={currentImageIndex === 0}
                     aria-label="Show previous image"
                     className={`font-mono text-[10px] md:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap disabled:opacity-25 disabled:cursor-not-allowed ${
                       theme === 'dark' ? 'text-neutral-400 enabled:hover:text-white' : 'text-neutral-500 enabled:hover:text-black'
                     }`}
                   >
                     <span className="text-[10px] md:text-xs mb-[2px]">←</span>
                     <span className="hidden sm:inline">PREV</span>
                   </button>

                   {/* Center-aligned Numbers */}
                   <div className="min-w-0 flex justify-center gap-1 sm:gap-2 md:gap-4 items-center">
                      {getPagination(currentImageIndex, HERO_IMAGES.length).map((page, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(page)}
                          aria-label={`Show image ${page + 1}`}
                          aria-current={page === currentImageIndex ? 'true' : undefined}
                          className={`hero-page-button font-mono text-sm md:text-base tracking-widest transition-colors duration-300 min-w-[24px] sm:min-w-[28px] text-center ${
                            page === currentImageIndex 
                              ? (theme === 'dark' ? 'text-white font-bold' : 'text-black font-bold') 
                              : (theme === 'dark' ? 'text-neutral-600 hover:text-white' : 'text-neutral-400 hover:text-black')
                          }`}
                        >
                          {page + 1}
                        </button>
                      ))}
                   </div>
                   
                   {/* Right-aligned Next Button */}
                   <button 
                     onClick={() => setCurrentImageIndex((prev) => Math.min(prev + 1, HERO_IMAGES.length - 1))}
                     disabled={currentImageIndex === HERO_IMAGES.length - 1}
                     aria-label="Show next image"
                     className={`font-mono text-[10px] md:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap disabled:opacity-25 disabled:cursor-not-allowed ${
                       theme === 'dark' ? 'text-neutral-400 enabled:hover:text-white' : 'text-neutral-500 enabled:hover:text-black'
                     }`}
                   >
                     <span className="hidden sm:inline">NEXT</span>
                     <span className="text-[10px] md:text-xs mb-[2px]">→</span>
                   </button>
                </div>
              </div>

              {/* Normal-flow positioning prevents overlap on short landscape screens. */}
              <div className="site-gutter hero-lower-nav w-full mt-8 sm:mt-10 flex justify-between items-end gap-4 pointer-events-none z-40">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAppLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: isAppLoaded ? 0.4 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="pointer-events-auto"
                  >
                    <div 
                        className="flex flex-col cursor-pointer group w-fit"
                        onClick={() => { setActiveView('narratives'); window.scrollTo(0,0); }}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`font-mono text-[clamp(13px,2vw,22px)] tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:translate-x-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>NARRATIVES</span>
                        </div>
                        <div className={`w-full h-[1px] mt-1 relative overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                           <div className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 ${theme === 'dark' ? 'bg-white/50' : 'bg-black/50'}`} />
                        </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAppLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: isAppLoaded ? 0.6 : 0, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="pointer-events-auto"
                  >
                     <div 
                        className="flex flex-col items-end cursor-pointer group w-fit"
                        onClick={() => { setActiveView('commercial'); window.scrollTo(0,0); }}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`font-mono text-[clamp(13px,2vw,22px)] tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:-translate-x-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>COMMERCIALS</span>
                        </div>
                        <div className={`w-full h-[1px] mt-1 relative overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                           <div className={`absolute inset-0 origin-right scale-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-x-100 ${theme === 'dark' ? 'bg-white/50' : 'bg-black/50'}`} />
                        </div>
                    </div>
                  </motion.div>
              </div>
            </section>

            <section ref={nextSectionRef} className="site-frame relative z-30 w-full pt-12 sm:pt-20 lg:pt-32">
              
              {/* ABOUT SECTION */}
              <div ref={aboutRef} className="site-gutter w-full pt-6 sm:pt-8 pb-16 sm:pb-20 lg:pb-24 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start">
                  <div className="lg:col-span-4 flex items-center gap-3 sm:gap-4">
                    <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                    <h2 className={`font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>About</h2>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="max-w-5xl space-y-5 sm:space-y-6 text-xl sm:text-2xl lg:text-[1.15rem] xl:text-[1.3rem] 2xl:text-[1.55rem] font-sans font-light leading-[1.45] tracking-wide">
                      <p>I’m Siddharth Srinivasan, a Mumbai-based cinematographer working across commercials and long-form.</p>
                      <p>My approach is grounded in strong composition, naturalistic light and a controlled visual language—creating images that feel cinematic without feeling overworked. I’m drawn to contrast, atmosphere and the small details that reveal something about a story’s world.</p>
                      <p>Whether shaping a precise visual language for a 30/45 second commercial or finding the rhythm of a feature or series, I work closely with directors to strengthen the idea while remaining open to the unexpected moments that emerge along the way.</p>
                      <p>I care deeply about the frame, but always in service of the story.</p>
                      <p>For me, good work begins with good people, strong ideas and a willingness to push both.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SELECTED WORKS GRID */}
              <div className="site-gutter w-full pb-20 sm:pb-28 lg:pb-32">
                <div className={`border-b pb-4 sm:pb-6 mb-10 sm:mb-14 lg:mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                  <h2 className={`font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Selected Work</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 sm:gap-y-20 lg:gap-y-32 gap-x-6 lg:gap-x-12">
                  {SELECTED_WORK.map((project, i) => (
                    <motion.button
                      key={project.id} 
                      type="button"
                      onClick={() => playVideo(project.link, project.title, SELECTED_VIDEO_PLAYLIST)}
                      aria-label={`Play ${project.title} on this page`}
                      className={`min-w-0 w-full flex flex-col text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current ${i % 2 !== 0 ? 'md:mt-20 lg:mt-32' : ''}`}
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <div className={`w-full aspect-video overflow-hidden mb-4 sm:mb-6 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                        <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-90" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-sans font-light tracking-wide leading-tight mb-2 break-words">{project.title}</h3>
                        <p className={`font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{project.type}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* === COMMERCIALS VIEW === */}
        {activeView === 'commercial' && (
          <motion.div
            key="commercial"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="site-frame site-gutter pt-28 sm:pt-32 lg:pt-40 min-h-[100svh] pb-20 sm:pb-28 lg:pb-32"
          >
            <div className={`border-b pb-4 sm:pb-6 mb-10 sm:mb-14 lg:mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <h2 className="font-mono text-xs tracking-[0.3em] uppercase opacity-50">COMMERCIALS</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-14 sm:gap-y-20 lg:gap-y-24 gap-x-5 md:gap-x-8 lg:gap-x-12">
              <AnimatePresence mode="popLayout">
                {COMMERCIAL_WORK.map((work) => (
                  <motion.button
                    key={work.id}
                    type="button"
                    onClick={() => playVideo(work.link, work.title, COMMERCIAL_VIDEO_PLAYLIST)}
                    aria-label={`Play ${work.title} on this page`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="min-w-0 w-full flex flex-col text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
                  >
                    <div className={`w-full aspect-video overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                       <img src={work.image} alt={work.title} loading="lazy" decoding="async" className="w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-90" />
                    </div>
                    <div className="min-w-0 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 lg:gap-4 mt-4 sm:mt-6">
                       <h3 className="min-w-0 text-lg sm:text-xl lg:text-2xl font-sans font-light tracking-wide leading-tight break-words">{work.title}</h3>
                       <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>{work.category}</span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* === NARRATIVES VIEW === */}
        {activeView === 'narratives' && (
          <motion.div
            key="narratives"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className={`site-frame site-gutter pt-28 sm:pt-32 lg:pt-40 min-h-[100svh] pb-20 sm:pb-28 lg:pb-32 relative z-30 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}
          >
            <div className={`border-b pb-4 sm:pb-6 mb-10 sm:mb-14 lg:mb-16 transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <h2 className="font-mono text-xs tracking-[0.3em] uppercase opacity-50">NARRATIVES</h2>
            </div>
            
            <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
              {NARRATIVE_WORK.map((work) => (
                 <motion.div
                    key={work.id}
                    className="min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start group"
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                 >
                    <div className={`relative lg:col-span-8 aspect-video overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                       <img src={work.poster} alt={work.title} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                       <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                       <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 z-10 flex gap-2 sm:gap-3">
                         {work.videos.map((video) => (
                           <button
                             key={video.label}
                             type="button"
                             onClick={() => playVideo(video.link, `${work.title} — ${video.label}`, NARRATIVE_VIDEO_PLAYLIST)}
                             aria-label={`Play ${work.title} ${video.label.toLowerCase()} on this page`}
                             className="min-w-0 flex-1 sm:flex-none flex items-center justify-between gap-4 border border-white/35 bg-black/55 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                           >
                             <span className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase">{video.label}</span>
                             <span aria-hidden="true" className="font-mono text-xs">▶</span>
                           </button>
                         ))}
                       </div>
                    </div>
                    <div className="lg:col-span-4 min-w-0 flex flex-col max-w-2xl lg:pt-2">
                       <h3 className="text-[clamp(1.75rem,3vw,4rem)] font-sans uppercase font-light tracking-tight leading-none mb-4 sm:mb-6 break-words">{work.title}</h3>
                       <p className={`font-mono text-xs md:text-sm tracking-wide leading-relaxed uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                         {work.info}
                       </p>
                    </div>
                 </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEAMLESS UNIFIED FOOTER BLOCK */}
      <div className={`relative z-40 w-full flex flex-col transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}>
        
        {/* TYPOGRAPHIC EDITORIAL FOOTER */}
        <footer ref={footerRef} className={`site-frame site-gutter relative w-full pt-20 sm:pt-24 lg:pt-32 pb-6 sm:pb-8 flex flex-col justify-between overflow-hidden transition-colors duration-1000 scroll-mt-20 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-10 sm:gap-12 xl:gap-6 mb-16 sm:mb-24 lg:mb-28 w-full">
              {activeView === 'home' && (
                <div className="sm:col-span-1 xl:col-span-3 min-w-0 flex flex-col">
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Profile</span>
                  <p className={`max-w-md font-mono text-[10px] md:text-xs tracking-[0.08em] sm:tracking-[0.1em] uppercase leading-relaxed xl:pr-6 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      Siddharth Srinivasan is a cinematographer crafting imagery that defies convention, working globally across commercial and narrative formats.
                  </p>
                </div>
              )}

              <div className={`${activeView === 'home' ? 'sm:col-span-1 xl:col-span-4' : 'sm:col-span-1 xl:col-span-5'} min-w-0 flex flex-col`}>
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Direct Inquiries</span>
                  <a href="mailto:hello@siddharth.com" className={`max-w-full text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-[1.1] break-words hover:italic transition-all duration-300 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>HELLO@SIDDHARTH.COM</a>
                  <a href="tel:+919876543210" className={`text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-none whitespace-nowrap hover:italic transition-all duration-300 mt-4 sm:mt-6 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>+91 98765 43210</a>
              </div>

              <div className={`${activeView === 'home' ? 'sm:col-span-1 xl:col-span-3' : 'sm:col-span-1 xl:col-span-4'} min-w-0 flex flex-col`}>
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Network</span>
                  <a href={VIMEO_PROFILE} target="_blank" rel="noopener noreferrer" className={`text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-[1.1] hover:italic transition-all duration-300 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>VIMEO</a>
                  <a href="#" className={`text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-none hover:italic transition-all duration-300 mt-4 sm:mt-6 ${theme === 'dark' ? 'hover:text-neutral-300' : 'hover:text-neutral-600'}`}>INSTAGRAM</a>
              </div>

              <div className={`${activeView === 'home' ? 'sm:col-span-1 xl:col-span-2' : 'sm:col-span-1 xl:col-span-3'} min-w-0 flex flex-col xl:items-end text-left xl:text-right`}>
                  <span className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>Base</span>
                  <p className="text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-[1.1]">MUMBAI</p>
                  <p className={`text-[clamp(1.15rem,2.25vw,2.5rem)] font-sans font-light uppercase leading-none mt-2 ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>INDIA</p>
                  <div className="mt-5 sm:mt-8 flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                     <span className={`font-mono text-[9px] tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Available Worldwide</span>
                  </div>
              </div>
           </div>

           <div className={`w-full flex justify-between items-end gap-6 border-t pt-6 sm:pt-8 pb-[env(safe-area-inset-bottom)] transition-colors duration-1000 ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'}`}>
               <div className="min-w-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                 <span className={`font-mono text-[9px] tracking-[0.3em] uppercase whitespace-nowrap ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>© {new Date().getFullYear()}</span>
                 <span className={`font-mono text-[9px] tracking-[0.16em] sm:tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'}`}>ALL RIGHTS RESERVED</span>
               </div>
               <h1 className={`footer-signature shrink-0 text-right font-sans font-light tracking-[0.04em] uppercase leading-none whitespace-nowrap ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>SIDDHARTH</h1>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
