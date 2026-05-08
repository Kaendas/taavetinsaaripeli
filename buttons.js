function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}
//kielien vaihtaminen on asia.textContent =gametext[gameState.language].asia;
const gameState = {
  points:0,
  totalmaximunpoints:0,
  language:'fi',
}

const gametext ={
  fi: {
    startButton:"Aloita",
    readbutton:"Luettu",
    header:"Metsäpolku",
    continuebutton:"Jatka",
    pistetexti:"Pisteet",
    suoritettu:"Suoritettu",
    introductionbutton:"Jatka",
    introduction:"Peli perustuu Taavetinsaaren metsäpolkuun, jossa pääset vastaamaan metsiin ja luontoon liittyviin kysymyksiin. \nPolussa on 10 erilaista pistettä, joissa voi olla useampi kysymys.",
    specification:"Ohjeet: \nJokaisella pisteellä saat kysymyksen, jossa on neljä vaihtoehtoa. Jokaisesta oikeasta vastauksesta saat pisteitä, jotka lasketaan yhteen pelin loputtua. Joissain kysymyksissä ei ole vääriä vastuksia.",
    credits:"Tekijät:\nRoope Lehkonen: Työnjohtaja, kertojan ääni\nElla: Graafinen suunnittelu\nPeetu Pohjanharju: Äänittäjä\nSara Karhu: Käännös ja bugitestaus\nVänni: Bugitestaus\nLauri Julku: Koodaus",
    endtext: "Kiitos että pelasitte, toivottavasti pelaatte uudestaan! Suorititte 10 tasoa",
    returnbutton:"Palaa alkuruutuun"
  },

  en:{
    startButton:"Begin",
    readbutton:"Read",
    header:"Game title",
    continuebutton:"Continue",
    pistetexti:"Points",
    suoritettu:"Completed",
    introductionbutton:"Continue",
    introduction:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    specification:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    credits:"Credits:\nRoope: Työnjohtaja\nElla: Graafinen suunnittelu\nPeetu: Äänittäjä\nSara: Käännös ja bugitestaus\nVänni: Bugitestaus\nLauri: Koodaus",
    endtext:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    returnbutton:"Return to the main menu"
  }

};
// Kuvien esilataus
const imagesToPreloadMobile = [
  'kuvat/kartta_1.png',
  'kuvat/kartta_2.png',
  'kuvat/kartta_3.png',
  'kuvat/kartta_4.png',
  'kuvat/kartta_5.png',
  'kuvat/kartta_6.png',
  'kuvat/kartta_7.png',
  'kuvat/kartta_8.png',
  'kuvat/kartta_9.png',
  'kuvat/kartta_10.png',
  'kuvat/serlachius-black.png',
  'kuvat/KysymysTausta3.png',
  'kertoja_FI.png',
  'kuvat/Kertoja_eng.png',
];
const imagesToPreloadDesktop =[
  'kuvat/kartta_1.png',
  'kuvat/kartta_2.png',
  'kuvat/kartta_3.png',
  'kuvat/kartta_4.png',
  'kuvat/kartta_5.png',
  'kuvat/kartta_6.png',
  'kuvat/kartta_7.png',
  'kuvat/kartta_8.png',
  'kuvat/kartta_9.png',
  'kuvat/kartta_10.png',
  'kuvat/KysymysTausta3.png',
  'kertoja_FI.png',
  'kuvat/Kertoja_eng.png',
];



//Pohja kysymyksille englanti ja suomi
//  questionSets:[
//    {
//  questiontext_fi: "Mitä metsä sinulle merkitsee?",
//  options_fi:[
//    "A. Rentoutumista ja hyvää oloa",
//     "B. Metsän antimia",
//     "C. Toimeentuloa ja vaurastumista",
//     "D. Metsä ei merkitse minulle mitään",
//   ],
//   oikein_fi:[0, 1, 2, 3 ],
//   questiontext_en: "Lorem ipsum",
//    options_en:[
//     "A. Lorem ipsum dolor sit amet",
//     "B. Lorem ipsum dolor sit amet",
//     "C. Lorem ipsum dolor sit amet",
//     "D. Lorem ipsum dolor sit amet",
//   ],
//   oikein_en:[0, 1, 2, 3 ],
// }
  // ],
