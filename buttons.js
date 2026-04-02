function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}
//copyright kaikki oikeudet hiisille 2024
// miksi 2024 eikä 2025?
//miksi 2025 eikä 2026???
//kielien vaihtaminen on asia.textContent =gametext[language].asia;
// 
let pisteet =0;
let language = 'fi';
const gametext ={
  fi: {
    startButton:"Aloita",
    luettunappi:"Luettu",
    header:"Metsäpolku",
    jatka:"Jatka",
    pistetexti:"Pisteet",
    suoritettu:"Suoritettu",
    johdnatonappi:"Jatka",
    johdanto:"pelinjohdanotähä",
    ohjeet:"Pelin ohjeet: Ohjeiden teksti tähän.",
    credits:"Tekijät:\nRoope: Työnjohtaja\nElla: Graafinen suunnittelu\nPeetu: Äänittäjä\nSara: Käännös ja bugitestaus\nVänni: Bugitestaus\nLauri: Koodaus",
    lopputeksti: "Kiitos että pelasitte, toivottavasti pelaatte uudestaan! Suorititte 10 tasoa",
    alkuruudunpalausnappi:"Palaa alkuruutuun"
  },

  en:{
    startButton:"Aloita enkuks",
    luettunappi:"luettuen",
    header:"Metsäpolku enkuksi",
    jatka:"jatka enkuks",
    pistetexti:"pisteeten",
    suoritettu:"Suoritettuen",
    johdnatonappi:"Jatkaen",
    johdanto:"pelinjohdanotähä enkuks",
    ohjeet:"Pelin ohjeet: Ohjeiden teksti tähän enkuks.",
    credits:"Tekijätenkuks:\nRoope: Työnjohtaja\nElla: Graafinen suunnittelu\nPeetu: Äänittäjä\nSara: Käännös ja bugitestaus\nVänni: Bugitestaus\nLauri: Koodaus",
    lopputeksti:"Kiitos että pelasitte, toivottavasti pelaatte uudestaan! Suorititte 10 tasoa",
    alkuruudunpalausnappi:"Palaa alkuruutuunen"
  }
  //sitten kun tarvitaan lisätä ruotsin kieli niin jätän tän iha varulta 
  //ru:{
  //startButton:"Aloita",
  //luettunappi:"luettu",
  //header:"Metsäpolku",
  //jatka:"jatka",
  //pistetexti:"pisteet",
  //suoritettu:"Suoritettu",
  //johdnatonappi:"aloita",
  //johdanto:"pelinjohdanotähä",
  //ohjeet:"Pelin ohjeet: Ohjeiden teksti tähän.",
  //credits:"Tekijät:\nRoope: Työnjohtaja\nElla: Graafinen suunnittelu\nPeetu: Äänittäjä\nSara: Käännös ja bugitestaus\nVänni: Bugitestaus\nLauri: Koodaus",
  //lopputeksti: "Kiitos että pelasitte, toivottavasti pelaatte uudestaan! T:Hiisi. Pisteet:" 
  //alkuruudunpalausnappi:"Palaa alkuruutuunen"
};
// tässä on /kuvat koska se on se kansio
// jos joku haluaa lisätä kuvia tai vaihtaa nii pistäkkee oikeesee kansioo muuten ei toimi//
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
  'Hiisi 1.png',
  'Hiisi 2.png',
  'Hiisi 3.png',
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
  'Hiisi 1.png',
  'Hiisi 2.png',
  'Hiisi 3.png',
  'testi.png',
  'testi2.png',
  'testi3.png',
];

