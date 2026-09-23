import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Building2, 
  MapPin, 
  ExternalLink, 
  RotateCcw, 
  Eye, 
  EyeOff,
  ChevronRight,
  Globe,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';

interface RealInteractiveMapProps {
  onNavigate?: (route: PageRoute) => void;
  initialPropertyId?: string;
}

export interface MapProperty {
  id: string;
  slug: string;
  shortName: string;
  name: string;
  city: string;
  country: string;
  location: string;
  district: string;
  tower: string;
  floor: string;
  sizeSqm: number;
  specs: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  destinationRoute: PageRoute;
  propertyRoute: PageRoute;
  description: { en: string; zh: string; th: string };
  coverImage: string;
}

interface PlaceOfInterest {
  id: string;
  city: 'Bangkok';
  name: { en: string; zh: string; th: string };
  category: 'transit' | 'shopping' | 'dining';
  lat: number;
  lng: number;
  distance: { en: string; zh: string; th: string };
  description: { en: string; zh: string; th: string };
}

export const MAP_PROPERTIES: MapProperty[] = [
  {
    id: 'residence-01',
    slug: 'residence-01',
    shortName: 'NUE District R9',
    name: 'NUE District R9',
    city: 'Bangkok',
    country: 'Thailand',
    location: '185/241 · 185 Rama IX Rd, Huai Khwang, Bangkok 10310, Thailand',
    district: 'Huai Khwang',
    tower: '',
    floor: '16th Floor',
    sizeSqm: 46,
    specs: '46 sqm · 2 Bed / 2 Bath',
    lat: 13.7570,
    lng: 100.5666,
    googleMapsUrl: 'https://maps.app.goo.gl/CbW4QjCVaX2wo5yB7',
    destinationRoute: '/destinations/thailand/bangkok',
    propertyRoute: '/properties/residence-01',
    description: {
      en: '16th floor residence at 185/241 · 185 Rama IX Rd, Huai Khwang, Bangkok featuring abundant natural light, Scandinavian styling, and direct Rama 9 transit access.',
      zh: '位于曼谷拉玛九路 185 号（185/241 · 185 Rama IX Rd）16 层，尊享充沛采光与当代北欧温馨格调，便捷通达拉玛九商圈。',
      th: 'เรซิเดนซ์ชั้น 16 ณ 185/241 ถนนพระราม 9 ห้วยขวาง กรุงเทพฯ รับแสงธรรมชาติ พร้อมการตกแต่งสไตล์สแกนดิเนเวียนร่วมสมัย',
    },
    coverImage: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Tower%20R%20_16th%20Floor/16th%20Foor%20Living%20Room.webp',
  },
  {
    id: 'quintara',
    slug: 'quintara',
    shortName: 'Quintara',
    name: 'Quintara',
    city: 'Bangkok',
    country: 'Thailand',
    location: '176 Soi Ratchadaphisek 12, Huai Khwang, Bangkok 10310, Thailand',
    district: 'Huai Khwang',
    tower: 'Quintara',
    floor: 'Curated Residence',
    sizeSqm: 58,
    specs: '58 sqm · 2 Bed / 2 Bath',
    lat: 13.7747,
    lng: 100.5747,
    googleMapsUrl: 'https://maps.google.com/?q=176+Soi+Ratchadaphisek+12,+Huai+Khwang,+Bangkok+10310,+Thailand',
    destinationRoute: '/destinations/thailand/bangkok',
    propertyRoute: '/properties/quintara',
    description: {
      en: 'Curated luxury residence at 176 Soi Ratchadaphisek 12, Huai Khwang, Bangkok with effortless access to MRT Huai Khwang and Ratchadaphisek avenue.',
      zh: '位于曼谷辉煌区拉差达披色12巷176号的精选奢雅寓所，便捷通达 MRT 辉煌站与拉差达商圈。',
      th: 'เรซิเดนซ์หรู ณ เลขที่ 176 ซอยรัชดาภิเษก 12 ห้วยขวาง กรุงเทพฯ เดินทางสะดวกใกล้ MRT ห้วยขวาง และถนนรัชดาภิเษก',
    },
    coverImage: 'https://storage.googleapis.com/chelsongordon/CG%20Property/images/Quintara/Living%20Room%201.webp',
  },
];