const storyStages = [
  {
  text_fi: "Metsä on tiheästi kasvavien puiden ja monimuotoisen elinympäristön muodostama kokonaisuus.\n \nSe on koti tuhansille eläin-, kasvi- ja sienilajeille sekä tärkeä hiilinielu ja -varasto.\n \nMonelle metsä tarjoaa työtä ja toimeentuloa, toisille rauhoittumisen paikan ja hyvinvoinnin lähteen.\n \nSuomalaisista puhutaan metsäkansana ja monilla on metsään oma, ainutlaatuinen suhteensa.",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  questionSets:[
    {
  questiontext_fi: "Mitä metsä sinulle merkitsee?",
  options_fi:[
    "A. Rentoutumista ja hyvää oloa",
    "B. Metsän antimia",
    "C. Toimeentuloa ja vaurastumista",
    "D. Metsä ei merkitse minulle mitään",
  ],
  oikein_fi:[0, 1, 2, 3 ],
  questiontext_en: "Lorem ipsum",
   options_en:[
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
  ],
  oikein_en:[0, 1, 2, 3 ],
}
  ],
  minimap:'kuvat/kartta_1.png',
  audioSrc:'Kertoja1.mp3',
  audioSrc_en:'puhu1en.mp3',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsä muuttuu vuodenaikojen mukana: keväällä se herää kosteiden tuoksujen ja lintujen laulun myötä, kesällä metsä kasvaa ja kuhisee elämää.\n \nSyksyllä metsä hehkuu keltaisen ja punaisen sävyissä ja tarjoaa herkullista satoaan, kun taas talvella metsä peittyy lumeen ja rauhoittuu lepoon.\n \nPohdi metsän ääniä, tuoksuja ja värejä: milloin metsä on sinusta kauneimmillaan?",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  questionSets: [
  {
  questiontext_fi: "Mikä ääni on varma kevään merkki?",
  options_fi: [
  "A. Jäiden ritinä",
  "B. Tuulen ujellus",
  "C. Lintujen laulu"
  ],
  oikein_fi: [2],
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
  ],
  oikein_en: [2],
  },
  {
  questiontext_fi: "Mikä tuoksu on tyypillinen kesäisessä metsässä?",
  options_fi: [
  "A. Savun tuoksu",
  "B. Kukkien ja tuoreen kasvillisuuden tuoksu",
  "C. Kosteiden lehtien ja maan tuoksu"
  ],
  oikein_fi: [1],
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet1",
    "B. Lorem ipsum dolor sit amet1",
    "C. Lorem ipsum dolor sit amet1",
    "D. Lorem ipsum dolor sit amet1",
  ],
  oikein_en: [1],
  },
  {
  questiontext_fi: "Minkä värinen metsä on syksyisin?",
  options_fi: [
  "A. Keltaisen ja punaisen sävyinen",
  "B. Sinisen ja violetin sävyinen",
  "C. Harmaan ja valkoisen sävyinen"
  ],
  oikein_fi: [0],
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet2",
    "B. Lorem ipsum dolor sit amet2",
    "C. Lorem ipsum dolor sit amet2",
    "D. Lorem ipsum dolor sit amet2",
  ],
  oikein_en: [0],
  },
  {
  questiontext_fi: "Miten metsä muuttuu talvella?",
  options_fi: [
  "A. Se muuttuu vihreämmäksi",
  "B. Se kuhisee eläinten ääniä",
  "C. Se täyttyy kukista",
  "D. Se peittyy lumeen ja rauhoittuu"
  ],
  oikein_fi: [3],
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet3",
    "B. Lorem ipsum dolor sit amet3",
    "C. Lorem ipsum dolor sit amet3",
    "D. Lorem ipsum dolor sit amet3",
  ],
  oikein_en: [3],
  }
  ],
  minimap:'kuvat/kartta_2.png',
  audioSrc:'kertojatoinen.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "3vh" 
  },
 {
  text_fi: "Metsä rauhoittaa ja antaa uutta voimaa. Useat tutkimukset ovat osoittaneet, että jo pienikin metsässä vietetty aika saa sydämen sykkeen tasaantumaan ja mielen rauhoittumaan.\n \nMetsän hyvinvointivaikutukset voi saavuttaa usein tahdosta riippumatta, kun vain antautuu aistien vietäväksi. Luonnon kauneus, sen kiinnostavuus ja turvallisuus sekä puhdas ilmanlaatu ja hiljaisuus vaikuttavat sieltä saatuihin hyötyihin.\n \nMoni löytää metsästä oman lempipaikkansa: hyvän marjamättään, riistaseudun tai vaikkapa leposijan metsälammen rannalta.\n \nMikä on sinun lempipaikkasi metsässä? ",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  questionSets:[
{
  questiontext_fi: "Mitkä metsän ominaisuudet tukevat hyvinvointia?",
  options_fi:[
    "A. Kirkkaat valot ja musiikki",
    "B. Hiljaisuus, puhdas ilma ja kauneus",
    "C. Vilkas liikenne",
    "D. Kaupungin melu"
    
  ],
  oikein_fi:[1],
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
  ],
  oikein_en: [1],
}
  ],
  minimap:'kuvat/kartta_3.png',
  audioSrc:'Kertoja3.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "2.5vh"
 },
 {
  text_fi: "Asetu selin makuulle kalliolle tai sammalmatolle, katse kohti taivasta. Hengitä syvään ja anna hengityksen vähitellen tasaantua. Tunne maa koko kehosi alla.\n \nVoit ensin katsella mitä näet, sitten sulkea silmät ja kuunnella: veden ääntä, lintujen laulua, tuulen huminaa puissa. Miltä kädet ja iho tuntuvat – lämpimältä vai viileältä? Tyhjennä mieli ajatuksista, voit vaikka torkahtaa.\n \nHerättyäsi aisti olotilaasi: auttoiko luonto sinua rauhoittumaan?",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  questionSets: [
  {
  questiontext_fi: "Mikä seuraavista EI kuulu rentoutusharjoitukseen?",
  options_fi: [
  "A. Hengityksen tasaaminen ja maata vasten makaaminen",
  "B. Silmien sulkeminen ja luonnon äänten kuuntelu",
  "C. Puhelimen selaaminen ja musiikin kuuntelu kuulokkeista",
  "D. Mielen tyhjentäminen ja torkkuminen"
  ],
  oikein_fi: [2],
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
  ],
  oikein_en: [2],
}
  ],
  minimap:'kuvat/kartta_4.png',
  audioSrc:'Kertoja4.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "3vh"
 },
 {
  text_fi: "Metsällä on vahva asema suomalaisessa kulttuurissa ja taiteessa.\n \nKultakauden mestarit, kuten Akseli Gallen-Kallela, löysivät inspiraation erämaasta ja sen kauneudesta. Heidän teoksissaan korostuu luonnon monimuotoisuus ja rauha, mutta myös huoli metsien säilymisestä.\n \nNykytaiteessa metsä nähdään edelleen merkityksellisenä, se voi olla pakopaikka arjesta, symboli suomalaisuudesta tai kannanotto ympäristön tilaan.",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
questionSets: [
{
  questiontext_fi: "Miksi metsien säilyminen on ollut huolenaihe taiteessa?",
  options_fi: [
  "A. Koska metsät estävät rakentamista",
  "B. Koska metsät ovat olleet uhattuina ja niiden arvo halutaan säilyttää",
  "C. Koska metsät eivät liity kulttuuriin"
  ],
  oikein_fi: [1],
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
  ],
  oikein_en: [1],
  },
  {
  questiontext_fi: "Millaisen maiseman haluaisit jättää tuleville sukupolville?",
  options_fi: [
  "A. Luonnon monimuotoisen ja rauhallisen metsän",
  "B. Teollisuusalueen",
  "C. Autioituneen peltomaiseman",
  "D. Rakennetun kaupunkiympäristön"
  ],   
  oikein_fi: [0, 1, 2, 3],
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet1",
    "B. Lorem ipsum dolor sit amet1",
    "C. Lorem ipsum dolor sit amet1",
    "D. Lorem ipsum dolor sit amet1",
  ],
  oikein_en: [0, 1, 2, 3],
  }
  ],
  minimap:'kuvat/kartta_5.png',
  audioSrc:'Kertoja5.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "3vh"
 },
   {
  text_fi: "Kerää metsästä erilaisia lehtiä, oksia, käpyjä tai kiviä – valitse omat suosikkisi. Asettele ne taideteokseksi maahan tai kiven päälle, esittäväksi tai abstraktiksi teokseksi.\n \nJätä luomuksesi muiden ihailtavaksi ja ota itsellesi kuva muistoksi!",
  text_en: "Collect different leaves, branches, pine cones or rocks from a forest – choose your own favorites. Place them as a work of art to the ground or on a rock, as a representational or abstract work.\n \nLeave your creation for others to admire and take a photo for yourself as a memory! ",
    questionSets:[
{
  questiontext_fi: "Mikä seuraavista on hyvä vinkki luonnonmateriaalien keräämiseen?",
  options_fi:[
    "A. Kerää vain maasta löytyviä materiaaleja",
    "B. Älä vahingoita eläviä kasveja",
    "C. Vältä roskien tuomista luontoon",
    "D. Kaikki edellä mainitut"
  ],
  oikein_fi:[1],
  questiontext_en: "Which of the following is a good tip for collecting natural materials?",
  options_en: [
    "A. Only collect materials found on the ground",
    "B. Do not harm living plants",
    "C. Avoid bringing trash to the nature",
    "D. All of the above",
  ],
  oikein_en: [1],
}
  ],
  minimap:'kuvat/kartta_6.png',
  audioSrc:'Kertojakuusi.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsät ovat olleet Suomen vaurauden ja yhteiskunnan perusta.\n \nMäntän teollistuminen alkoi Serlachiuksen perustamasta tehtaasta vuonna 1868, ja paikkakunnasta tuli merkittävä talouden ja taiteen keskus. Tehtaan tunnetuin tuote on toiletti- eli vessapaperi, jonka Serlachius toi markkinoille 1900-luvun alussa.\n \nSerla on edelleen arjen välttämättömyys. Metsäteollisuus on muuttanut maisemaa, mutta tietoisuus ja kestävät puuteollisuuden ratkaisut kehittyvät jatkuvasti.\n \nMillainen rooli metsällä on sinun mielestäsi suomalaisuudessa?",
  text_en: "Forests have always been the basis of Finland’s prosperity and society.\n \nThe industrialization of Mänttä started with a factory founded by Serlachius in the year 1868, and the town became a significant center of economy and art. The factory’s most well-known product is toilet paper, which Serlachius introduced to the market at the beginning of the 1900s.\n \nSerla to this day is a necessity. The forest industry has changed the landscape, but the awareness and sustainable solutions of the wood industry are constantly changing.\n \nWhat kind of a role do you think a forest has in Finnishness?",
    questionSets:[
{
  questiontext_fi: "Miksi metsät ovat olleet Suomen vaurauden perusta?",
  options_fi:[
    "A. Ne tarjoavat raaka-aineita teollisuudelle",
    "B. Ne ovat matkailun vetonauloja",
    "C. Ne ovat ainoa energian lähde",
    "D. Ne tuottavat metallia"
  ],
  oikein_fi:[0],
  questiontext_en: "Why have forests been the basis of Finland’s prosperity?",
  options_en: [
    "A. They provide raw ingredients to industry",
    "B. They are the attraction to tourism",
    "C. They are the only source of energy",
    "D. They produce metal",
  ],
  oikein_en: [0],
},
{
  questiontext_fi: "Mikä on yksi kestävän metsäteollisuuden tavoite?",
  options_fi:[
    "A. Käyttää mahdollisimman paljon muovia",
    "B. Vähentää tietoisuutta ympäristöstä",
    "C. Kehittää ratkaisuja, jotka säästävät luontoa",
    "D. Lopettaa metsien käyttö kokonaan"
  ],
  oikein_fi:[2],
  questiontext_en: "What is one goal of a sustainable forest industry?",
  options_en: [
    "A. To use as much plastic as possible",
    "B. To reduce environmental awareness",
    "C. Develop solutions to save nature",
    "D. To stop using forests completely",
  ],
  oikein_en: [2],
}
  ],
  minimap:'kuvat/kartta_7.png',
  audioSrc:'Kertoja7.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "2.5vh"
  },
  {
  text_fi: "Oletko kokeillut istuttaa puuta?\n \nKeväällä voit poimia esimerkiksi tammenterhon ja laittaa sen vesilasiin. Kun se alkaa itää, siirrä versot maljakkoon ja myöhemmin istuta taimet maahan.\n \nKatso, kuinka siemenestä kasvaa uusi puu!",
  text_en: "Have you tried to plant a tree?\n \nIn spring, you can, for example, pick up an acorn and put it in a glass of water. When it starts to sprout, transfer the shoots to a vase and later, plant the seedling to the ground.\n \nWatch as the seed grows into a new tree!",
    questionSets:[
{
  questiontext_fi: "Miksi siemen kannattaa ensin laittaa veteen?",
  options_fi:[
    "A. Se näyttää kauniilta maljakossa",
    "B. Se auttaa siementä itämään ennen maahan istutusta",
    "C. Se estää siementä kuivumasta liikaa",
    "D. Se tekee siemenestä koristeen" 
  ],
  oikein_fi:[1],
  questiontext_en: "Why the seed should be put in a glass of water first?",
  options_en: [
    "A. It looks pretty in a vase",
    "B. It helps the seed to sprout before planting in the ground",
    "C. It prevents the seed from drying out too much",
    "D. It makes the seed into a decoration",
  ],
  oikein_en: [1],
}

  ],
  minimap:'kuvat/kartta_8.png',
  audioSrc:'Kertoja8.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsä on ollut aina satujen ja mielikuvituksen lähde sekä loputon leikkipaikka sammalmättäineen ja kannonkoloineen.\n \nTarinoissa siellä asuvat metsän eläimet, tontut ja keijut, ja myös puihin liittyy monia uskomuksia ja myyttejä, jotka ovat siirtyneet sukupolvelta toiselle. Kun katsot tarkasti, voit kuvitella juurien lomassa piilopaikkoja peikoille ja keijuille. Metsä on täynnä salaisuuksia.\n \nNäetkö ympärilläsi metsätontun tai keijun kotikolon?",
  text_en: "A forest has always been a source of fairy tales and imagination, as well as an endless playground, thanks to its mossy mounds and stump holes.\n \nIn fairy tales, forests are inhabitated by animals, elves and fairies, and trees are a subject to many myths and beliefs, which have been passed on from generation to generation. When you look closely, you can imagine hideaways for gnomes and fairies among the roots. The forest is full of secrets.\n \nDo you see a forest elf or the hideaway of a fairy?",
    questionSets:[
{
  questiontext_fi: "Minkälaisia olentoja suomalaisessa kansanperinteessä on uskottu asuvan metsässä?",
  options_fi:[
    "A. Tontut, keijut ja peikot",
    "B. Lohikäärmeet ja merihevoset",
    "C. Aaveet ja vampyyrit",
    "D. Ainoastaan eläimet"
  ],
  oikein_fi:[0],
  questiontext_en: "What kinds of creatures are believed to live in forests according to Finnish folklore?",
  options_en: [
    "A. Elves, fairies and trolls",
    "B. Dragons and Seahorses",
    "C. Ghosts and Vampires",
    "D. Only animals",
  ],
  oikein_en: [0],
}

  ],
  minimap:'kuvat/kartta_9.png',
  audioSrc:'Kertoja9.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "3vh"
  },
  {
  text_fi: "Etsi maasta käpy ja lisäksi pieniä oksia. Tee kävystä hahmo: työnnä tikut jaloiksi, lisää lehdet korviksi ja pieni oksa hännäksi.\n \nKeksi hahmollesi nimi ja tarina!",
    text_en: "Find a pine cone from the ground, along with some small twigs. Create a figure out of the pine cone: create legs from the twigs, add leaves as ears and a small twig for a tail.\n \nCome up with a name and a story for your figure!",
    questionSets:[
{
  questiontext_fi: "Mitä käpyhahmon tekeminen opettaa?",
  options_fi:[
    "A. Metsän ekologiaa ja kiertokulkua",
    "B. Luovuutta ja ongelmanratkaisua",
    "C. Käsityötaitoa ja materiaalien tunnistamista",
    "D. Kaikki edellä mainitut"
  ],
  oikein_fi: [0, 1, 2, 3],
  questiontext_en: "What does the creation of a pine cone figure teach you?",
  options_en: [
    "A. Forest ecology and circulation",
    "B. Creativity and problem solving",
    "C. Handcrafting and material identifying",
    "D. All of the above",
  ],
  oikein_en: [0, 1, 2, 3],
}
  ],
  minimap:'kuvat/kartta_10.png',
  audioSrc:'Kertoja10.mp3',
  audioSrc_en:'puhu1.mp3',
  fontSize: "3vh"
  }
];

