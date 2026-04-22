function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}
//kielien vaihtaminen on asia.textContent =gametext[language].asia;
// 
let pisteet =0;
let totalmaximunpoints = 0;
let language = 'fi';
const gametext ={
  fi: {
    startButton:"Aloita",
    luettunappi:"Luettu",
    header:"Metsäpolku",
    jatka:"Jatka",
    pistetexti:"Pisteet",
    lisäyspisteet:"+10 pistettä",
    suoritettu:"Suoritettu",
    johdnatonappi:"Jatka",
    johdanto:"Peli perustuu Taavetinsaaren metsäpolkuun, jossa pääset vastaamaan metsiin ja luontoon liittyviin kysymyksiin. \nPolussa on 10 erilaista pistettä, joissa voi olla useampi kysymys.",
    ohjeet:"Ohjeet: \nJokaisella pisteellä saat kysymyksen, jossa on neljä vaihtoehtoa. Jokaisesta oikeasta vastauksesta saat pisteitä, jotka lasketaan yhteen pelin loputtua. Joissain kysymyksissä ei ole vääriä vastuksia.",
    credits:"Tekijät:\nRoope: Työnjohtaja\nElla: Graafinen suunnittelu\nPeetu: Äänittäjä\nSara: Käännös ja bugitestaus\nVänni: Bugitestaus\nLauri: Koodaus",
    lopputeksti: "Kiitos että pelasitte, toivottavasti pelaatte uudestaan! Suorititte 10 tasoa",
    alkuruudunpalausnappi:"Palaa alkuruutuun"
  },

  en:{
    startButton:"Begin",
    luettunappi:"Read",
    header:"Game title",
    jatka:"Continue",
    pistetexti:"Points",
    lisäyspisteet:"+10 points",
    suoritettu:"Completed",
    johdnatonappi:"Continue",
    johdanto:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ohjeet:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    credits:"Credits:\nRoope: Työnjohtaja\nElla: Graafinen suunnittelu\nPeetu: Äänittäjä\nSara: Käännös ja bugitestaus\nVänni: Bugitestaus\nLauri: Koodaus",
    lopputeksti:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    alkuruudunpalausnappi:"Return to the main menu"
  }

};
// Kuvien esilataus
const imagesToPreloadMobile = [
  'KysymysTausta.png',
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
  'KysymysTausta3.png',
  'testi.png',
  'testi2.png',
  'testi3.png',
];
const imagesToPreloadDesktop =[
  'KysymysTausta.png',
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
  'KysymysTausta3.png',
  'testi.png',
  'testi2.png',
  'testi3.png',
];