// nöin mää sain kuvan vaihtamisen toimimaan elkää kysykö miten toimii 
function createCyclingAudioImage(images,audioSrc, alt="vaihtokuva") {
  let idx =0;
  const hissi = document.createElement('img');
  hissi.src = images[idx]
    hissi.alt = alt;
  hissi.className = 'puhuminen';
// tää ihme koodi jotenkin lopettaa kuvien vaihtamisen kun ääni loppuu
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
if (!audio.paused){  //äänen pausaus kun clikkaa kun ääni on päällä
  audio.pause();
  stopCycling();
} else {
  //aloitaa äänen pyörittämisen kun ei ole päällä
   audio.play().catch(() => {});
   startCycling();
}

    
  });
 audio.addEventListener('ended', stopCycling);
   hissi.audio = audio;
  return hissi;
}
// Todo: muistutus ittelleni VAIHA NE HEMMETIN TIATOKONE KUVAT SITTEN KU ON TARVE
// nvm ei sittenkää//
//jos haluaa lisätä asioita joka vaihtelee per stage nii src pitää olla: "asianimi.src = stage.asianimi;" esimerkiksi 
// line breakin voi lisätä \n//
// kielien vaihtaminen  asia.textContent = stage[`asia_${language}`];
//husse leipoo
const storyStages = [
  {
  text_fi: "Metsä on tiheästi kasvavien puiden ja monimuotoisen elinympäristön muodostama kokonaisuus.\n Se on koti tuhansille eläin-, kasvi- ja sienilajeille sekä tärkeä hiilinielu ja -varasto.\n Monelle metsä tarjoaa työtä ja toimeentuloa, toisille rauhoittumisen paikan ja hyvinvoinnin lähteen.\n Suomalaisista puhutaan metsäkansana ja monilla on metsään oma, ainutlaatuinen suhteensa.",
  text_en: "english version here",
  questionSets:[
    {
  questiontext_fi: "Mitä metsä sinulle merkitsee?",
  options:[
    "A. Rentoutumista ja hyvää oloa",
    "B. Metsän antimia",
    "C. Toimeentuloa ja vaurastumista",
    "D. Metsä ei merkitse minulle mitään",
  ],
  oikein:[0, 1, 2, 3 ],
}
  ],
  rewardText: " ",
  rewardText_en:"englanti test",
  rewardImage: 'kuvat/Sieni.png',
  minimap:'kuvat/kartta_1.png',
  audioSrc:'puhu1.mp3',
  audioSrc_en:'puhu1en.mp3',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsä muuttuu vuodenaikojen mukana: keväällä se herää kosteiden tuoksujen ja lintujen laulun myötä, kesällä metsä kasvaa ja kuhisee elämää.\n Syksyllä metsä hehkuu keltaisen ja punaisen sävyissä ja tarjoaa herkullista satoaan, kun taas talvella metsä peittyy lumeen ja rauhoittuu lepoon.\n Pohdi metsän ääniä, tuoksuja ja värejä: milloin metsä on sinusta kauneimmillaan?",
  text_en: "english 2 version here",
  questionSets: [
  {
  questiontext_fi: "Mikä ääni on varma kevään merkki?",
  options: [
  "A. Jäiden ritinä",
  "B. Tuulen ujellus",
  "C. Lintujen laulu"
  ],
  oikein: [2]
  },
  {
  questiontext_fi: "Mikä tuoksu on tyypillinen kesäisessä metsässä?",
  options: [
  "A. Savun tuoksu",
  "B. Kukkien ja tuoreen kasvillisuuden tuoksu",
  "C. Kosteiden lehtien ja maan tuoksu"
  ],
  oikein: [1]
  },
  {
  questiontext_fi: "Minkä värinen metsä on syksyisin?",
  options: [
  "A. Keltaisen ja punaisen sävyinen",
  "B. Sinisen ja violetin sävyinen",
  "C. Harmaan ja valkoisen sävyinen"
  ],
  oikein: [0]
  },
  {
  questiontext_fi: "Miten metsä muuttuu talvella?",
  options: [
  "A. Se muuttuu vihreämmäksi",
  "B. Se kuhisee eläinten ääniä",
  "C. Se täyttyy kukista",
  "D. Se peittyy lumeen ja rauhoittuu"
  ],
  oikein: [3]
  }
  ],
  rewardText: "Löysit soppakauhan!",
  rewardText_en:"englani test",
  rewardImage: 'kuvat/Soppakauha.png',
  minimap:'kuvat/kartta_2.png',
  audioSrc:'puhu2.mp3',
  fontSize: "3vh" 
  },
 {
  text_fi: "Metsä rauhoittaa ja antaa uutta voimaa. Useat tutkimukset ovat osoittaneet, että jo pienikin metsässä vietetty aika saa sydämen sykkeen tasaantumaan ja mielen rauhoittumaan.\n Metsän hyvinvointivaikutukset voi saavuttaa usein tahdosta riippumatta, kun vain antautuu aistien vietäväksi. Luonnon kauneus, sen kiinnostavuus ja turvallisuus sekä puhdas ilmanlaatu ja hiljaisuus vaikuttavat sieltä saatuihin hyötyihin. \n Moni löytää metsästä oman lempipaikkansa: hyvän marjamättään, riistaseudun tai vaikkapa leposijan metsälammen rannalta.\n Mikä on sinun lempipaikkasi metsässä? ",
  text_en: "english 3 version here",
  questionSets:[
{
  questiontext_fi: "Mitkä metsän ominaisuudet tukevat hyvinvointia?",
  options:[
    "A. Kirkkaat valot ja musiikki",
    "B. Hiljaisuus, puhdas ilma ja kauneus",
    "C. Vilkas liikenne",
    "D. Kaupungin melu"
    
  ],
  oikein:[1,],
}
  ],
  rewardText: "Löysit kynttelikön",
  rewardText_en:"englani 3 test",
  
  rewardImage: 'kuvat/kynttelikkö.png',
  minimap:'kuvat/kartta_3.png',
  fontSize: "2.5vh"
 },
 {
  text_fi: "Asetu selin makuulle kalliolle tai sammalmatolle, katse kohti taivasta. Hengitä syvään ja anna hengityksen vähitellen tasaantua. Tunne maa koko kehosi alla.\n Voit ensin katsella mitä näet, sitten sulkea silmät ja kuunnella: veden ääntä, lintujen laulua, tuulen huminaa puissa. Miltä kädet ja iho tuntuvat – lämpimältä vai viileältä? Tyhjennä mieli ajatuksista, voit vaikka torkahtaa. \n Herättyäsi aisti olotilaasi: auttoiko luonto sinua rauhoittumaan?",
  text_en: "english 4 version here",
  questionSets: [
  {
  questiontext_fi: "Mikä seuraavista EI kuulu rentoutusharjoitukseen?",
  options: [
  "A. Hengityksen tasaaminen ja maata vasten makaaminen",
  "B. Silmien sulkeminen ja luonnon äänten kuuntelu",
  "C. Puhelimen selaaminen ja musiikin kuuntelu kuulokkeista",
  "D. Mielen tyhjentäminen ja torkkuminen"
  ],
  oikein: [2]
}
  ],
  rewardText: "Löysit metsätontun",
  rewardText_en:"englani 4 test",
  rewardImage: 'kuvat/Metsatonttu.png',
  minimap:'kuvat/kartta_4.png',
  fontSize: "3vh"
 },
 {
  text_fi: "Metsällä on vahva asema suomalaisessa kulttuurissa ja taiteessa. Kultakauden mestarit, kuten Akseli Gallen-Kallela, löysivät inspiraation erämaasta ja sen kauneudesta. Heidän teoksissaan korostuu luonnon monimuotoisuus ja rauha, mutta myös huoli metsien säilymisestä.\n Nykytaiteessa metsä nähdään edelleen merkityksellisenä, se voi olla pakopaikka arjesta, symboli suomalaisuudesta tai kannanotto ympäristön tilaan.",
  text_en: "english 5 version here",
questionSets: [
{
  questiontext_fi: "Miksi metsien säilyminen on ollut huolenaihe taiteessa?",
  options: [
  "A. Koska metsät estävät rakentamista",
  "B. Koska metsät ovat olleet uhattuina ja niiden arvo halutaan säilyttää",
  "C. Koska metsät eivät liity kulttuuriin"
  ],
  oikein: [1]
  },
  {
  questiontext_fi: "Millaisen maiseman haluaisit jättää tuleville sukupolville?",
  options: [
  "A. Luonnon monimuotoisen ja rauhallisen metsän",
  "B. Teollisuusalueen",
  "C. Autioituneen peltomaiseman",
  "D. Rakennetun kaupunkiympäristön"
  ],   
  oikein: [0, 1, 2, 3]
  }
  ],
  rewardText: "Löysit pensselin",
  rewardText_en:"englani 5 test",

  rewardImage: 'kuvat/Penseli.png',
  minimap:'kuvat/kartta_5.png',
  fontSize: "3vh"
 },
 //serlacihus on skibidi sigma #serlachius!!!!!!!!
   {
  text_fi: "Kerää metsästä erilaisia lehtiä, oksia, käpyjä tai kiviä – valitse omat suosikkisi. Asettele ne taideteokseksi maahan tai kiven päälle, esittäväksi tai abstraktiksi teokseksi. \n Jätä luomuksesi muiden ihailtavaksi ja ota itsellesi kuva muistoksi!",
  text_en: "english 6 version here",
    questionSets:[
{
  questiontext_fi: "Mikä seuraavista on hyvä vinkki luonnonmateriaalien keräämiseen?",
  options:[
    "A. Kerää vain maasta löytyviä materiaaleja",
    "B. Älä vahingoita eläviä kasveja",
    "C. Vältä roskien tuomista luontoon",
    "D. Kaikki edellä mainitut"
  ],
  oikein:[1,],
}
  ],
  
  rewardText: "Löysit taikakirjan",
  rewardText_en:"englani 6 test",
  rewardImage: "kuvat/Taikakirja.png",
  minimap:'kuvat/kartta_6.png',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsät ovat olleet Suomen vaurauden ja yhteiskunnan perusta.\n Mäntän teollistuminen alkoi Serlachiuksen perustamasta tehtaasta vuonna 1868, ja paikkakunnasta tuli merkittävä talouden ja taiteen keskus. Tehtaan tunnetuin tuote on toiletti- eli vessapaperi, jonka Serlachius toi markkinoille 1900-luvun alussa.\n Serla on edelleen arjen välttämättömyys. Metsäteollisuus on muuttanut maisemaa, mutta tietoisuus ja kestävät puuteollisuuden ratkaisut kehittyvät jatkuvasti.\n Millainen rooli metsällä on sinun mielestäsi suomalaisuudessa?",
  text_en: "english 7 version here",
    questionSets:[
{
  questiontext_fi: "Miksi metsät ovat olleet Suomen vaurauden perusta?",
  options:[
    "A. Ne tarjoavat raaka-aineita teollisuudelle",
    "B. Ne ovat matkailun vetonauloja",
    "C. Ne ovat ainoa energian lähde",
    "D. Ne tuottavat metallia"
  ],
  oikein:[0],
},
{
  questiontext_fi: "Mikä on yksi kestävän metsäteollisuuden tavoite?",
  options:[
    "A. Käyttää mahdollisimman paljon muovia",
    "B. Vähentää tietoisuutta ympäristöstä",
    "C. Kehittää ratkaisuja, jotka säästävät luontoa",
    "D. Lopettaa metsien käyttö kokonaan"
  ],
  oikein:[2],
}
  ],
  rewardText: " ",
  rewardText_en:"englani 7 test",
  rewardImage: "kuvat/poron_valjaat.png",
  minimap:'kuvat/kartta_7.png',
  fontSize: "3vh"
  },
  {
  text_fi: "Oletko kokeillut istuttaa puuta?\n Keväällä voit poimia esimerkiksi tammenterhon ja laittaa sen vesilasiin. Kun se alkaa itää, siirrä versot maljakkoon ja myöhemmin istuta taimet maahan.\n Katso, kuinka siemenestä kasvaa uusi puu! ",
  text_en: "english 8 version here",
    questionSets:[
{
  questiontext_fi: "Miksi siemen kannattaa ensin laittaa veteen?",
  options:[
    "A. Se näyttää kauniilta maljakossa",
    "B. Se auttaa siementä itämään ennen maahan istutusta",
    "C. Se estää siementä kuivumasta liikaa",
    "D. Se tekee siemenestä koristeen" 
  ],
  oikein:[1],
}

  ],
  rewardText: "Löysit poron",
  rewardText_en:"englani 8 test",
  rewardImage: "kuvat/PORO.png",
  minimap:'kuvat/kartta_8.png',
  fontSize: "3vh"
  },
  {
  text_fi: "Metsä on ollut aina satujen ja mielikuvituksen lähde sekä loputon leikkipaikka sammalmättäineen ja kannonkoloineen.\n Tarinoissa siellä asuvat metsän eläimet, tontut ja keijut, ja myös puihin liittyy monia uskomuksia ja myyttejä, jotka ovat siirtyneet sukupolvelta toiselle. Kun katsot tarkasti, voit kuvitella juurien lomassa piilopaikkoja peikoille ja keijuille. Metsä on täynnä salaisuuksia. Näetkö ympärilläsi metsätontun tai keijun kotikolon",
  text_en: "english 9 version here",
    questionSets:[
{
  questiontext_fi: "Minkälaisia olentoja suomalaisessa kansanperinteessä on uskottu asuvan metsässä?",
  options:[
    "A. Tontut, keijut ja peikot",
    "B. Lohikäärmeet ja merihevoset",
    "C. Aaveet ja vampyyrit",
    "D. Ainoastaan eläimet"
  ],
  oikein:[0],
}

  ],
  rewardText: "Löysit avaimen",
  rewardText_en:"englani 9 test",
  rewardImage: "kuvat/Avain.png",
  minimap:'kuvat/kartta_9.png',
  fontSize: "3vh"
  },
  {
  text_fi: "Etsi maasta käpy ja lisäksi pieniä oksia. Tee kävystä hahmo: työnnä tikut jaloiksi, lisää lehdet korviksi ja pieni oksa hännäksi. Keksi hahmollesi nimi ja tarina!",
    text_en: "english 10 version here",
    questionSets:[
{
  questiontext_fi: "Mitä käpyhahmon tekeminen opettaa?",
  options:[
    "A. Metsän ekologiaa ja kiertokulkua",
    "B. Luovuutta ja ongelmanratkaisua",
    "C. Käsityötaitoa ja materiaalien tunnistamista",
    "D. Kaikki edellä mainitut"
  ],
  oikein: [0, 1, 2, 3]
}
  ],  
  rewardText: "Löysit taika kävyn",
  rewardText_en:"englani 10 test",
  rewardImage: "kuvat/Taikakäpy.png",
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

//kielien vaihtaminen 
// sitten kun jos pitää lisätä ruotti kielinen versio niin htlm pitää muistaa lisätä se sinne
//sen ID on "ruotsilippu"
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
//poistaa aloitus napin toiminnasta kunnes peli kuvat on ladanneet
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

// pelin toiminta
// periaateessa tästä eteenpäin on pelin logiikka
// siinä on esimerkiksi tarina teksti, kuvat, palkinnot ja jne

function showStage(index) {
  document.body.innerHTML = '';

  // näytää pelin loppu ruudun kun kentät loppuu
  if (!storyStages[index]) {
    showEndScreen();
    return;
  }

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
  // Tarinakuva
  //const img = document.createElement('img');
  //img.className = 'tarina';
  //img.src = isMobile() ? stage.imageMobile : stage.imageDesktop;
  //document.body.appendChild(img);//  
// kuvan vaihtaminen toimii jotengin emmää tierä
// hiisi jumppa osa 4 milloin//
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
    //tää kattoo onko hiisi puhumassa jotta voidaan pausata kun clikaa
    if (cyclingWidget.audio && !cyclingWidget.audio.paused) {
  cyclingWidget.audio.pause();
}
//serlachius käski suoritettu helevettii nii piti poistaa
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
  if (currentQuestionIndex >= stage.questionSets.length){
    showRewardScreen(stage, index);
    return;
  }
  function oikeinvaivaarin(text, iscorrect){
    const oikeintaivaarin = document.createElement('div');
    oikeintaivaarin.className = `oikeintaivaarin ${iscorrect ? 'correct':'wrong'}`;
    oikeintaivaarin.textContent =text;
    document.body.appendChild(oikeintaivaarin)
      setTimeout(() => {
    oikeintaivaarin.remove();
  }, 900);
  }
  const currentQ = stage.questionSets[currentQuestionIndex];
  document.body.style.backgroundImage = `url('KysymysTausta3.png')`;
   console.log("Current question object:", currentQ);
  console.log("Question text:", currentQ.questiontext);
  const questiontext = document.createElement('div');
  questiontext.textContent = currentQ[`questiontext_${language}`];
  questiontext.className ='questiontext';
  document.body.appendChild(questiontext)
    const kysymyscontainer = document.createElement("div");
  kysymyscontainer.className ="kysymyscontainer";
  currentQ.options.forEach((options, optionsIndex) => {

  
  const kysymys = document.createElement("button");
  kysymys.textContent = options;
  kysymys.className = "kysymys";

  kysymys.onclick = () => {
    if (currentQ.oikein && currentQ.oikein.includes(optionsIndex)) {
      pisteet += 10;
      oikeinvaivaarin(
      language === 'en' ? 'Correct!':'Oikein!',
      true
    );
    } else {
      oikeinvaivaarin(
      language === 'en' ? 'Incorrect!':'väärin',
      false
      );
    }
    console.log("Score", pisteet)
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
const palkintopistetekstit = document.createElement('div');
palkintopistetekstit.className = 'palkintopistetekstit';
// pyyrä ellalta tekevän puhelin resoluutio version //
// palkinnon teksti
  const minimap = document.createElement('img');
  minimap.className ='kartta';
  if (stage.minimap) {
    minimap.src = stage.minimap;
   }
document.body.appendChild(minimap);
//const rewardText = document.createElement('div');
//rewardText.textContent = stage[`rewardText_${language}`] || stage.rewardText;
//rewardText.className = 'palkintoteksti';
//palkintopistetekstit.appendChild(rewardText);
//pisteet
const pistemäärä = document.createElement('div');
pistemäärä.className ='pisteet'
pistemäärä.style.textTransform = 'none';
pistemäärä.textContent = `${gametext[language].pistetexti}: ${pisteet}`;
console.log(gametext[language].pistetexti);
palkintopistetekstit.appendChild(pistemäärä);
// ryhmitän tekstin jotta css olisi siistimpi
document.body.appendChild(palkintopistetekstit);
//e


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
// tässä ajattelin päivänä 7.9 kello 16:27 "että varmaa pitäis lisätä kommentteja"
// sitten tajusi oon ainoa joka koodaa projectia 
// roope on mukava :)
// turpakii roope
// täsäs on pelin loppu ruutu//
const lopputeksti = document.createElement("div");
  lopputeksti.textContent = gametext[language].lopputeksti;
  lopputeksti.className = "lopputeksti";
  //lopu piste
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
// start nappi ja johdanto
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
    // Äänieffectien looppaus
    //ois tarkoitus että olisi yksi ääni efecti taustalla pyörimässä
  });
});