const imagesToPreload = isMobile() ? imagesToPreloadMobile : imagesToPreloadDesktop;
const taustakuva = 'kuvat/tausta.png';

const startButton = document.querySelector('.startButton');
startButton.textContent = gametext[gameState.language].startButton;
const header = document.querySelector('header');
header.textContent = gametext[gameState.language].header;
const liputContainer = document.querySelector('.Flags');
suomiflag.style.display ='none';
const etusivulogo = document.querySelector('.etusivulogo')

//Kielien toiminnan logiika, painamalla tiettyä nappia vaihtaakielen
document.getElementById('suomiflag')?.addEventListener('click',() =>{
gameState.language = 'fi';
startButton.textContent = gametext[gameState.language].startButton;
header.textContent = gametext[gameState.language].header;
suomiflag.style.display ='none';
englantiflag.style.display ='inline-block';
})
document.getElementById('englantiflag')?.addEventListener('click',() =>{
gameState.language = 'en';
startButton.textContent = gametext[gameState.language].startButton;
header.textContent = gametext[gameState.language].header;
englantiflag.style.display ='none';
suomiflag.style.display ='inline-block';
})
const loadinscreen = document.createElement('div');
loadinscreen.textContent = 'ladataan';
loadinscreen.className = 'loadinscreen';
document.body.appendChild(loadinscreen);
function getImage(src, className) {
  const img = document.createElement('img');
  img.src = preloadimages[src] ? preloadimages[src].src : src;
  if (className) img.className = className;
  return img;
}
const preloadimages = {};
//aloitus nappi toiminta pois kunnes kaikki ladattuna
startButton.disabled = true;
let loadedCount = 0;

