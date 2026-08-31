import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Building2, 
  MapPin, 
  Train, 
  ShoppingBag, 
  Utensils, 
  ExternalLink, 
  Layers, 
  Navigation, 
  RotateCcw, 
  Eye, 
  EyeOff,
  ChevronRight,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';

interface RealInteractiveMapProps {
  onNavigate?: (route: PageRoute) => void;
}

interface PlaceOfInterest {
  id: string;
  name: { en: string; zh: string; th: string };
  category: 'residence' | 'transit' | 'shopping' | 'dining';
  lat: number;
  lng: number;
  distance: { en: string; zh: string; th: string };
  description: { en: string; zh: string; th: string };
  iconType: string;
}

export const RealInteractiveMap: React.FC<RealInteractiveMapProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'dark'>('streets');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('nue-district');
  const [activeCategory, setActiveCategory] = useState<'all' | 'transit' | 'shopping' | 'dining'>('all');
  const [showInfoCard, setShowInfoCard] = useState<boolean>(true);

  // Exact Coordinates for Nue District Rama 9 Bangkok & Neighborhood
  const NUE_COORDS: [number, number] = [13.7570, 100.5668];

  const places: PlaceOfInterest[] = [
    {
      id: 'nue-district',
      name: {
        en: 'Nue District Rama 9 (Tower R & N)',
        zh: 'Nue District Rama 9 (R栋与N栋)',
        th: 'นิว ดิสทริคท์ พระราม 9 (อาคาร R & N)',
      },
      category: 'residence',
      lat: 13.7570,
      lng: 100.5668,
      distance: { en: 'CG Property Collection', zh: 'CG Property 臻选住宅', th: 'คอลเลกชัน CG Property' },
      description: {
        en: 'Prime Rama 9 address hosting Tower R (16th Fl) and Tower N (40th Fl) residences.',
        zh: '拉玛九核心地段，包含 R 栋 16 层与 N 栋 40 层高端套房。',
        th: 'ทำเลพระราม 9 ใจกลางเมือง เรซิเดนซ์อาคาร R ชั้น 16 และอาคาร N ชั้น 40',
      },
      iconType: 'residence',
    },
    {
      id: 'mrt-rama9',
      name: {
        en: 'MRT Phra Ram 9 Station',
        zh: 'MRT Phra Ram 9 地铁站',
        th: 'MRT สถานีพระราม 9',
      },
      category: 'transit',
      lat: 13.7574,
      lng: 100.5654,
      distance: { en: '350m · 5 min walk', zh: '350米 · 步行5分钟', th: '350 ม. · เดิน 5 นาที' },
      description: {
        en: 'Direct underground connection on the MRT Blue Line to Sukhumvit (Asoke) & Silom.',
        zh: '搭乘 MRT 蓝色环线直达素坤逸（阿索克）与是隆商圈。',
        th: 'เชื่อมต่อสายสีน้ำเงินตรงสู่สุขุมวิท (อโศก) และสีลม',
      },
      iconType: 'transit',
    },
    {
      id: 'central-rama9',
      name: {
        en: 'Central Rama 9 Shopping Complex',
        zh: 'Central Rama 9 综合购物中心',
        th: 'เซ็นทรัล พระราม 9',
      },
      category: 'shopping',
      lat: 13.7582,
      lng: 100.5660,
      distance: { en: '450m · 6 min walk', zh: '450米 · 步行6分钟', th: '450 ม. · เดิน 6 นาที' },
      description: {
        en: '7-story retail lifestyle complex featuring international dining, supermarkets, and fashion.',
        zh: '7层大型综合商场，汇集国际美食、高端超市与时尚品牌。',
        th: 'ศูนย์การค้าไลฟ์สไตล์ 7 ชั้น ครบครันด้วยร้านอาหาร ซูเปอร์มาร์เก็ต และแบรนด์ชั้นนำ',
      },
      iconType: 'shopping',
    },
    {
      id: 'fortune-town',
      name: {
        en: 'Fortune Town IT & Retail Center',
        zh: 'Fortune Town 数码商业城',
        th: 'ฟอร์จูนทาวน์',
      },
      category: 'shopping',
      lat: 13.7562,
      lng: 100.5645,
      distance: { en: '400m · 5 min walk', zh: '400米 · 步行5分钟', th: '400 ม. · เดิน 5 นาที' },
      description: {
        en: 'Renowned digital hub, specialty electronics, music stores, and services.',
        zh: '曼谷知名数码科技中心、乐器专卖与便民服务。',
        th: 'ศูนย์รวมสินค้าไอที แกดเจ็ต เครื่องดนตรี และบริการครบวงจร',
      },
      iconType: 'shopping',
    },
    {
      id: 'jodd-fairs',
      name: {
        en: 'Jodd Fairs Rama 9 Night Market',
        zh: 'Jodd Fairs 乔德夜市',
        th: 'ตลาดนัดจ๊อดแฟร์ พระราม 9',
      },
      category: 'dining',
      lat: 13.7558,
      lng: 100.5685,
      distance: { en: '650m · 8 min walk', zh: '650米 · 步行8分钟', th: '650 ม. · เดิน 8 นาที' },
      description: {
        en: 'Vibrant Bangkok night market with artisanal street food, bars, and evening nightlife.',
        zh: '曼谷高人气潮流夜市，汇集特色街头美食、酒吧与文创市集。',
        th: 'ตลาดนัดกลางคืนยอดนิยม แหล่งรวมสตรีทฟู้ด บาร์ และบรรยากาศสุดคึกคัก',
      },
      iconType: 'dining',
    },
    {
      id: 'arl-makkasan',
      name: {
        en: 'ARL Makkasan (Airport Rail Link)',
        zh: 'ARL Makkasan 机场快线',
        th: 'ARL สถานีมักกะสัน',
      },
      category: 'transit',
      lat: 13.7510,
      lng: 100.5615,
      distance: { en: '1 MRT stop · 1.2 km', zh: '地铁1站 · 1.2公里', th: '1 สถานี MRT · 1.2 กม.' },
      description: {
        en: 'Express train service directly to Suvarnabhumi International Airport (BKK).',
        zh: '直达素万那普国际机场（BKK）的机场专线列车。',
        th: 'รถไฟฟ้าด่วนสู่สนามบินนานาชาติสุวรรณภูมิ (BKK)',
      },
      iconType: 'transit',
    },
  ];

  // Tile Providers with zero required API keys & custom high-contrast filters
  const tileLayers = {
    dark: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      className: 'map-tiles-dark',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    streets: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      className: 'map-tiles-streets',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      className: 'map-tiles-satellite',
      attribution: 'Tiles &copy; Esri',
    },
  };

  // Initialize Real Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: NUE_COORDS,
        zoom: 18,
        zoomControl: false,
        attributionControl: false,
      });

      // Add Custom-Styled Zoom Control to Bottom Right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Add Tile Layer (Default Dark)
      const currentConfig = tileLayers[mapStyle === 'satellite' ? 'satellite' : mapStyle === 'streets' ? 'streets' : 'dark'];
      const initialLayer = L.tileLayer(currentConfig.url, {
        attribution: currentConfig.attribution,
        className: currentConfig.className,
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = initialLayer;
      mapInstanceRef.current = map;

      // Add Brand Leaflet Marker Icons
      places.forEach((place) => {
        const isPrimary = place.category === 'residence';
        
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group">
              ${isPrimary ? '<div class="absolute -inset-3 bg-[#DFB85A]/40 rounded-full animate-ping pointer-events-none"></div>' : ''}
              <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-xl border-2 transition-transform duration-200 group-hover:scale-110 ${
                isPrimary
                  ? 'bg-[#DFB85A] text-[#042F61] border-white ring-4 ring-[#DFB85A]/40'
                  : place.category === 'transit'
                  ? 'bg-[#0284C7] text-white border-white ring-2 ring-[#0284C7]/20'
                  : place.category === 'shopping'
                  ? 'bg-[#042F61] text-white border-white/80'
                  : 'bg-[#9D7C38] text-white border-white'
              }">
                ${
                  isPrimary
                    ? '<svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/></svg>'
                    : place.category === 'transit'
                    ? '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h0"/><path d="M16 15h0"/></svg>'
                    : place.category === 'shopping'
                    ? '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'
                    : '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 2v19"/><path d="M5 2v19"/><path d="M8 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2V2"/></svg>'
                }
              </div>
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap shadow-lg backdrop-blur-md bg-[#042F61] text-white border border-white/20">
                ${place.name[language] || place.name.en}
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([place.lat, place.lng], { icon: customIcon }).addTo(map);
        
        marker.on('click', () => {
          setSelectedPlaceId(place.id);
          map.flyTo([place.lat, place.lng], 18, { duration: 0.8 });
        });

        markersRef.current[place.id] = marker;
      });
    }

    return () => {
      // Clean up map instance on component unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [language]);

  // Handle Layer Style Changes
  const handleStyleChange = (style: 'dark' | 'streets' | 'satellite') => {
    setMapStyle(style);

    if (mapInstanceRef.current && tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
      const newLayerConfig = tileLayers[style];
      const newLayer = L.tileLayer(newLayerConfig.url, {
        attribution: newLayerConfig.attribution,
        className: newLayerConfig.className,
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = newLayer;
    }
  };

  // Center on Place
  const handleSelectPlace = (place: PlaceOfInterest) => {
    setSelectedPlaceId(place.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([place.lat, place.lng], 18, { duration: 0.8 });
    }
  };

  const handleRecenter = () => {
    setSelectedPlaceId('nue-district');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(NUE_COORDS, 18, { duration: 0.8 });
    }
  };

  const selectedPlace = places.find(p => p.id === selectedPlaceId) || places[0];
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}&destination_place_id=Nue+District+Rama+9`;

  const filteredPlaces = activeCategory === 'all' 
    ? places 
    : places.filter(p => p.category === 'residence' || p.category === activeCategory);

  return (
    <div id="real-interactive-map-section" className="relative w-full rounded-3xl overflow-hidden border border-[#2B2E33] shadow-2xl bg-[#0D1013]">
      
      {/* MAP VIEW CONTAINER */}
      <div className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] bg-[#0E1216]">
        
        {/* Real Leaflet Interactive Engine */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* TOP FLOATING BAR: Layer Selectors & Recenter */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          
          {/* Layer View Switcher: Streets (Default) -> Satellite -> Dark */}
          <div className="flex items-center gap-1 bg-[#14171A]/90 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-lg pointer-events-auto text-xs">
            <button
              onClick={() => handleStyleChange('streets')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mapStyle === 'streets' ? 'bg-white text-[#14171A] shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mapStyle === 'streets' ? 'bg-[#14171A]' : 'bg-white/60'}`} />
              <span>{language === 'zh' ? '标准街道' : language === 'th' ? 'ถนน' : 'Streets'}</span>
            </button>
            <button
              onClick={() => handleStyleChange('satellite')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mapStyle === 'satellite' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mapStyle === 'satellite' ? 'bg-white' : 'bg-[#0284C7]'}`} />
              <span>{language === 'zh' ? '真实卫星' : language === 'th' ? 'ดาวเทียม' : 'Satellite'}</span>
            </button>
            <button
              onClick={() => handleStyleChange('dark')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mapStyle === 'dark' ? 'bg-[#042F61] text-white border border-white/20 shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mapStyle === 'dark' ? 'bg-white' : 'bg-white/50'}`} />
              <span>{language === 'zh' ? '暗黑模式' : language === 'th' ? 'โหมดมืด' : 'Dark Mode'}</span>
            </button>
          </div>

          {/* Map Recenter & Card Toggle */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleRecenter}
              title="Recenter Map"
              className="bg-[#042F61]/90 hover:bg-[#021B38] backdrop-blur-md p-2.5 rounded-2xl border border-white/15 text-white/80 hover:text-white transition-all shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recenter</span>
            </button>
            <button
              onClick={() => setShowInfoCard(!showInfoCard)}
              className="bg-[#042F61]/90 hover:bg-[#021B38] backdrop-blur-md p-2.5 rounded-2xl border border-white/15 text-white/80 hover:text-white transition-all shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              {showInfoCard ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{showInfoCard ? 'Hide Details' : 'Show Details'}</span>
            </button>
          </div>

        </div>

        {/* FLOATING CONTEXT CARD (Preserving Full Section Story, Tower Specs & Controls) */}
        {showInfoCard && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md lg:max-w-lg z-20 pointer-events-auto">
            <div className="bg-[#042F61]/95 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl space-y-4">
              
              {/* Header Pill & Heading */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFB85A] text-xs font-semibold uppercase tracking-widest mb-2 border border-white/10">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bangkok</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {t('location.heading')}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
                  {t('location.subheading')}
                </p>
              </div>

              {/* Tower Positions Specs */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div 
                  onClick={() => handleSelectPlace(places[0])}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 cursor-pointer transition-colors"
                >
                  <div className="text-[#DFB85A] text-[11px] font-bold uppercase tracking-wider mb-0.5">
                    Tower R
                  </div>
                  <div className="text-xs font-semibold text-white">
                    16th Floor Residence
                  </div>
                  <div className="text-[11px] text-white/60 mt-0.5">
                    46 sqm · 2 Bed / 2 Bath
                  </div>
                </div>

                <div 
                  onClick={() => handleSelectPlace(places[0])}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 cursor-pointer transition-colors"
                >
                  <div className="text-[#DFB85A] text-[11px] font-bold uppercase tracking-wider mb-0.5">
                    Tower N
                  </div>
                  <div className="text-xs font-semibold text-white">
                    40th Floor Residence
                  </div>
                  <div className="text-[11px] text-white/60 mt-0.5">
                    41 sqm · 2 Bed / 1 Bath
                  </div>
                </div>
              </div>

              {/* Google Maps and Explore Actions */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('/destinations/thailand/bangkok')}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    {t('bangkok.exploreDestination')}
                  </button>
                )}
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-shine px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        )}

        {/* RIGHT SIDE FLOATING POI QUICK-LIST (Quick jumps to MRT, Central, Jodd Fairs) */}
        <div className="hidden lg:flex flex-col gap-2 absolute right-4 top-20 z-20 max-w-xs pointer-events-auto">
          <div className="bg-[#042F61]/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-white shadow-xl space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#DFB85A] px-1">
              {language === 'zh' ? '拉玛九核心地标' : language === 'th' ? 'สถานที่ใกล้เคียง' : 'Neighborhood Highlights'}
            </div>
            <div className="space-y-1">
              {places.map((place) => (
                <button
                  key={place.id}
                  onClick={() => handleSelectPlace(place)}
                  className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer ${
                    selectedPlaceId === place.id 
                      ? 'bg-white/15 text-white font-semibold border border-white/20' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="truncate">{place.name[language] || place.name.en}</div>
                    <div className="text-[10px] text-[#DFB85A]">{place.distance[language] || place.distance.en}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