const PLACES_OF_INTEREST: PlaceOfInterest[] = [
  {
    id: 'mrt-rama9',
    city: 'Bangkok',
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
  },
  {
    id: 'mrt-huai-khwang',
    city: 'Bangkok',
    name: {
      en: 'MRT Huai Khwang Station',
      zh: 'MRT 辉煌地铁站',
      th: 'MRT สถานีห้วยขวาง',
    },
    category: 'transit',
    lat: 13.7785,
    lng: 100.5739,
    distance: { en: '450m · 6 min walk', zh: '450米 · 步行6分钟', th: '450 ม. · เดิน 6 นาที' },
    description: {
      en: 'Direct underground connection to Rama 9, Sukhumvit, and Chatuchak.',
      zh: 'MRT 蓝色环线核心枢纽，直通拉玛九、素坤逸与乍都乍。',
      th: 'เชื่อมต่อตรงสู่พระราม 9 สุขุมวิท และจตุจักร',
    },
  },
  {
    id: 'central-rama9',
    city: 'Bangkok',
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
  },
  {
    id: 'the-street-ratchada',
    city: 'Bangkok',
    name: {
      en: 'The Street Ratchada',
      zh: 'The Street Ratchada 商业中心',
      th: 'เดอะ สตรีท รัชดา',
    },
    category: 'shopping',
    lat: 13.7705,
    lng: 100.5725,
    distance: { en: '600m · 8 min walk', zh: '600米 · 步行8分钟', th: '600 ม. · เดิน 8 นาที' },
    description: {
      en: '24-hour lifestyle retail destination with restaurants, fitness, and boutique shops.',
      zh: '24小时多元生活方式商业体，汇集各色餐厅、健身与精品店铺。',
      th: 'ศูนย์การค้าไลฟ์สไตล์ 24 ชั่วโมง พร้อมร้านอาหาร ฟิตเนส และแหล่งช้อปปิ้ง',
    },
  },
  {
    id: 'fortune-town',
    city: 'Bangkok',
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
  },
  {
    id: 'jodd-fairs',
    city: 'Bangkok',
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
  },
  {
    id: 'arl-makkasan',
    city: 'Bangkok',
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
  },
];