imagesToPreload.forEach(src => {
  const img = new Image();
  img.onload = () => {
    loadedCount++;
    if (loadedCount === imagesToPreload.length) {
      loadinscreen.remove();
      startButton.disabled = false;
    }
  };
  img.onerror = () => {
    loadedCount++;
    if (loadedCount === imagesToPreload.length) {
      loadinscreen.remove();
      startButton.disabled = false;
    }
  };
  img.src = src;
  preloadimages[src] = img;
});

// Pelin toiminta, eli logiikkaa tästä eteenpäin

function showStage(index) {
  document.body.innerHTML = '';

  // Näytä loppuruutu pelin päättyessä
  if (!storyStages[index]) {
    showEndScreen();
    return;
  }
let nykyisentasonpisteet =0;
  const stage = storyStages[index];
 document.body.style.backgroundImage = `url('kuvat/tausta.png')`;
  // Tarinateksti
  const textDiv = document.createElement('div');
  textDiv.textContent = stage.text;
  textDiv.className = 'tarinateksti';
  document.body.appendChild(textDiv);
 textDiv.textContent = stage[`text_${gameState.language}`];
 if (stage.fontSize) {
  textDiv.style.fontSize = stage.fontSize;
 }
const narrator = getImage(
  gameState.language === 'fi' ? 'kertoja_FI.png' : 'kuvat/Kertoja_eng.png',
  'narrator'
);
const narration = new Audio(stage[`audioSrc_${gameState.language}`] || stage.audioSrc);

narrator.addEventListener('click', () => {
    if (narration.paused) {
    narration.play().catch(() => {});
  } else {
    narration.pause();
    narration.currentTime = 0;
  }
})
document.body.appendChild(narrator);
const readbutton = document.createElement('button');
  readbutton.textContent =gametext[gameState.language].readbutton;
  readbutton.className = 'readbutton';
  document.body.appendChild(readbutton);
            readbutton.disabled =true;
     setTimeout(() => {
   readbutton.disabled = false;
  }, 500);
  readbutton.addEventListener('click', () => {
  narration.pause();
  narration.currentTime = 0;
  narrator.remove();
    readbutton.remove();
  textDiv.remove();
  let currentquestionpoints = 0;
  function showQuestion() {
  const maxStagePisteet = stage.questionSets.length * 10;
  
  if (!document.querySelector('.pointscounter')) {
    const pointsCounter = document.createElement('div');
    
    pointsCounter.className = 'pointscounter';
    pointsCounter.textContent = `${gametext[gameState.language].pistetexti}: ${gameState.points}/${gameState.totalmaximunpoints + (stage.questionSets.length * 10)}`;
    document.body.appendChild(pointsCounter);
  }
  if (currentquestionpoints >= stage.questionSets.length){
  
    showRewardScreen(stage, index);
    return;
  }
  //kysymys osio
  function rightorwrong(text, iscorrect){
    const correctornot = document.createElement('div');
    correctornot.className = `correctornot ${iscorrect ? 'correct':'wrong'}`;
    correctornot.textContent =text;
    document.body.appendChild(correctornot)
      setTimeout(() => {
    correctornot.remove();
  }, 1700);
  }
  const currentquestion = stage.questionSets[currentquestionpoints];
  document.body.style.backgroundImage = `url('kuvat/KysymysTausta3.png')`;
  const questiontext = document.createElement('div');
  questiontext.textContent = currentquestion[`questiontext_${gameState.language}`];
  questiontext.className ='questiontext';
  document.body.appendChild(questiontext)

    const questioncontainer = document.createElement("div");
  questioncontainer.className ="questioncontainer";
  currentquestion[`options_${gameState.language}`].forEach((options, optionsIndex) => {

 
  const question = document.createElement("button");
  question.textContent = options;
  question.className = "question";

  question.onclick = () => {
  
   if (currentquestion[`oikein_${gameState.language}`] && currentquestion[`oikein_${gameState.language}`].includes(optionsIndex)) {
    nykyisentasonpisteet += 10; 
    gameState.points += 10;

    const counter = document.querySelector('.pointscounter');
    if (counter) {
  counter.textContent = `${gametext[gameState.language].pistetexti}: ${gameState.points}/${gameState.totalmaximunpoints + (stage.questionSets.length * 10)}`;
   // kysymykset, tarkistaa kun klikkaa kohtaa vastaukset löytyy siittä teksti pläjästä toilla ylhäällä kun joku niistä painaa niin tulee oikea vastaus, jos ei nii väärin
}
    rightorwrong(
      gameState.language === 'en' ? '+10 Points':'+10 Pistettä',
      true
    );
    } else {
      rightorwrong(
      gameState.language === 'en' ? '+0 Points':'+0 Pistettä',
      false
      );
    }
  document.querySelectorAll('.questiontext').forEach(btn => btn.remove());
  document.querySelectorAll('.question').forEach(btn => btn.remove());
   document.querySelectorAll('.questioncontainer').forEach(btn => btn.remove());
   
 currentquestionpoints++;
  showQuestion();
  };
  document.body.appendChild(questioncontainer);
  questioncontainer.appendChild(question);

});

}
showQuestion();
  });
//reward screen
function showRewardScreen(stage, currentIndex) {
gameState.totalmaximunpoints += stage.questionSets.length * 10;
document.querySelector('.pointscounter')?.remove();
const pointscontainer = document.createElement('div');
pointscontainer.className = 'pointscontainer';
const minimap = getImage(stage.minimap, 'map');
document.body.appendChild(minimap);

//Pisteet
const pointsamoungt = document.createElement('div');
pointsamoungt.className ='pointsamoungt'
pointsamoungt.style.textTransform = 'none';
const maxStagePisteet = stage.questionSets.length * 10;
pointsamoungt.textContent =`${gametext[gameState.language].pistetexti}: ${gameState.points}/${gameState.totalmaximunpoints}`;
pointscontainer.appendChild(pointsamoungt);

document.body.appendChild(pointscontainer);


      // Jatka-nappi
      const continuebutton = document.createElement('button');
      continuebutton.textContent =gametext[gameState.language].continuebutton;
      continuebutton.className = 'continuebutton';
      document.body.appendChild(continuebutton);
      continuebutton.disabled =true;
     setTimeout(() => {
   continuebutton.disabled = false;
  }, 500);
          continuebutton.addEventListener('click', () => {
        
    
      
          continuebutton.remove();
          pointscontainer.remove()
          minimap.remove();
          showStage(currentIndex + 1);
        });

}
}
function showEndScreen() {
  document.body.innerHTML = '';
  const endcontainer = document.createElement("div");
  endcontainer.className = "endcontainer";

// Loppuruutu
const endtext = document.createElement("div");
  endtext.textContent = gametext[gameState.language].endtext;
  endtext.className = "endtext";
  const finalpoints = document.createElement("div");
  finalpoints.className = "finalpoints";
  finalpoints.textContent = `${gametext[gameState.language].pistetexti}: ${gameState.points}`;

  const credits = document.createElement("div");
  credits.textContent =gametext[gameState.language].credits;
  credits.className = "creditstext";
  endcontainer.appendChild(endtext);
  endcontainer.appendChild(credits);
  endcontainer.appendChild(finalpoints)
  document.body.appendChild(endcontainer);

  const returnbutton = document.createElement("button");
  returnbutton.textContent = gametext[gameState.language].returnbutton;
  returnbutton.className = "returnbutton";
  document.body.appendChild(returnbutton);
  returnbutton.addEventListener('click', () => location.reload());
}
// Johdanto ja Start-nappi
startButton.addEventListener('click', () => {
  if (header) header.remove();
  if (startButton) startButton.remove();
  if (liputContainer) liputContainer.remove();
  if (etusivulogo) etusivulogo.remove();

  // Johdanto
  const introductioncontainer = document.createElement("div");
  introductioncontainer.className = "introductioncontainer";
  const introduction = document.createElement("div");
  introduction.className = "introduction";
  introduction.textContent =gametext[gameState.language].introduction;
  // pelin ohjeet
  const specification = document.createElement("div");
  specification.textContent =gametext[gameState.language].specification;
  specification.className = "specification";
  introductioncontainer.appendChild(introduction);
  introductioncontainer.appendChild(specification);
  document.body.appendChild(introductioncontainer);

 const introductionreturn = document.createElement("button");
  introductionreturn.textContent = gametext[gameState.language].returnbutton;
  introductionreturn.className = "introductionreturn";
  document.body.appendChild(introductionreturn);
  introductionreturn.addEventListener('click', () => location.reload());


  const introductionbutton = document.createElement("button");
  introductionbutton.textContent =gametext[gameState.language].introductionbutton;
  introductionbutton.className = "introductionbutton";
  document.body.appendChild(introductionbutton);

  introductionbutton.addEventListener('click', () => {
    if (specification) specification.remove();
    if (introduction) introduction.remove();
    if (introductioncontainer) introductioncontainer.remove();
    if (introductionbutton) introductionbutton.remove();
    if (introductionreturn) introductionreturn.remove();
     
    showStage(0);
    const backgroundaudio = new Audio('Luontoäänet/Linnunlauluja.mp4')
    backgroundaudio.volume = 0.2;
    backgroundaudio.loop =true;
    backgroundaudio.play();
  });
;
})
