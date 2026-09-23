import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Google Translate Icon (Material / Google Translate A + 文 character)
export const GoogleTranslateIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
  </svg>
);

// Official Airbnb Logo (Scalable Vector supporting currentColor & hover color transitions)
export const AirbnbIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block ${className} shrink-0 transition-colors duration-300`}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12.0145 3C11.1003 3 10.2526 3.40222 9.61657 4.14697C9.34357 4.48372 9.14672 4.84057 8.97497 5.15332L8.94128 5.2207C8.81903 5.46595 8.68984 5.72096 8.54284 6.00146L8.51061 6.07324C7.06161 8.94049 5.81201 11.5446 4.67126 14.0698L4.59948 14.2251C4.55073 14.3308 4.50232 14.4396 4.46032 14.5371L4.3988 14.6704C4.3538 14.7694 4.30885 14.8697 4.27135 14.959C4.1836 15.1585 4.09489 15.3661 3.99889 15.6211C3.76414 16.3163 3.69721 16.9472 3.78796 17.6147C3.99121 18.9925 4.90447 20.1761 6.17272 20.7041C6.65647 20.9036 7.14565 21 7.6654 21C7.78015 21 7.95169 20.9911 8.14294 20.9648C8.76994 20.8838 9.38066 20.6716 9.94616 20.3408C10.6057 19.9689 11.254 19.4332 11.975 18.6636L12.0043 18.7031L12.016 18.687C12.6901 19.4085 13.3437 19.9511 14.0067 20.335C14.5827 20.6717 15.1927 20.8832 15.807 20.9619C16.0072 20.9904 16.1813 21 16.305 21C16.818 21 17.3128 20.903 17.7845 20.6968V20.6982C19.04 20.1942 19.9496 19.0348 20.1678 17.6631L20.1898 17.54C20.3083 16.9558 20.2502 16.3331 20.0155 15.6431C19.9855 15.5538 19.9471 15.4654 19.9261 15.4219C19.8684 15.2666 19.8058 15.1206 19.7548 15.0059C19.7105 14.8949 19.6614 14.7907 19.6141 14.6895L19.4955 14.4214C19.4557 14.3314 19.4188 14.2425 19.3768 14.1548L19.3285 14.061C18.0955 11.3408 16.8108 8.66651 15.5126 6.11426L15.4496 5.98828C15.3116 5.73328 15.1725 5.4555 15.0262 5.15625L14.9838 5.07422C14.83 4.79597 14.6722 4.51032 14.4344 4.22607L14.3993 4.18066C13.8053 3.41866 12.958 3 12.0145 3ZM11.994 4.51611C12.4374 4.50918 12.8742 4.69129 13.1805 5.06104L13.2596 5.16064C13.4171 5.34064 13.5284 5.54288 13.6537 5.76562L13.6991 5.86377C13.8378 6.14052 13.9837 6.43362 14.1195 6.68262L14.1737 6.79248C15.4644 9.32898 16.7387 11.9827 17.953 14.6602L18.0599 14.8975L18.0687 14.9062C18.0852 14.9438 18.102 14.9808 18.1185 15.019L18.2533 15.3208C18.256 15.3267 18.2587 15.3325 18.2614 15.3384C18.2948 15.4116 18.3297 15.4878 18.3734 15.5933C18.3752 15.5973 18.3769 15.6013 18.3787 15.6053C18.4239 15.708 18.4747 15.8235 18.5375 15.9888C18.557 16.0338 18.5788 16.0793 18.5946 16.125L18.5961 16.1294C18.7528 16.5869 18.7869 16.9566 18.7089 17.2896L18.6898 17.4009C18.5616 18.2656 18.0001 18.9964 17.1781 19.3286C16.9351 19.4389 16.6253 19.5 16.305 19.5C16.2345 19.5 16.1359 19.4938 16.0091 19.4751C15.5839 19.4211 15.1639 19.2748 14.7596 19.0386C14.1697 18.697 13.5723 18.1841 12.9359 17.4741L12.9842 17.4111C14.0102 16.0716 14.6522 14.8472 14.8915 13.7725L14.8929 13.7666C15.0084 13.2341 15.0308 12.7326 14.9618 12.2886C14.9048 11.8573 14.7499 11.4448 14.5077 11.0698C13.9864 10.2433 13.0499 9.75 11.9999 9.75C10.9934 9.75 10.0645 10.2285 9.51549 11.0303L9.47448 11.0991C9.24123 11.4711 9.09414 11.8697 9.04089 12.271C8.96664 12.748 8.98834 13.2373 9.10534 13.7563C9.33559 14.8401 9.99846 16.1067 11.017 17.4185L11.0477 17.458L11.0463 17.4595C10.3645 18.2125 9.78109 18.7123 9.19909 19.04C8.79784 19.274 8.37875 19.4218 7.94225 19.478C7.82825 19.4945 7.73065 19.5 7.6654 19.5C7.3399 19.5 7.04694 19.4421 6.74694 19.3184C5.96394 18.9929 5.39856 18.2558 5.27331 17.4038C5.21481 16.9771 5.26097 16.5764 5.41247 16.1279C5.48897 15.9239 5.56727 15.7405 5.64977 15.5537C5.68652 15.466 5.72649 15.3792 5.76549 15.293L5.83434 15.1377C5.87634 15.0409 5.91975 14.9451 5.96325 14.8506L6.05407 14.6484C7.16932 12.1817 8.41066 9.5991 9.86266 6.7251L9.88756 6.6665C10.0203 6.41375 10.1541 6.14807 10.2816 5.89307L10.3007 5.85352L10.3029 5.84946C10.4388 5.6037 10.5926 5.32571 10.7694 5.10791C11.1009 4.71941 11.5507 4.52305 11.994 4.51611ZM11.9999 11.25C12.5316 11.25 12.9938 11.481 13.2406 11.877C13.3688 12.075 13.4457 12.2744 13.4764 12.5024C13.5192 12.7747 13.5016 13.1015 13.4266 13.4473C13.2496 14.24 12.7695 15.1738 11.9955 16.229C11.2312 15.1963 10.7404 14.2388 10.5702 13.437C10.4929 13.095 10.4761 12.7893 10.5233 12.4863C10.5526 12.2741 10.628 12.075 10.7562 11.877L10.7709 11.8521C11.0431 11.4741 11.4996 11.25 11.9999 11.25Z"
    />
  </svg>
);

// Filled Bed
export const FilledBed: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
  </svg>
);

// Filled Bath / Bathtub
export const FilledBath: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20 13V4.83C20 3.27 18.73 2 17.17 2c-.75 0-1.47.3-2 .83l-1.25 1.25c-.16-.05-.33-.08-.51-.08-.88 0-1.59.72-1.59 1.59v.82L7.38 7.38C6.91 7.14 6.38 7 5.82 7 3.71 7 2 8.71 2 10.82V13c0 3.31 2.69 6 6 6v3h2v-3h4v3h2v-3c3.31 0 6-2.69 6-6zm-4-7.58c.2-.2.45-.31.72-.31.58 0 1.05.47 1.05 1.05V13h-4V7.58l2.23-2.16z" />
  </svg>
);

// Filled Area / Maximize
export const FilledArea: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M3 3v6h2V5h4V3H3zm16 0h-4v2h4v4h2V3h-2zM5 15H3v6h6v-2H5v-4zm16 4h-4v2h6v-6h-2v4zM7 7h10v10H7V7z" />
  </svg>
);

// Filled MapPin
export const FilledMapPin: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// Filled Building
export const FilledBuilding: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 2H5a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-9 16H7v-2h3v2zm0-4H7v-2h3v2zm0-4H7V8h3v2zm0-4H7V4h3v2zm7 12h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V8h3v2zm0-4h-3V4h3v2z" />
  </svg>
);

// Filled Home
export const FilledHome: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

// Filled Info
export const FilledInfo: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

// Filled Phone
export const FilledPhone: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

// Filled Mail
export const FilledMail: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

// Filled Wifi
export const FilledWifi: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zm0 6c-2.73 0-5.26 1.07-7.14 2.83L12 19.98l7.14-7.15A9.94 9.94 0 0 0 12 10z" />
  </svg>
);

// Filled Lock
export const FilledLock: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

// Filled Shield / Security
export const FilledShield: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

// Filled Tv
export const FilledTv: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
  </svg>
);

// Filled Wind / AC
export const FilledWind: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 12h-1.5c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9H19c.83 0 1.5-.67 1.5-1.5S19.83 6 19 6H4c-.55 0-1 .45-1 1s.45 1 1 1h15c.28 0 .5.22.5.5s-.22.5-.5.5h-1.5c-1.93 0-3.5 1.57-3.5 3.5S15.57 14 17.5 14H19c.55 0 1-.45 1-1s-.45-1-1-1zm-7 4H4c-.55 0-1 .45-1 1s.45 1 1 1h8c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5c0-.55-.45-1-1-1s-1 .45-1 1c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z" />
  </svg>
);

// Filled Car / Parking
export const FilledCar: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
    <circle cx="7.5" cy="14.5" r="1.5" />
    <circle cx="16.5" cy="14.5" r="1.5" />
  </svg>
);

// Filled Train / Transit
export const FilledTrain: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.71 0 5.13.46 5.67.89H6.33C6.87 4.46 8.29 4 12 4zm-4 13c-.83 0-1.5-.67-1.5-1.5S7.17 14 8 14s1.5.67 1.5 1.5S8.83 17 8 17zm8 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2-5H6V7h12v5z" />
  </svg>
);

// Filled Card
export const FilledCard: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
);

// Filled Dumbbell / Fitness
export const FilledDumbbell: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43 1.43 1.43 2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43 1.43-1.43-1.43-1.43z" />
  </svg>
);

// Filled Waves / Pool
export const FilledPool: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-2.2-1.9 9 9 0 0 0-4.95-3.52V4h1a1 1 0 0 0 0-2H11a1 1 0 0 0 0 2h1v1a9 9 0 0 0-4.95 3.52 8 8 0 0 1-2.2 1.9L3.62 8.57A10 10 0 0 1 10 4.15V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.15a10 10 0 0 1 6.38 4.42zM12 13c-2.11 0-4.13.72-5.78 2.06a7.95 7.95 0 0 1-2.4 1.34L3.19 14.5A9.95 9.95 0 0 0 12 11c3.84 0 7.29 2.17 8.81 5.5l-.63 1.9a7.95 7.95 0 0 1-2.4-1.34A9.9 9.9 0 0 0 12 13zm0 5c-2.11 0-4.13.72-5.78 2.06a7.95 7.95 0 0 1-2.4 1.34l-.63-1.9A9.95 9.95 0 0 0 12 16c3.84 0 7.29 2.17 8.81 5.5l-.63 1.9a7.95 7.95 0 0 1-2.4-1.34A9.9 9.9 0 0 0 12 18z" />
  </svg>
);

// Filled Laptop / Workspace
export const FilledLaptop: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
  </svg>
);

// Filled Tree / Garden
export const FilledTree: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2L5 11h3l-3 6h5v4h4v-4h5l-3-6h3L12 2z" />
  </svg>
);

// Filled Utensils / Kitchen
export const FilledUtensils: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
  </svg>
);

// Filled Armchair / Furnishing
export const FilledArmchair: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 10V7c0-1.66-1.34-3-3-3H8C6.34 4 5 5.34 5 7v3c-1.66 0-3 1.34-3 3v5c0 .55.45 1 1 1h1v2c0 .55.45 1 1 1s1-.45 1-1v-2h12v2c0 .55.45 1 1 1s1-.45 1-1v-2h1c.55 0 1-.45 1-1v-5c0-1.66-1.34-3-3-3zm-12-3c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v3H7V7zm13 8c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2z" />
  </svg>
);

// Filled Shirt / Laundry
export const FilledShirt: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M15 2l-3 3-3-3-5 2v5l3 1v12h12V10l3-1V4l-5-2zm-3 5.5l1.5-1.5h2.89L18 8.78V20H6V8.78l1.61-2.78h2.89L12 7.5z" />
  </svg>
);

// Filled Sparkles
export const FilledSparkles: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M9 21l2.5-5.5L17 13l-5.5-2.5L9 5l-2.5 5.5L1 13l5.5 2.5L9 21zm10.5-8l1.25-2.75L23.5 9l-2.75-1.25L19.5 5l-1.25 2.75L15.5 9l2.75 1.25L19.5 13z" />
  </svg>
);

// Filled Check Circle
export const FilledCheckCircle: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

// Filled Arrow Right
export const FilledArrowRight: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

// Filled Chevron Down
export const FilledChevronDown: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
);

// Filled Send
export const FilledSend: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

// Filled Check Circle with Blue background and White tick
export const FilledCheckCircleBlueBg: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#042F61" />
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#FFFFFF" />
  </svg>
);

// Filled Check Circle with Yellow/Gold background and Blue tick
export const FilledCheckCircleGoldBg: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#DFB85A" />
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#042F61" />
  </svg>
);

// Filled Lobby / Entrance
export const FilledLobby: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 2H5c-1.1 0-2 .9-2 2v17h3v-7h4v7h4v-7h4v7h3V4c0-1.1-.9-2-2-2zm-9 6H7V5h3v3zm7 0h-3V5h3v3z" />
  </svg>
);

// Filled Gamepad / Gaming / VR
export const FilledGamepad: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 1c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 8 18.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

// Filled Golf Simulator
export const FilledGolf: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.5 18a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 18c0-.98.57-1.83 1.4-2.22l.1-.05V4h10l-3 4 3 4H8v6h9a.5.5 0 0 0 .5-.5c0-.28-.22-.5-.5-.5H9v-2h8a2.5 2.5 0 0 1 2.5 2.5z" />
  </svg>
);

// Filled Camera / Photography & Art Studio
export const FilledCamera: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

// Filled Sky Running Track / Athletics
export const FilledTrack: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-.9-.4 2 6.5 1.2z" />
  </svg>
);

// Filled Lotus / Zen & Sanctuary Space
export const FilledLotus: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2c-.6 2.4-2.1 5.3-3.8 7.3C6.6 11.2 5 13.4 5 16c0 3.9 3.1 7 7 7s7-3.1 7-7c0-2.6-1.6-4.8-3.2-6.7C14.1 7.3 12.6 4.4 12 2zm0 18.5c-2.5 0-4.5-2-4.5-4.5 0-1.7 1.1-3.2 2.2-4.6 1-1.3 1.9-2.8 2.3-4.4.4 1.6 1.3 3.1 2.3 4.4 1.1 1.4 2.2 2.9 2.2 4.6 0 2.5-2 4.5-4.5 4.5z" />
  </svg>
);