export const RealInteractiveMap: React.FC<RealInteractiveMapProps> = ({ onNavigate, initialPropertyId = 'residence-01' }) => {
  const { language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const propertyMarkersRef = useRef<{ [key: string]: L.Marker }>({});
  const poiLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'dark'>('streets');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(initialPropertyId);
  const [showInfoCard, setShowInfoCard] = useState<boolean>(true);

  const selectedProperty = MAP_PROPERTIES.find(p => p.id === selectedPropertyId) || MAP_PROPERTIES[0];

  // Specific zoom level: Quintara zoomed +1 (level 19) for intimate street clarity, Bangkok at level 18
  const getPropertyZoom = (propertyId: string) => {
    return propertyId === 'quintara' ? 19 : 18;
  };

  // Tile Providers: Original OpenStreetMap and Esri tiles (No API key required)
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

  // Switch Selected Property
  const handleSelectProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    const targetProp = MAP_PROPERTIES.find(p => p.id === propertyId);
    if (targetProp && mapInstanceRef.current) {
      const zoom = getPropertyZoom(targetProp.id);
      mapInstanceRef.current.flyTo([targetProp.lat, targetProp.lng], zoom, {
        duration: 1.2,
      });
    }
  };

  // Fit All Properties in View
  const handleFitAll = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.fitBounds(
      [
        [13.750, 100.560],
        [13.785, 100.580],
      ],
      {
        padding: [50, 50],
        maxZoom: 15,
      }
    );
  };

  // Recenter to Currently Selected Property (Quintara at zoom 19, Bangkok at 18)
  const handleRecenter = () => {
    if (mapInstanceRef.current && selectedProperty) {
      const zoom = getPropertyZoom(selectedProperty.id);
      mapInstanceRef.current.flyTo([selectedProperty.lat, selectedProperty.lng], zoom, {
        duration: 0.8,
      });
    }
  };

  // Center on Place of Interest
  const handleSelectPoi = (poi: PlaceOfInterest) => {
    if (mapInstanceRef.current) {
      const zoom = getPropertyZoom(selectedProperty.id);
      mapInstanceRef.current.flyTo([poi.lat, poi.lng], zoom, { duration: 0.8 });
    }
  };

  // Initialize Real Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialZoom = getPropertyZoom(selectedProperty.id);
      const map = L.map(mapContainerRef.current, {
        center: [selectedProperty.lat, selectedProperty.lng],
        zoom: initialZoom,
        zoomControl: false,
        attributionControl: false,
      });

      // Zoom Control in Bottom Right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Tile Layer
      const currentConfig = tileLayers[mapStyle];
      const initialLayer = L.tileLayer(currentConfig.url, {
        attribution: currentConfig.attribution,
        className: currentConfig.className,
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = initialLayer;
      mapInstanceRef.current = map;

      // Initialize dedicated LayerGroup for active POIs
      const poiLayerGroup = L.layerGroup().addTo(map);
      poiLayerGroupRef.current = poiLayerGroup;

      // 1. Add Property Markers for ALL Properties
      MAP_PROPERTIES.forEach((prop) => {
        const isCurrent = prop.id === selectedPropertyId;

        const propertyIcon = L.divIcon({
          className: 'custom-property-pin',
          html: `
            <div class="property-marker-wrapper relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group" data-property-id="${prop.id}">
              <div class="marker-ping ${isCurrent ? 'absolute -inset-3 bg-[#DFB85A]/40 rounded-full animate-ping pointer-events-none' : 'hidden'}"></div>
              <div class="marker-circle w-9 h-9 rounded-full flex items-center justify-center shadow-2xl border-2 transition-transform duration-200 group-hover:scale-110 ${
                isCurrent 
                  ? 'bg-[#DFB85A] text-[#042F61] border-white ring-4 ring-[#DFB85A]/50 scale-105' 
                  : 'bg-[#042F61] text-white border-white/90 ring-2 ring-white/20'
              }">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
                </svg>
              </div>
              <div class="marker-badge absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap shadow-lg backdrop-blur-md transition-all ${
                isCurrent 
                  ? 'bg-[#DFB85A] text-[#042F61] border border-white/40 shadow-xl' 
                  : 'bg-[#042F61] text-white border border-white/20'
              }">
                ${prop.shortName} · ${prop.city}
              </div>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        });

        const marker = L.marker([prop.lat, prop.lng], { icon: propertyIcon }).addTo(map);
        marker.on('click', () => {
          handleSelectProperty(prop.id);
        });

        propertyMarkersRef.current[prop.id] = marker;
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Synchronize POI markers for the selected property (Declutters Quintara to show only clean transit & access)
  useEffect(() => {
    if (!mapInstanceRef.current || !poiLayerGroupRef.current) return;

    poiLayerGroupRef.current.clearLayers();

    // Determine POIs to display for selected property
    const activePois = selectedPropertyId === 'quintara'
      ? PLACES_OF_INTEREST.filter(p => p.id === 'mrt-huai-khwang' || p.id === 'the-street-ratchada' || p.id === 'central-rama9' || p.id === 'mrt-rama9')
      : PLACES_OF_INTEREST.filter(p => p.id !== 'mrt-huai-khwang');

    activePois.forEach((poi) => {
      const poiIcon = L.divIcon({
        className: 'custom-poi-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group">
            <div class="w-7 h-7 rounded-full flex items-center justify-center shadow-lg border border-white/80 transition-transform duration-200 group-hover:scale-110 ${
              poi.category === 'transit'
                ? 'bg-[#0284C7] text-white ring-2 ring-[#0284C7]/20'
                : poi.category === 'shopping'
                ? 'bg-[#042F61] text-white'
                : 'bg-[#9D7C38] text-white'
            }">
              ${
                poi.category === 'transit'
                  ? '<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h0"/><path d="M16 15h0"/></svg>'
                  : '<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'
              }
            </div>
            <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-tight whitespace-nowrap shadow-md backdrop-blur-md bg-black/75 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ${poi.name[language] || poi.name.en}
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon });
      marker.on('click', () => {
        handleSelectPoi(poi);
      });

      poiLayerGroupRef.current?.addLayer(marker);
    });
  }, [selectedPropertyId, language]);

  // Synchronize dynamic marker highlights when selectedPropertyId changes
  useEffect(() => {
    MAP_PROPERTIES.forEach((prop) => {
      const marker = propertyMarkersRef.current[prop.id];
      if (marker) {
        const el = marker.getElement();
        if (el) {
          const isSelected = prop.id === selectedPropertyId;
          const pingEl = el.querySelector('.marker-ping');
          const circleEl = el.querySelector('.marker-circle');
          const badgeEl = el.querySelector('.marker-badge');

          if (pingEl) {
            pingEl.className = isSelected 
              ? 'marker-ping absolute -inset-3 bg-[#DFB85A]/40 rounded-full animate-ping pointer-events-none'
              : 'marker-ping hidden';
          }
          if (circleEl) {
            circleEl.className = isSelected
              ? 'marker-circle w-9 h-9 rounded-full flex items-center justify-center shadow-2xl border-2 transition-transform duration-200 group-hover:scale-110 bg-[#DFB85A] text-[#042F61] border-white ring-4 ring-[#DFB85A]/50 scale-105'
              : 'marker-circle w-9 h-9 rounded-full flex items-center justify-center shadow-2xl border-2 transition-transform duration-200 group-hover:scale-110 bg-[#042F61] text-white border-white/90 ring-2 ring-white/20';
          }
          if (badgeEl) {
            badgeEl.className = isSelected
              ? 'marker-badge absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap shadow-lg backdrop-blur-md transition-all bg-[#DFB85A] text-[#042F61] border border-white/40 shadow-xl'
              : 'marker-badge absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap shadow-lg backdrop-blur-md transition-all bg-[#042F61] text-white border border-white/20';
          }
        }
      }
    });
  }, [selectedPropertyId]);

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

  // Filter POIs for active property
  const cityPois = selectedPropertyId === 'quintara'
    ? PLACES_OF_INTEREST.filter(p => p.id === 'mrt-huai-khwang' || p.id === 'the-street-ratchada' || p.id === 'central-rama9' || p.id === 'mrt-rama9')
    : PLACES_OF_INTEREST.filter(p => p.id !== 'mrt-huai-khwang');

  return (
    <div id="real-interactive-map-section" className="relative w-full rounded-3xl overflow-hidden border border-[#2B2E33] shadow-2xl bg-[#0D1013]">
      
      {/* MAP VIEW CONTAINER */}
      <div className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] bg-[#0E1216]">
        
        {/* Real Leaflet Interactive Engine */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* TOP FLOATING BAR: Layer Selectors, Property Switcher & Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
          
          {/* Layer View Switcher */}
          <div className="flex items-center gap-1 bg-[#14171A]/90 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-lg pointer-events-auto text-xs">
            <button
              onClick={() => handleStyleChange('streets')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mapStyle === 'streets' ? 'bg-white text-[#14171A] shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mapStyle === 'streets' ? 'bg-[#14171A]' : 'bg-white/60'}`} />
              <span>{language === 'zh' ? '标准街道' : language === 'th' ? 'ถนน' : 'Streets'}</span>
            </button>
            <button
              onClick={() => handleStyleChange('satellite')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mapStyle === 'satellite' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mapStyle === 'satellite' ? 'bg-white' : 'bg-[#0284C7]'}`} />
              <span>{language === 'zh' ? '真实卫星' : language === 'th' ? 'ดาวเทียม' : 'Satellite'}</span>
            </button>
            <button
              onClick={() => handleStyleChange('dark')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mapStyle === 'dark' ? 'bg-[#042F61] text-white border border-white/20 shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mapStyle === 'dark' ? 'bg-white' : 'bg-white/50'}`} />
              <span>{language === 'zh' ? '暗黑模式' : language === 'th' ? 'โหมดมืด' : 'Dark'}</span>
            </button>
          </div>

          {/* Quick Property Switcher Pills in Top Bar (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-1 bg-[#042F61]/90 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-lg pointer-events-auto text-xs">
            {MAP_PROPERTIES.map((prop) => {
              const isSelected = selectedPropertyId === prop.id;
              return (
                <button
                  key={prop.id}
                  onClick={() => handleSelectProperty(prop.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#DFB85A] text-[#042F61] shadow-xs'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Building2 className="w-3 h-3" />
                  <span>{prop.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons: Show All, Recenter & Card Toggle */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleFitAll}
              title="Show All Properties on Map"
              className="bg-[#042F61]/90 hover:bg-[#021B38] backdrop-blur-md px-3 py-2 sm:p-2.5 rounded-2xl border border-white/15 text-white/80 hover:text-white transition-all shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-[#DFB85A]" />
              <span className="hidden sm:inline">{language === 'zh' ? '全部物业' : language === 'th' ? 'ทุกยูนิต' : 'All Properties'}</span>
            </button>
            <button
              onClick={handleRecenter}
              title="Recenter Map"
              className="bg-[#042F61]/90 hover:bg-[#021B38] backdrop-blur-md px-3 py-2 sm:p-2.5 rounded-2xl border border-white/15 text-white/80 hover:text-white transition-all shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'zh' ? '居中' : language === 'th' ? 'จัดกึ่งกลาง' : 'Recenter'}</span>
            </button>
            <button
              onClick={() => setShowInfoCard(!showInfoCard)}
              className="bg-[#042F61]/90 hover:bg-[#021B38] backdrop-blur-md p-2.5 rounded-2xl border border-white/15 text-white/80 hover:text-white transition-all shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              {showInfoCard ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{showInfoCard ? 'Hide' : 'Details'}</span>
            </button>
          </div>

        </div>

        {/* FLOATING CONTEXT CARD (Dynamic Property Details & 1-Tap Switcher) */}
        {showInfoCard && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md lg:max-w-lg z-20 pointer-events-auto">
            <div className="bg-[#042F61]/95 backdrop-blur-xl text-white rounded-3xl p-5 sm:p-6 border border-white/15 shadow-2xl space-y-3.5">
              
              {/* Header Pill & Heading for Active Property */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 text-[#DFB85A] text-[11px] font-semibold uppercase tracking-widest mb-1.5 border border-white/10">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedProperty.city}, {selectedProperty.country}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {selectedProperty.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed line-clamp-2">
                  {selectedProperty.description[language] || selectedProperty.description.en}
                </p>
              </div>

              {/* Property Switcher Cards: Shows both properties with instant switching */}
              <div className="space-y-1.5 pt-0.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#DFB85A] flex items-center justify-between">
                  <span>{language === 'zh' ? '切换房源' : language === 'th' ? 'เลือกเรซิเดนซ์' : 'Select Residence'}</span>
                  <span className="text-[10px] text-white/50 lowercase font-normal">{MAP_PROPERTIES.length} properties</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {MAP_PROPERTIES.map((prop) => {
                    const isSelected = selectedPropertyId === prop.id;
                    return (
                      <button
                        key={prop.id}
                        onClick={() => handleSelectProperty(prop.id)}
                        className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-white/15 border-[#DFB85A] ring-1 ring-[#DFB85A]/60 shadow-md'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[#DFB85A] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate">
                            {prop.shortName}
                          </span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DFB85A] shrink-0" />
                          )}
                        </div>
                        <div className="text-xs font-semibold text-white truncate">
                          {prop.floor}
                        </div>
                        <div className="text-[10px] text-white/60 mt-0.5 truncate">
                          {prop.city} · {prop.sizeSqm}m²
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Direct Property View, Destination & Google Maps */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate(selectedProperty.propertyRoute)}
                      className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{language === 'zh' ? '查看套房' : language === 'th' ? 'ดูห้องชุด' : 'View Suite'}</span>
                      <ArrowRight className="w-3 h-3 text-[#DFB85A]" />
                    </button>
                  )}
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate(selectedProperty.destinationRoute)}
                      className="text-white/70 hover:text-white hover:underline text-xs font-medium px-2 py-1 transition-colors cursor-pointer"
                    >
                      {selectedProperty.city}
                    </button>
                  )}
                </div>

                <a
                  href={selectedProperty.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-shine px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        )}

        {/* RIGHT SIDE FLOATING POI QUICK-LIST (Dynamic to active property city) */}
        <div className="hidden lg:flex flex-col gap-2 absolute right-4 top-20 z-20 max-w-xs pointer-events-auto">
          <div className="bg-[#042F61]/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-white shadow-xl space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#DFB85A] px-1 flex items-center justify-between">
              <span>
                {selectedPropertyId === 'quintara' 
                  ? (language === 'zh' ? '拉差达地标亮点' : language === 'th' ? 'ไฮไลท์รัชดาภิเษก' : 'Ratchada Highlights')
                  : (language === 'zh' ? '拉玛九地标亮点' : language === 'th' ? 'ไฮไลท์พระราม 9' : 'Rama 9 Highlights')}
              </span>
              <span className="text-[10px] text-white/50 lowercase font-normal">{selectedProperty.city}</span>
            </div>
            <div className="space-y-1">
              {cityPois.map((poi) => (
                <button
                  key={poi.id}
                  onClick={() => handleSelectPoi(poi)}
                  className="w-full text-left p-2 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer text-white/75 hover:text-white hover:bg-white/10"
                >
                  <div className="truncate mr-2">
                    <div className="truncate font-medium">{poi.name[language] || poi.name.en}</div>
                    <div className="text-[10px] text-[#DFB85A]">{poi.distance[language] || poi.distance.en}</div>
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
