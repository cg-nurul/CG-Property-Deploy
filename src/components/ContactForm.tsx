import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { InquiryFormData } from '../types';
import { PROPERTIES } from '../data/properties';
import { Send, CheckCircle2, Mail, Phone, MapPin, Building2 } from 'lucide-react';

interface ContactFormProps {
  defaultProperty?: string;
  defaultType?: 'property' | 'booking' | 'general' | 'partnership';
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultProperty, defaultType = 'property' }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    enquiryType: defaultType,
    propertyInterest: defaultProperty || '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate swift submission handling
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div id="contact-form-component" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E0D8] shadow-sm">
      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#38761D]/10 text-[#38761D] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-[#042F61]">
            Enquiry Received
          </h3>
          <p className="text-sm text-[#5E574E] max-w-md mx-auto leading-relaxed">
            {t('contact.form.success')}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                enquiryType: 'property',
                propertyInterest: '',
                message: '',
              });
            }}
            className="mt-4 inline-flex items-center text-xs font-semibold text-[#042F61] hover:text-[#9D7C38] transition-colors cursor-pointer"
          >
            Submit another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-2">
                {t('contact.form.name')} <span className="text-[#9D7C38]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alexander Wright"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8] text-sm text-[#14171A] focus:outline-hidden focus:ring-2 focus:ring-[#042F61]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-2">
                {t('contact.form.email')} <span className="text-[#9D7C38]">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. alexander@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8] text-sm text-[#14171A] focus:outline-hidden focus:ring-2 focus:ring-[#042F61]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-2">
                {t('contact.form.phone')}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+66 (0) 00 000 0000"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8] text-sm text-[#14171A] focus:outline-hidden focus:ring-2 focus:ring-[#042F61]"
              />
            </div>

            {/* Enquiry Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-2">
                {t('contact.form.type')}
              </label>
              <select
                value={formData.enquiryType}
                onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8] text-sm text-[#14171A] focus:outline-hidden focus:ring-2 focus:ring-[#042F61]"
              >
                <option value="property">{t('contact.form.typeProperty')}</option>
                <option value="booking">{t('contact.form.typeBooking')}</option>
                <option value="general">{t('contact.form.typeGeneral')}</option>
                <option value="partnership">{t('contact.form.typePartnership')}</option>
              </select>
            </div>
          </div>

          {/* Property of interest selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-2">
              {t('contact.form.property')}
            </label>
            <select
              value={formData.propertyInterest}
              onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8] text-sm text-[#14171A] focus:outline-hidden focus:ring-2 focus:ring-[#042F61]"
            >
              <option value="">Select a residence (or general interest)</option>
              {PROPERTIES.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} — {p.location} ({p.tower} · {p.floor})
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A453E] mb-2">
              {t('contact.form.message')} <span className="text-[#9D7C38]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we assist you with your inquiry?"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8] text-sm text-[#14171A] focus:outline-hidden focus:ring-2 focus:ring-[#042F61]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#042F61] hover:bg-[#021B38] text-white py-3.5 px-6 rounded-2xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-99"
          >
            <Send className="w-4 h-4 text-white" />
            <span className="text-white font-semibold">{loading ? 'Submitting...' : t('contact.form.submit')}</span>
          </button>
        </form>
      )}
    </div>
  );
};
