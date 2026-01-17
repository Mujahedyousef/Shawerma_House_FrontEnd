import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createJobApplication } from '../../../queries/careersPage.queries';

const JobApplicationModal = ({ jobId, jobTitle, isOpen, onClose, isRTL }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = isRTL ? 'الاسم مطلوب' : 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = isRTL ? 'الاسم يجب أن يكون على الأقل حرفين' : 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = isRTL ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = isRTL ? 'البريد الإلكتروني غير صحيح' : 'Invalid email format';
      }
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = isRTL ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      const cleanedPhone = formData.phone.replace(/\s/g, '');
      if (!phoneRegex.test(cleanedPhone)) {
        newErrors.phone = isRTL ? 'رقم الهاتف غير صحيح' : 'Invalid phone number format';
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = isRTL ? 'الرسالة مطلوبة' : 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = isRTL ? 'الرسالة يجب أن تكون على الأقل 10 أحرف' : 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createJobApplication({
        jobListingId: jobId,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({
        submit: error.response?.data?.message || (isRTL ? 'حدث خطأ أثناء إرسال الطلب' : 'Failed to submit application'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setErrors({});
    setSubmitSuccess(false);
    onClose();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={handleClose}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60" onClick={handleClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          className={`relative bg-[var(--color-card-surface)] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            isRTL ? 'text-right' : 'text-left'
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="sticky top-0 bg-[var(--color-card-surface)] border-b border-[var(--color-border)] p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">{isRTL ? 'تقديم طلب' : 'Apply for Position'}</h2>
            <button onClick={handleClose} className="p-2 hover:bg-[var(--color-muted)] rounded-full transition-colors" aria-label="Close">
              <X className="w-6 h-6 text-[var(--color-text-muted)]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                  {isRTL ? 'تم إرسال طلبك بنجاح!' : 'Application Submitted Successfully!'}
                </h3>
                <p className="text-[var(--color-text-muted)]">
                  {isRTL ? 'شكراً لتقديمك. سنتواصل معك قريباً.' : 'Thank you for applying. We will contact you soon.'}
                </p>
              </div>
            ) : (
              <>
                <p className="text-[var(--color-text-muted)] mb-6">
                  {isRTL ? 'الوظيفة:' : 'Position:'} <span className="font-semibold text-[var(--color-text)]">{jobTitle}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                      {isRTL ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)]  focus:border-border transition-all ${
                        errors.name ? 'border-red-500' : 'border-[var(--color-border)]'
                      }`}
                      placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)]  focus:border-border transition-all ${
                        errors.email ? 'border-red-500' : 'border-[var(--color-border)]'
                      }`}
                      placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                      {isRTL ? 'رقم الهاتف' : 'Phone Number'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)] focus:border-border transition-all ${
                        errors.phone ? 'border-red-500' : 'border-[var(--color-border)]'
                      }`}
                      placeholder={isRTL ? '+962 7XX XXX XXX' : '+962 7XX XXX XXX'}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                      {isRTL ? 'رسالة' : 'Message'} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-3 border rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)]   focus:border-border transition-all resize-none ${
                        errors.message ? 'border-red-500' : 'border-[var(--color-border)]'
                      }`}
                      placeholder={
                        isRTL ? 'أخبرنا عن نفسك ولماذا أنت مناسب لهذه الوظيفة...' : 'Tell us about yourself and why you are suitable for this position...'
                      }
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  {/* Submit Error */}
                  {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-6 py-3 border border-[var(--color-border)] rounded-xl font-semibold text-[var(--color-text)] hover:bg-[var(--color-muted)] transition-all"
                    >
                      {isRTL ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-[var(--color-section-dark)] text-[var(--color-text-on-dark)] rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (isRTL ? 'جاري الإرسال...' : 'Submitting...') : isRTL ? 'إرسال الطلب' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JobApplicationModal;
