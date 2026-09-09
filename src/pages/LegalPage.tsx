import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';
import { Shield, ChevronLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (route: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const { t } = useLanguage();
  const isPrivacy = type === 'privacy';

  return (
    <div className="pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Back button */}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('/');
        }}
        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0D8] text-xs font-semibold text-[#042F61] hover:text-[#042F61] hover:border-[#DFB85A] hover:bg-[#FAF8F5] transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
      >
        <ChevronLeft className="w-4 h-4 text-[#9D7C38] transition-transform duration-200 group-hover:-translate-x-1" />
        <span>Return to Home</span>
      </a>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5 text-[#9D7C38]" />
          <span>Legal &amp; Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#042F61]">
          {isPrivacy ? t('legal.privacy') : t('legal.terms')}
        </h1>
        <p className="text-xs text-[#8A8175]">
          Last updated: {new Date().getFullYear()} · CG Property
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-xs space-y-6 text-sm text-[#5E574E] leading-relaxed">
        <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E6E0D8] text-xs text-[#6B645A]">
          {t('legal.notice')}
        </div>

        {isPrivacy ? (
          <>
            <h3 className="text-lg font-bold text-[#042F61]">
              1. Information Collection &amp; Use
            </h3>
            <p>
              CG Property respects your privacy. Any inquiries or contact details submitted through our website forms are used strictly to respond to your questions regarding our Bangkok residences or partnership inquiries.
            </p>

            <h3 className="text-lg font-bold text-[#042F61]">
              2. Third-Party Reservations
            </h3>
            <p>
              When booking through external platforms such as Airbnb, transactions and reservation data are processed under Airbnb’s respective privacy and terms policies.
            </p>

            <h3 className="text-lg font-bold text-[#042F61]">
              3. Data Retention &amp; Security
            </h3>
            <p>
              We implement appropriate technical measures to protect submitted inquiry data against unauthorized access.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-[#042F61]">
              1. Website Terms
            </h3>
            <p>
              By accessing the CG Property website, you agree to browse our curated portfolio and property information for legitimate personal and inquiry purposes.
            </p>

            <h3 className="text-lg font-bold text-[#042F61]">
              2. Property Information Accuracy
            </h3>
            <p>
              All property specifications regarding The Tower R Suite and The Tower N Sky Suite at Nue District Rama 9 reflect confirmed architectural details. Official house rules and reservation conditions apply when booking via Airbnb.
            </p>

            <h3 className="text-lg font-bold text-[#042F61]">
              3. Intellectual Property
            </h3>
            <p>
              All branding, typography pairings, and layout presentations of CG Property are protected.
            </p>
          </>
        )}
      </div>

    </div>
  );
};