// Kuvan vaihtaminen
function createCyclingAudioImage(images,audioSrc, alt="vaihtokuva") {
  let idx =0;
  const hissi = document.createElement('img');
  hissi.src = images[idx]
    hissi.alt = alt;
  hissi.className = 'puhuminen';
  //Päätä kuvan vaihtaminen kun äänitiedosto saavuttaa lopun
  const audio = new Audio(audioSrc);
  audio.preload = 'auto';
let cyclingInterval = null;
function startCycling() {
  if (cyclingInterval) return;
  cyclingInterval =setInterval(() => {
          idx = (idx + 1) % images.length;
      hissi.src = images[idx];
  },300);
}
  function stopCycling() {
    clearInterval(cyclingInterval);
    cyclingInterval = null;
    idx = 0;
    hissi.src = images[idx]; 
  }
 
  hissi.addEventListener('click', () => {
if (!audio.paused){ 
  audio.pause();
  stopCycling();
} else {
   audio.play().catch(() => {});
   startCycling();
}

    
  });
 audio.addEventListener('ended', stopCycling);
   hissi.audio = audio;
  return hissi;
}
//Pohja kysymyksille
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
  text_fi: "Metsä on tiheästi kasvavien puiden ja monimuotoisen elinympäristön muodostama kokonaisuus.\n Se on koti tuhansille eläin-, kasvi- ja sienilajeille sekä tärkeä hiilinielu ja -varasto.\n Monelle metsä tarjoaa työtä ja toimeentuloa, toisille rauhoittumisen paikan ja hyvinvoinnin lähteen.\n Suomalaisista puhutaan metsäkansana ja monilla on metsään oma, ainutlaatuinen suhteensa.",
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
  audioSrc:'puhu1.mp3',
  audioSrc_en:'puhu1en.mp3',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsä muuttuu vuodenaikojen mukana: keväällä se herää kosteiden tuoksujen ja lintujen laulun myötä, kesällä metsä kasvaa ja kuhisee elämää.\n Syksyllä metsä hehkuu keltaisen ja punaisen sävyissä ja tarjoaa herkullista satoaan, kun taas talvella metsä peittyy lumeen ja rauhoittuu lepoon.\n Pohdi metsän ääniä, tuoksuja ja värejä: milloin metsä on sinusta kauneimmillaan?",
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
  audioSrc:'puhu2.mp3',
  fontSize: "3vh" 
  },
 {
  text_fi: "Metsä rauhoittaa ja antaa uutta voimaa. Useat tutkimukset ovat osoittaneet, että jo pienikin metsässä vietetty aika saa sydämen sykkeen tasaantumaan ja mielen rauhoittumaan.\n Metsän hyvinvointivaikutukset voi saavuttaa usein tahdosta riippumatta, kun vain antautuu aistien vietäväksi. Luonnon kauneus, sen kiinnostavuus ja turvallisuus sekä puhdas ilmanlaatu ja hiljaisuus vaikuttavat sieltä saatuihin hyötyihin. \n Moni löytää metsästä oman lempipaikkansa: hyvän marjamättään, riistaseudun tai vaikkapa leposijan metsälammen rannalta.\n Mikä on sinun lempipaikkasi metsässä? ",
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
  fontSize: "2.5vh"
 },
 {
  text_fi: "Asetu selin makuulle kalliolle tai sammalmatolle, katse kohti taivasta. Hengitä syvään ja anna hengityksen vähitellen tasaantua. Tunne maa koko kehosi alla.\n Voit ensin katsella mitä näet, sitten sulkea silmät ja kuunnella: veden ääntä, lintujen laulua, tuulen huminaa puissa. Miltä kädet ja iho tuntuvat – lämpimältä vai viileältä? Tyhjennä mieli ajatuksista, voit vaikka torkahtaa. \n Herättyäsi aisti olotilaasi: auttoiko luonto sinua rauhoittumaan?",
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
  fontSize: "3vh"
 },
 {
  text_fi: "Metsällä on vahva asema suomalaisessa kulttuurissa ja taiteessa. \n Kultakauden mestarit, kuten Akseli Gallen-Kallela, löysivät inspiraation erämaasta ja sen kauneudesta. Heidän teoksissaan korostuu luonnon monimuotoisuus ja rauha, mutta myös huoli metsien säilymisestä.\n Nykytaiteessa metsä nähdään edelleen merkityksellisenä, se voi olla pakopaikka arjesta, symboli suomalaisuudesta tai kannanotto ympäristön tilaan.",
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
  fontSize: "3vh"
 },
   {
  text_fi: "Kerää metsästä erilaisia lehtiä, oksia, käpyjä tai kiviä – valitse omat suosikkisi. Asettele ne taideteokseksi maahan tai kiven päälle, esittäväksi tai abstraktiksi teokseksi. \n Jätä luomuksesi muiden ihailtavaksi ja ota itsellesi kuva muistoksi!",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
  minimap:'kuvat/kartta_6.png',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsät ovat olleet Suomen vaurauden ja yhteiskunnan perusta.\n Mäntän teollistuminen alkoi Serlachiuksen perustamasta tehtaasta vuonna 1868, ja paikkakunnasta tuli merkittävä talouden ja taiteen keskus. Tehtaan tunnetuin tuote on toiletti- eli vessapaperi, jonka Serlachius toi markkinoille 1900-luvun alussa.\n Serla on edelleen arjen välttämättömyys. Metsäteollisuus on muuttanut maisemaa, mutta tietoisuus ja kestävät puuteollisuuden ratkaisut kehittyvät jatkuvasti.\n Millainen rooli metsällä on sinun mielestäsi suomalaisuudessa?",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
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
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet1",
    "B. Lorem ipsum dolor sit amet1",
    "C. Lorem ipsum dolor sit amet1",
    "D. Lorem ipsum dolor sit amet1",
  ],
  oikein_en: [2],
}
  ],
  minimap:'kuvat/kartta_7.png',
  fontSize: "3vh"
  },
  {
  text_fi: "Oletko kokeillut istuttaa puuta?\n Keväällä voit poimia esimerkiksi tammenterhon ja laittaa sen vesilasiin. Kun se alkaa itää, siirrä versot maljakkoon ja myöhemmin istuta taimet maahan.\n Katso, kuinka siemenestä kasvaa uusi puu! ",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
  minimap:'kuvat/kartta_8.png',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsä on ollut aina satujen ja mielikuvituksen lähde sekä loputon leikkipaikka sammalmättäineen ja kannonkoloineen.\n Tarinoissa siellä asuvat metsän eläimet, tontut ja keijut, ja myös puihin liittyy monia uskomuksia ja myyttejä, jotka ovat siirtyneet sukupolvelta toiselle. Kun katsot tarkasti, voit kuvitella juurien lomassa piilopaikkoja peikoille ja keijuille. Metsä on täynnä salaisuuksia. Näetkö ympärilläsi metsätontun tai keijun kotikolon",
  text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
  ],
  oikein_en: [0],
}

  ],
  minimap:'kuvat/kartta_9.png',
  fontSize: "3vh"
  },
  {
  text_fi: "Etsi maasta käpy ja lisäksi pieniä oksia. Tee kävystä hahmo: työnnä tikut jaloiksi, lisää lehdet korviksi ja pieni oksa hännäksi. Keksi hahmollesi nimi ja tarina!",
    text_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
  questiontext_en: "Lorem ipsum",
  options_en: [
    "A. Lorem ipsum dolor sit amet",
    "B. Lorem ipsum dolor sit amet",
    "C. Lorem ipsum dolor sit amet",
    "D. Lorem ipsum dolor sit amet",
  ],
  oikein_en: [0, 1, 2, 3],
}
  ],
  minimap:'kuvat/kartta_10.png',
  fontSize: "3vh"
  }
];

