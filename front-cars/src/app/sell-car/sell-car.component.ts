import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../car.service';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-sell-car',
  templateUrl: './sell-car.component.html',
  styleUrls: ['./sell-car.component.css']
})
export class SellCarComponent implements OnInit {
  car: Car = {
    tipo: '',
    marca: '',
    modelo: '',
    ano: 0,
    cor: '',
    preco: 0,
    img: ''
  };

  veiculosTipos: string[] = ["Carro", "Moto", "Caminhão", "Ônibus", "Van"];
  marcas: string[] = [];
  modelos: string[] = [];
  coresCarros: string[] = ["Preto", "Branco", "Prata", "Cinza", "Vermelho", "Azul", "Verde", "Amarelo"];
  imageUrl: string | ArrayBuffer | null = null;
  selectedFileName: string | null = null;

  commonVehicles: { [key: string]: { [key: string]: string[] } } = {
    "Carro": {
      "Toyota": ["Corolla", "Camry", "RAV4", "Hilux", "Yaris", "Avalon", "Supra", "Land Cruiser", "Prado", "C-HR", "Highlander", "Fortuner", "Sequoia", "4Runner", "Sienna"],
      "Volkswagen": ["Golf", "Passat", "Tiguan", "Jetta", "Polo", "Touareg", "Beetle", "Arteon", "Atlas", "T-Cross", "ID.4", "ID.3", "Up!", "Amarok", "Scirocco"],
      "Ford": ["Fiesta", "Focus", "Mustang", "Explorer", "F-150", "Escape", "Edge", "Bronco", "Ranger", "Expedition", "Fusion", "EcoSport", "Maverick", "Taurus", "Mustang Mach-E"],
      "Chevrolet": ["Cruze", "Malibu", "Equinox", "Silverado", "Tahoe", "Suburban", "Blazer", "Trailblazer", "Traverse", "Colorado", "Camaro", "Impala", "Bolt", "Spark", "Sonic"],
      "Honda": ["Civic", "Accord", "CR-V", "Fit", "HR-V", "Pilot", "Odyssey", "Passport", "Ridgeline", "Insight", "Clarity", "Prelude", "Element", "S2000", "Crosstour"],
      "Nissan": ["Altima", "Sentra", "Rogue", "Frontier", "Versa", "Maxima", "Murano", "Pathfinder", "Armada", "Juke", "Kicks", "Titan", "Xterra", "GT-R", "370Z"],
      "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Palisade", "Veloster", "Venue", "Ioniq", "Accent", "Genesis", "Azera", "Nexo", "Creta", "Bayon"],
      "Kia": ["Rio", "Soul", "Sportage", "Sorento", "Optima", "Stinger", "Seltos", "Telluride", "Niro", "Picanto", "Cadenza", "Carnival", "K5", "Cerato", "Mohave"],
      "BMW": ["3 Series", "5 Series", "X3", "X5", "7 Series", "X1", "X2", "X4", "X6", "8 Series", "2 Series", "4 Series", "i3", "i8", "M3"],
      "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "A-Class", "B-Class", "GLA", "GLS", "G-Class", "CLA", "CLS", "EQC", "SL", "SLC"]
    },
    "Moto": {
      "Honda": ["CB500", "CBR600RR", "Africa Twin", "CRF450R", "Gold Wing", "CBR1000RR", "Shadow Phantom", "Rebel 500", "XR650L", "Fury", "CB300R", "CTX700", "Grom", "NC750X", "ADV150", "Biz", "CB300", "CG150"],
      "Yamaha": ["YZF-R1", "MT-07", "Ténéré 700", "FZ-09", "Vmax", "YZF-R6", "MT-09", "XSR900", "Tracer 900", "Super Ténéré", "Bolt", "FJR1300", "XT250", "TW200", "YZ250F"],
      "Suzuki": ["GSX-R1000", "Hayabusa", "V-Strom 650", "Boulevard M109R", "DR-Z400", "SV650", "GSX-S750", "Burgman 400", "RM-Z450", "Intruder 150", "GSX250R", "Katana", "V-Strom 1000", "Gixxer SF 250", "DR650S"],
      "Kawasaki": ["Ninja ZX-10R", "Z900", "Versys 650", "Vulcan S", "KLX250", "Ninja 400", "Z650", "W800", "Concours 14", "KX450", "KLR650", "Ninja H2", "Z125 Pro", "Z1000", "Versys-X 300"],
      "Harley-Davidson": ["Street Glide", "Sportster", "Road King", "Softail", "Iron 883", "Road Glide", "Fat Boy", "Heritage Classic", "Low Rider", "Street Bob", "Fat Bob", "Breakout", "Ultra Limited", "LiveWire", "CVO Street Glide"],
      "Ducati": ["Panigale V4", "Monster 821", "Multistrada 950", "Scrambler", "Diavel", "Hypermotard 950", "SuperSport", "Streetfighter V4", "XDiavel", "1299 Panigale", "V2", "Monster 1200", "Multistrada V4", "DesertX", "Panigale V2"],
      "Triumph": ["Bonneville", "Street Triple", "Tiger 800", "Rocket 3", "Speed Twin", "Thruxton", "Scrambler 1200", "Tiger 1200", "Daytona Moto2", "Speed Triple", "Bobber", "Explorer", "Sprint", "Tiger Sport", "Trophy"],
      "BMW": ["S1000RR", "R1250GS", "F850GS", "K1600GT", "R nineT", "F750GS", "G310R", "G310GS", "R1200RT", "S1000XR", "R1200R", "C400X", "C650GT", "K1600B", "R18"],
      "KTM": ["Duke 390", "1290 Super Duke", "690 Enduro", "790 Adventure", "RC 390", "450 SX-F", "250 SX", "790 Duke", "890 Adventure", "690 SMC R", "125 Duke", "500 EXC-F", "350 EXC-F", "1290 Super Adventure", "250 Duke"],
      "Aprilia": ["RSV4", "Tuono V4", "Shiver 900", "Dorsoduro 900", "SRV 850", "RS 660", "Tuono 660", "Caponord 1200", "Mana 850", "SX 125", "RX 125", "Scarabeo 200", "Pegaso 650", "Mojito 150", "ETV 1000"]
    },
    "Caminhão": {
      "Volvo": ["FH", "FM", "FMX", "FE", "VNL", "VNR", "VNX", "VHD", "FL", "FLC", "VN", "NH", "N10", "G11", "G12"],
      "Scania": ["R Series", "S Series", "G Series", "P Series", "L Series", "XT", "K Series", "F Series", "N Series", "4 Series", "T Series", "S730", "R450", "R500", "R580"],
      "Mercedes-Benz": ["Actros", "Arocs", "Atego", "Axor", "Econic", "Unimog", "Zetros", "Antos", "Citan", "Sprinter", "Vario", "SK", "NG", "LPS", "LPK"],
      "MAN": ["TGX", "TGS", "TGM", "TGL", "TGE", "F2000", "L2000", "M2000", "TGA", "CLA", "LE", "ME", "SLW", "F8", "G90"],
      "Iveco": ["Stralis", "Trakker", "Eurocargo", "Daily", "S-Way", "Magirus", "PowerStar", "TurboStar", "EuroStar", "TurboTech", "Massif", "Vertis", "Tector", "Cursor", "Zeta"],
      "DAF": ["XF", "CF", "LF", "CF Electric", "XF Super Space Cab", "95XF", "85CF", "75CF", "65CF", "55CF", "45CF", "FAT CF", "FAN CF", "FAS CF", "FA LF"],
      "Freightliner": ["Cascadia", "M2 106", "Coronado", "114SD", "Argosy", "Columbia", "Century", "FLD", "FLB", "Business Class M2", "112SD", "108SD", "Classic XL", "EconicSD", "SD122"],
      "Kenworth": ["T680", "W900", "T800", "T880", "K370", "K100", "T660", "T700", "T600", "T2000", "W990", "W700", "W800", "C500", "T440"],
      "Peterbilt": ["579", "389", "567", "365", "520", "379", "389X", "389X Sleeper", "389X Day Cab", "567 Heritage", "567 SFFA", "567 EPIQ", "579 EPIQ", "520 SFFA", "365 SFFA"],
      "Mack": ["Anthem", "Granite", "Pinnacle", "MD Series", "LR", "Titan", "Vision", "Super-Liner", "Trident", "Metro-Liner", "R Series", "CHU", "CLX", "MRU", "FRE"]
    },
    "Ônibus": {
      "Mercedes-Benz": ["OF 1721", "O 500", "OF 1621", "OF 1724", "O 400", "Citaro", "Sprinter City", "Conecto", "Intouro", "Tourismo", "CapaCity", "eCitaro", "Setra", "Travego", "Chorus"],
      "Volvo": ["B270F", "B290R", "B310R", "B340M", "B420R", "B8R", "B8L", "B11R", "7900 Electric", "7900 Hybrid", "8700 LE", "9700", "9900", "B12B", "B12M"],
      "Scania": ["K310", "K320", "K360", "K400", "K450", "Citywide", "Interlink", "Touring", "Fencer", "Omnilink", "OmniExpress", "OmniCity", "OmniLine", "Suburban", "Irizar i4"],
      "MAN": ["A69", "A66", "A95", "A22", "A84", "Lion's City", "Lion's Intercity", "Lion's Coach", "RR4", "RR2", "HOCL", "ND313", "NG313", "NL263", "NM223"],
      "Iveco": ["Daily", "Crossway", "Urbanway", "Evadys", "Crealis", "CityClass", "Magelys", "Arway", "Euromidi", "Metro", "Eurorider", "Eurorail", "Levant", "Minibus", "MyWay"],
      "Marcopolo": ["Paradiso 1200", "Viaggio 1050", "Senior", "Ideale", "Torino", "Andare", "Viale", "GV1000", "GV1150", "GV1250", "GV1500", "GV1600", "GV1800", "GV1800 DD", "GV1800 LD"],
      "Neobus": ["Mega", "Thunder+", "Spectrum", "Mega BRT", "Thunder Way", "N10", "N90", "Mega Plus", "Mega Low Entry", "Thunder+", "Thunder+", "Mega Viale", "Mega Foz", "Mega City", "Mega TotalFlex", "Spectrum Road"],
      "Caio": ["Apache Vip", "Millennium", "Foz Super", "Foz 2400", "F2400", "Amélia", "Bossa Nova", "Conde", "Deco", "Del Rey", "Eco", "Expo", "Fantasy", "Global", "Jubileu"],
      "Busscar": ["Vissta Buss", "El Buss", "Jum Buss", "Micruss", "Urbanuss", "Panoramico DD", "Elegance 360", "Elegance 400", "Elegance 460", "Panorâmico 6x2", "Vissta Buss LO", "Vissta Buss HI", "Vissta Buss HD", "Vissta Buss DD", "Vissta Buss ME"],
      "Irizar": ["i6", "i4", "i8", "Century", "PB", "Scania Irizar i8", "Volvo Irizar i6", "Mercedes Irizar i8", "Volvo Irizar i4", "Scania Irizar i6", "Mercedes Irizar i6", "Irizar i4LE", "Irizar i6S", "Irizar i8S", "Irizar i4H"]
    },
    "Van": {
      "Mercedes-Benz": ["Sprinter", "Vito", "Metris", "Marco Polo", "Citan", "V-Class", "X-Class", "EQV", "EQT", "eVito", "eSprinter", "Viano", "Vaneo", "T2", "T1"],
      "Ford": ["Transit", "Tourneo", "E-Series", "Ranger", "F-150", "Connect", "Custom", "Courier", "Club Wagon", "Wagon", "Van", "Kombi", "Supervan", "Aerostar", "Windstar"],
      "Volkswagen": ["Transporter", "Caddy", "Crafter", "Multivan", "Amarok", "Caravelle", "California", "LT", "Taro", "Transporter Kombi", "Transporter Shuttle", "Transporter Panel Van", "Transporter Double Cab", "Transporter Dropside", "Transporter Chassis"],
      "Renault": ["Master", "Trafic", "Kangoo", "Dokker", "Express", "Espace", "Scénic", "Grand Scénic", "Captur", "Kadjar", "Koleos", "Arkana", "Alaskan", "Fluence", "Twizy"],
      "Peugeot": ["Boxer", "Expert", "Partner", "Rifter", "Traveller", "Bipper", "Tepee", "Proace", "e-Boxer", "e-Expert", "e-Partner", "e-Traveller", "e-Rifter", "Horizon", "Instinct"],
      "Fiat": ["Ducato", "Doblo", "Talento", "Fiorino", "Strada", "Toro", "Panda", "500L", "500X", "Qubo", "Fullback", "Freemont", "Scudo", "Multipla", "Sedici"],
      "Nissan": ["NV200", "NV300", "NV350", "Primastar", "Cabstar", "Navara", "X-Trail", "Qashqai", "Juke", "Murano", "Pathfinder", "Terrano", "Patrol", "Titan", "Armada"],
      "Toyota": ["Hiace", "Proace", "Granvia", "Hilux", "Land Cruiser", "Sienna", "Tacoma", "Tundra", "Venza", "4Runner", "FJ Cruiser", "Sequoia", "RAV4", "Yaris Verso", "Corolla Verso"],
      "Hyundai": ["H-1", "Staria", "iLoad", "Porter", "H100", "Grand Starex", "Grand i10", "Creta", "Venue", "Tucson", "Santa Fe", "Palisade", "Kona", "Ioniq 5", "Ioniq 6"],
      "Chevrolet": ["Express", "Savanna", "Astro", "Uplander", "Trailblazer", "Tahoe", "Suburban", "Avalanche", "Colorado", "Silverado", "Equinox", "Traverse", "Blazer", "Tracker", "Bolt"]
    }
  };
  

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.car.tipo = '';
    this.onSelectTipo(this.car.tipo);
  }

  onSelectTipo(tipo: string): void {
    this.marcas = Object.keys(this.commonVehicles[tipo]);
    this.modelos = [];
    this.car.marca = '';
    this.car.modelo = '';
    this.car.img = '';
  }

  onSelectMarca(marca: string): void {
    this.modelos = this.commonVehicles[this.car.tipo][marca];
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        const img = new Image();
        img.src = this.imageUrl as string;
        this.loadModel(img);
      };
      reader.readAsDataURL(file);
    }
  }

  async loadModel(img: HTMLImageElement) {

    const model = await mobilenet.load();
    const predictions = await model.classify(img);
    const isCar = predictions.some(prediction =>
      prediction.className.toLowerCase().includes('car') ||
      prediction.className.toLowerCase().includes('truck') ||
      prediction.className.toLowerCase().includes('bus') ||
      prediction.className.toLowerCase().includes('bike') ||
      prediction.className.toLowerCase().includes('motorcycle') ||
      prediction.className.toLowerCase().includes('moped') || 
      prediction.className.toLowerCase().includes('scooter')
    );

    if (isCar) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0, img.width, img.height);
      const base64Data = canvas.toDataURL('image/jpeg');
      this.car.img = base64Data;
      const bottonSell = document.getElementById('sell') as HTMLButtonElement;
      bottonSell.style.display = 'unset';
    } else {
      alert('A imagem não é de um véiculo, impossivel prosseguir.');
    }
  }

  removeImage(): void {
    this.selectedFileName = null;
    this.imageUrl = null;
    const fileInput = document.getElementById('imagem') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  yearRange: string = '1930:2030';

  formatDate(event: any): void {
    const selectedDate = new Date(event);
    const year = selectedDate.getFullYear();
    this.car.ano = year;
  }

  submitForm(): void {
    if (confirm('Tem certeza que deseja vender este veículo?')) {
      this.carService.createCar(this.car).subscribe(
        (response) => {
          console.log(response);
          alert('Veículo cadastrado já consta em nosso estoque!');
          window.location.reload();
        },
        (error) => {
          console.error(error);
          alert('Erro ao cadastrar veículo. Por favor, verifque o formulário.');
        }
      );
    }
  }
}
