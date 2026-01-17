import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { submitContactRequest } from '../../../queries/contactPage.queries';
import AnimatedButton from '../../../components/ui/AnimatedButton';

const ContactForm = ({ requestTypes }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    requestTypeId: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await submitContactRequest(formData);
      // Check if response has success message
      if (response?.message || response?.success) {
        setSubmitSuccess(true);
        setFormData({
          requestTypeId: '',
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting contact request:', error);
      setSubmitError(error?.message || error?.error?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Base input styles - white background, light borders, soft corners
  const inputBaseClasses =
    'w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-elevated)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border)] transition-all text-sm';

  // Dark navy button color - matches dark palette
  const buttonDarkColor = '#0f172a'; // Using --color-bg-elev dark mode value
  const buttonDarkHover = '#1e293b'; // Slightly lighter for hover

  return (
    <motion.div
      className={`${isRTL ? 'lg:col-start-2' : ''} relative z-10 ${isRTL ? 'lg:-mr-4' : 'lg:-ml-4'}`}
      initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-[var(--color-card-surface)] rounded-xl p-6 md:p-8 shadow-sm">
        {/* Header */}
        <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">{isRTL ? 'أخبرنا بما تحتاجه' : 'Tell us what you need'}</h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            {isRTL ? 'فريقنا جاهز لمساندتك والإجابة على جميع استفساراتك.' : 'Our team is ready to assist you and answer all your inquiries.'}
          </p>
        </div>

        {submitSuccess && (
          <div className={`mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'تم إرسال رسالتك بنجاح. سنعود إليك قريباً.' : 'Your message has been sent successfully. We will get back to you soon.'}
          </div>
        )}

        {submitError && (
          <div className={`mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{submitError}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name - placeholder only */}
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={isRTL ? 'الاسم الكامل' : 'Full Name'}
              className={inputBaseClasses}
              required
            />
          </div>

          {/* Phone Number - with dropdown arrow and country code selector */}
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={isRTL ? 'رقم الجوال' : 'Mobile Number'}
              className={`${inputBaseClasses} ${isRTL ? 'pl-20' : 'pr-20'}`}
            />
            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} pointer-events-none flex items-center gap-1`}>
              <div className="w-10 h-6 bg-[var(--color-muted)] rounded flex items-center justify-center">
                <span className="text-[10px] text-[var(--color-text-muted)]">+962</span>
              </div>
              <ChevronDown className="text-[var(--color-text-muted)]" size={12} />
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'}
              className={inputBaseClasses}
              required
            />
          </div>

          {/* Company - optional */}
          <div>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder={isRTL ? 'اسم الشركة (اختياري)' : 'Company Name (Optional)'}
              className={inputBaseClasses}
            />
          </div>

          {/* Request Type - styled like input with dropdown arrow */}
          <div className="relative">
            <select
              id="requestTypeId"
              name="requestTypeId"
              value={formData.requestTypeId}
              onChange={handleInputChange}
              className={`${inputBaseClasses} appearance-none cursor-pointer ${isRTL ? 'pl-10' : 'pr-10'} ${
                !formData.requestTypeId ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text)]'
              }`}
              required
            >
              <option value="" disabled>
                {isRTL ? 'اختر نوع الطلب:' : 'Select Request Type:'}
              </option>
              {requestTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {isRTL ? type.nameAr : type.nameEn}
                </option>
              ))}
            </select>
            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} pointer-events-none`}>
              <ChevronDown className="text-[var(--color-text-muted)]" size={14} />
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={isRTL ? 'رسالة' : 'Message'}
              rows={6}
              className={`${inputBaseClasses} resize-none`}
              required
            />
          </div>

          {/* Submit Button - dark navy, not brand blue */}
          <AnimatedButton
            type="submit"
            disabled={submitting}
            text={submitting ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : isRTL ? 'إرسال الرسالة' : 'Send Message'}
            variant="staticDark"
            textSize="base"
            className="w-full"
          />
          {/* Footer Text */}
          <p className={`text-xs text-[var(--color-text-muted)] text-center mt-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'سيقوم فريقنا بالتواصل معك خلال أقل من 24 ساعة.' : 'Our team will contact you within 24 hours.'}
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