const imagesToPreload = isMobile() ? imagesToPreloadMobile : imagesToPreloadDesktop;
const taustakuva = isMobile() ? 'tausta.png' : 'tausta.png';
document.body.style.backgroundImage = `url('${taustakuva}')`;
const startButton = document.querySelector('.startButton');
startButton.textContent = gametext[language].startButton;
const header = document.querySelector('header');
header.textContent = gametext[language].header;
const liputContainer = document.querySelector('.liput');
suomilippu.style.display ='none';
const etusivulogo = document.querySelector('.etusivulogo')

//Kielien 
document.getElementById('suomilippu')?.addEventListener('click', () => testFlag('Suomi'));
document.getElementById('suomilippu')?.addEventListener('click',() =>{
language = 'fi';
startButton.textContent = gametext[language].startButton;
header.textContent = gametext[language].header;
suomilippu.style.display ='none';
englantilippu.style.display ='inline-block';
})
document.getElementById('englantilippu')?.addEventListener('click', () => testFlag('Englanti'));
document.getElementById('englantilippu')?.addEventListener('click',() =>{
language = 'en';
startButton.textContent = gametext[language].startButton;
header.textContent = gametext[language].header;
englantilippu.style.display ='none';
suomilippu.style.display ='inline-block';
})
const latausruutu = document.createElement('div');
latausruutu.textContent = 'ladataan';
latausruutu.className = 'latausruutu';
document.body.appendChild(latausruutu);


