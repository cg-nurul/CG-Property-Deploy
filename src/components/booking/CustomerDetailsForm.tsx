import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, CheckSquare, Square } from 'lucide-react';

export interface CustomerFormData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  notes: string;
}

interface CustomerDetailsFormProps {
  data: CustomerFormData;
  onChange: (data: CustomerFormData) => void;
  errors: Partial<Record<keyof CustomerFormData, string>>;
}

export const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  data,
  onChange,
  errors,
}) => {
  const [sameAsPhone, setSameAsPhone] = useState(data.whatsapp === data.phone && !!data.phone);

  const handlePhoneChange = (val: string) => {
    if (sameAsPhone) {
      onChange({ ...data, phone: val, whatsapp: val });
    } else {
      onChange({ ...data, phone: val });
    }
  };

  const handleSameAsPhoneToggle = () => {
    const nextVal = !sameAsPhone;
    setSameAsPhone(nextVal);
    if (nextVal) {
      onChange({ ...data, whatsapp: data.phone });
    }
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-[#042F61] mb-1.5">
          Full Name <span className="text-[#B91C1C]">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8175]">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            placeholder="e.g. Victoria Sterling"
            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-white border text-[#14171A] focus:outline-none transition-all ${
              errors.fullName
                ? 'border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]'
                : 'border-[#E6E0D8] focus:border-[#DFB85A] focus:ring-1 focus:ring-[#DFB85A]'
            }`}
          />
        </div>
        {errors.fullName && (
          <p className="text-[11px] text-[#B91C1C] mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-[#042F61] mb-1.5">
          Email Address <span className="text-[#B91C1C]">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8175]">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="e.g. victoria@example.com"
            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-white border text-[#14171A] focus:outline-none transition-all ${
              errors.email
                ? 'border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]'
                : 'border-[#E6E0D8] focus:border-[#DFB85A] focus:ring-1 focus:ring-[#DFB85A]'
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-[11px] text-[#B91C1C] mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Number - Full Width */}
      <div>
        <label className="block text-xs font-semibold text-[#042F61] mb-1.5">
          Phone Number <span className="text-[#B91C1C]">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8175]">
            <Phone className="w-4 h-4" />
          </div>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="+66 81 234 5678"
            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-white border text-[#14171A] focus:outline-none transition-all ${
              errors.phone
                ? 'border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]'
                : 'border-[#E6E0D8] focus:border-[#DFB85A] focus:ring-1 focus:ring-[#DFB85A]'
            }`}
          />
        </div>
        {errors.phone && (
          <p className="text-[11px] text-[#B91C1C] mt-1">{errors.phone}</p>
        )}
      </div>

      {/* WhatsApp - Full Width */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-[#042F61]">
            WhatsApp Number <span className="text-[#B91C1C]">*</span>
          </label>
          <button
            type="button"
            onClick={handleSameAsPhoneToggle}
            className="text-[10px] text-[#8A8175] hover:text-[#042F61] flex items-center gap-1 cursor-pointer transition-colors"
          >
            {sameAsPhone ? (
              <CheckSquare className="w-3 h-3 text-[#9D7C38]" />
            ) : (
              <Square className="w-3 h-3" />
            )}
            <span>Same as phone</span>
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8175]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <input
            type="tel"
            disabled={sameAsPhone}
            value={data.whatsapp}
            onChange={(e) => onChange({ ...data, whatsapp: e.target.value })}
            placeholder="+66 81 234 5678"
            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-white border text-[#14171A] focus:outline-none transition-all ${
              sameAsPhone ? 'bg-[#FAF8F5] text-[#5E574E]' : ''
            } ${
              errors.whatsapp
                ? 'border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]'
                : 'border-[#E6E0D8] focus:border-[#DFB85A] focus:ring-1 focus:ring-[#DFB85A]'
            }`}
          />
        </div>
        {errors.whatsapp && (
          <p className="text-[11px] text-[#B91C1C] mt-1">{errors.whatsapp}</p>
        )}
      </div>

      {/* Optional Notes / Message */}
      <div>
        <label className="block text-xs font-semibold text-[#042F61] mb-1.5">
          Special Requests or Questions <span className="text-[#8A8175] font-normal">(Optional)</span>
        </label>
        <textarea
          rows={3}
          value={data.notes}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder="e.g. Looking to stay for 4 months from November; interested in high-floor units."
          className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#E6E0D8] text-[#14171A] focus:outline-none focus:border-[#DFB85A] focus:ring-1 focus:ring-[#DFB85A] transition-all resize-none"
        />
      </div>
    </div>
  );
};