const preloadimages = {};
//Aloitusnapin käytettävyyden poisto kunnes kuvat ovat ladanneet
startButton.disabled = true;
let loadedCount = 0;
imagesToPreload.forEach(src => {
  const img = new Image();
  img.onload = () => {
    loadedCount++;
    if (loadedCount === imagesToPreload.length) {
      latausruutu.remove();
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
 document.body.style.backgroundImage = `url('tausta.png')`;
  // Tarinateksti
  const textDiv = document.createElement('div');
  textDiv.textContent = stage.text;
  textDiv.className = 'tarinateksti';
  document.body.appendChild(textDiv);
 textDiv.textContent = stage[`text_${language}`];
 if (stage.fontSize) {
  textDiv.style.fontSize = stage.fontSize;
 }

  const cyclingWidget = createCyclingAudioImage(
    [
      preloadimages['testi.png'].src,
      preloadimages['testi2.png'].src,
      preloadimages['testi3.png'].src,
    ], 
     stage[`audioSrc_${language}`] || stage.audioSrc || 'puhu1.mp3',
   language === 'en' ? 'Hiisi talking' : 'Hiisi puhuu'
  );
  document.body.appendChild(cyclingWidget);
    if (cyclingWidget.audio && !cyclingWidget.audio.paused) {
  cyclingWidget.audio.pause();
}
const luettunappi = document.createElement('button');
  luettunappi.textContent =gametext[language].luettunappi;
  luettunappi.className = 'luettunappi';
  document.body.appendChild(luettunappi);
            luettunappi.disabled =true;
     setTimeout(() => {
   luettunappi.disabled = false;
  }, 500);
  luettunappi.addEventListener('click', () => {
    luettunappi.remove();
  textDiv.remove();
    if (cyclingWidget?.audio) {
    cyclingWidget.audio.pause();
    cyclingWidget.audio.currentTime = 0;
  }
  cyclingWidget.remove();
  let currentQuestionIndex = 0;
  function showQuestion() {
  const maxStagePisteet = stage.questionSets.length * 10;
  
  if (!document.querySelector('.pointscounter')) {
    const pointsCounter = document.createElement('div');
    
    pointsCounter.className = 'pointscounter';
    pointsCounter.textContent = `${gametext[language].pistetexti}: ${pisteet}/${totalmaximunpoints + (stage.questionSets.length * 10)}`;
    document.body.appendChild(pointsCounter);
  }
  if (currentQuestionIndex >= stage.questionSets.length){
     document.querySelectorAll('.lisäyspisteet').forEach(el => el.remove());
    showRewardScreen(stage, index);
    return;
  }
  //kysymys osio
  function oikeinvaivaarin(text, iscorrect){
    const oikeintaivaarin = document.createElement('div');
    oikeintaivaarin.className = `oikeintaivaarin ${iscorrect ? 'correct':'wrong'}`;
    oikeintaivaarin.textContent =text;
    document.body.appendChild(oikeintaivaarin)
      setTimeout(() => {
    oikeintaivaarin.remove();
  }, 1000);
  }
  const currentQ = stage.questionSets[currentQuestionIndex];
  document.body.style.backgroundImage = `url('KysymysTausta3.png')`;
  const questiontext = document.createElement('div');
  questiontext.textContent = currentQ[`questiontext_${language}`];
  questiontext.className ='questiontext';
  document.body.appendChild(questiontext)

    const kysymyscontainer = document.createElement("div");
  kysymyscontainer.className ="kysymyscontainer";
  currentQ[`options_${language}`].forEach((options, optionsIndex) => {

  // kysymykset, tarkistaa kun klikkaa kohtaa vastaukset löytyy siittä teksti pläjästä toilla ylhäällä kun joku niistä painaa niin tulee oikea vastaus, jos ei nii väärin
  const kysymys = document.createElement("button");
  kysymys.textContent = options;
  kysymys.className = "kysymys";

  kysymys.onclick = () => {
  
   if (currentQ[`oikein_${language}`] && currentQ[`oikein_${language}`].includes(optionsIndex)) {
    nykyisentasonpisteet += 10; 
    pisteet += 10;
      // Create and animate the counter
    const lisäyspisteet = document.createElement('div');
    const pointsCounter = document.querySelector('.pointscounter');
    pointsCounter.classList.add('hidden-during-bonus');

setTimeout(() => {
  pointsCounter.classList.remove('hidden-during-bonus');
}, 600);
    lisäyspisteet.className = 'lisäyspisteet';
    lisäyspisteet.textContent = `${gametext[language].lisäyspisteet} `;
    document.body.appendChild(lisäyspisteet);
    
    const counter = document.querySelector('.pointscounter');
    if (counter) {
  counter.textContent = `${gametext[language].pistetexti}: ${pisteet}/${totalmaximunpoints + (stage.questionSets.length * 10)}`;
}

    
    oikeinvaivaarin(
      language === 'en' ? 'Correct!':'Oikein!',
      true
      
    );
    if (currentQuestionIndex + 1 < stage.questionSets.length) {
      setTimeout(() => {
    if (lisäyspisteet.parentNode) lisäyspisteet.remove();
  }, 600);
}
    } else {
      oikeinvaivaarin(
      language === 'en' ? 'Incorrect!':'Väärin!',
      false
      );
    }

  document.querySelectorAll('.questiontext').forEach(btn => btn.remove());
  document.querySelectorAll('.kysymys').forEach(btn => btn.remove());
   document.querySelectorAll('.kysymyscontainer').forEach(btn => btn.remove());
   
 currentQuestionIndex++;
  showQuestion();
  };
  document.body.appendChild(kysymyscontainer);
  kysymyscontainer.appendChild(kysymys);

});

}
showQuestion();
  });

function showRewardScreen(stage, currentIndex) {
totalmaximunpoints += stage.questionSets.length * 10;
document.querySelector('.pointscounter')?.remove();
const palkintopistetekstit = document.createElement('div');
palkintopistetekstit.className = 'palkintopistetekstit';

  const minimap = document.createElement('img');
  minimap.className ='kartta';
  if (stage.minimap) {
    minimap.src = stage.minimap;
   }
document.body.appendChild(minimap);

//Pisteet
const pistemäärä = document.createElement('div');
pistemäärä.className ='pisteet'
pistemäärä.style.textTransform = 'none';
const maxStagePisteet = stage.questionSets.length * 10;
pistemäärä.textContent =`${gametext[language].pistetexti}: ${pisteet}/${totalmaximunpoints}`;
console.log(gametext[language].pistetexti);
palkintopistetekstit.appendChild(pistemäärä);

document.body.appendChild(palkintopistetekstit);


      // Jatka-nappi
      const jatka = document.createElement('button');
      jatka.textContent =gametext[language].jatka;
      jatka.className = 'jatkanappi';
      document.body.appendChild(jatka);
      jatka.disabled =true;
     setTimeout(() => {
   jatka.disabled = false;
  }, 500);
          jatka.addEventListener('click', () => {
        
    
      
          jatka.remove();
          palkintopistetekstit.remove()
          minimap.remove();
          showStage(currentIndex + 1);
        });

}
}
function showEndScreen() {
  document.body.innerHTML = '';
  const loppulaatikko = document.createElement("div");
  loppulaatikko.className = "loppulaatikko";

// Loppuruutu
const lopputeksti = document.createElement("div");
  lopputeksti.textContent = gametext[language].lopputeksti;
  lopputeksti.className = "lopputeksti";
  const finaalipisteet = document.createElement("div");
  finaalipisteet.className = "finaalipisteet";
  finaalipisteet.textContent = `${gametext[language].pistetexti}: ${pisteet}`;

  const credits = document.createElement("div");
  credits.textContent =gametext[language].credits;
  credits.className = "creditsteksti";
  loppulaatikko.appendChild(lopputeksti);
  loppulaatikko.appendChild(credits);
  loppulaatikko.appendChild(finaalipisteet)
  document.body.appendChild(loppulaatikko);

  const alkuruudunpalausnappi = document.createElement("button");
  alkuruudunpalausnappi.textContent = gametext[language].alkuruudunpalausnappi;
  alkuruudunpalausnappi.className = "alkuruudunpalausnappi";
  document.body.appendChild(alkuruudunpalausnappi);
  alkuruudunpalausnappi.addEventListener('click', () => location.reload());
}
// Johdanto ja Start-nappi
startButton.addEventListener('click', () => {
  if (header) header.remove();
  if (startButton) startButton.remove();
  if (liputContainer) liputContainer.remove();
  if (etusivulogo) etusivulogo.remove();

  // Johdanto
  const johdantovalikko = document.createElement("div");
  johdantovalikko.className = "johdantovalikko";
  const johdanto = document.createElement("div");
  johdanto.className = "johdanto";
  johdanto.textContent =gametext[language].johdanto;
  // pelin ohjeet
  const ohjeet = document.createElement("div");
  ohjeet.textContent =gametext[language].ohjeet;
  ohjeet.className = "ohjeet";
  johdantovalikko.appendChild(johdanto);
  johdantovalikko.appendChild(ohjeet);
  document.body.appendChild(johdantovalikko);




  const johdnatonappi = document.createElement("button");
  johdnatonappi.textContent =gametext[language].johdnatonappi;
  johdnatonappi.className = "johdantonappi";
  document.body.appendChild(johdnatonappi);

  johdnatonappi.addEventListener('click', () => {
    if (ohjeet) ohjeet.remove();
    if (johdanto) johdanto.remove();
    if (johdantovalikko) johdantovalikko.remove();
    if (johdnatonappi) johdnatonappi.remove();
    
     
    showStage(0);
    //Äänen toisto
  });
;
})
