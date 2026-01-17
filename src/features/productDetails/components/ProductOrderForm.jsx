import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';
import { createProductOrder } from '../../../api/productOrder';
import AnimatedButton from '../../../components/ui/AnimatedButton';

const ProductOrderForm = ({ product }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+962',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [submitMessage, setSubmitMessage] = useState('');

  // Validation functions
  const validateName = name => {
    if (!name || name.trim().length === 0) {
      return isRTL ? 'الاسم مطلوب' : 'Name is required';
    }
    if (name.trim().length < 2) {
      return isRTL ? 'الاسم يجب أن يكون على الأقل حرفين' : 'Name must be at least 2 characters';
    }
    if (name.trim().length > 100) {
      return isRTL ? 'الاسم يجب أن يكون أقل من 100 حرف' : 'Name must be less than 100 characters';
    }
    if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(name.trim())) {
      return isRTL ? 'الاسم يجب أن يحتوي على أحرف فقط' : 'Name must contain only letters';
    }
    return '';
  };

  const validatePhone = phone => {
    if (!phone || phone.trim().length === 0) {
      return isRTL ? 'رقم الجوال مطلوب' : 'Phone number is required';
    }
    // Remove spaces and dashes for validation
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!/^\d+$/.test(cleanPhone)) {
      return isRTL ? 'رقم الجوال يجب أن يحتوي على أرقام فقط' : 'Phone number must contain only digits';
    }
    if (cleanPhone.length < 7) {
      return isRTL ? 'رقم الجوال قصير جداً' : 'Phone number is too short';
    }
    if (cleanPhone.length > 15) {
      return isRTL ? 'رقم الجوال طويل جداً' : 'Phone number is too long';
    }
    return '';
  };

  const validateEmail = email => {
    if (!email || email.trim().length === 0) {
      return ''; // Email is optional
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return isRTL ? 'البريد الإلكتروني غير صحيح' : 'Invalid email format';
    }
    if (email.trim().length > 255) {
      return isRTL ? 'البريد الإلكتروني طويل جداً' : 'Email is too long';
    }
    return '';
  };

  const validateMessage = message => {
    if (!message || message.trim().length === 0) {
      return ''; // Message is optional
    }
    if (message.trim().length > 1000) {
      return isRTL ? 'الرسالة يجب أن تكون أقل من 1000 حرف' : 'Message must be less than 1000 characters';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error =
      field === 'name'
        ? validateName(formData.name)
        : field === 'phone'
        ? validatePhone(formData.phone)
        : field === 'email'
        ? validateEmail(formData.email)
        : validateMessage(formData.message);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (touched[field] && errors[field]) {
      const error =
        field === 'name' ? validateName(value) : field === 'phone' ? validatePhone(value) : field === 'email' ? validateEmail(value) : validateMessage(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
    });

    // Validate form
    if (!validateForm()) {
      setSubmitStatus('error');
      setSubmitMessage(isRTL ? 'يرجى تصحيح الأخطاء في النموذج' : 'Please correct the errors in the form');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      await createProductOrder({
        productId: product?.id || null,
        name: formData.name.trim(),
        phone: formData.phone.replace(/[\s-]/g, ''), // Remove spaces and dashes
        countryCode: formData.countryCode,
        email: formData.email.trim() || null,
        message: formData.message.trim() || null,
      });

      setSubmitStatus('success');
      setSubmitMessage(isRTL ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' : 'Your order has been submitted successfully! We will contact you soon.');

      // Reset form
      setFormData({
        name: '',
        phone: '',
        countryCode: '+962',
        email: '',
        message: '',
      });
      setErrors({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
      setTouched({
        name: false,
        phone: false,
        email: false,
        message: false,
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        (isRTL ? 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.' : 'An error occurred while submitting your order. Please try again.');
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  return (
    <div className={`${isRTL ? 'lg:order-1' : ''}`}>
      <div className="bg-[var(--color-card-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm sticky top-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="min-w-12 min-h-12 bg-[var(--color-text)] rounded-full flex items-center justify-center">
            <Phone className="text-[var(--color-text2)]" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-[var(--color-text)]">{isRTL ? 'اطلب المنتج الآن' : 'Order Product Now'}</h3>
            <p className={`text-sm text-[var(--color-text-muted)] ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL
                ? 'أضف المنتج إلى قائمة طلباتك وسنقوم بالتواصل معك خلال دقائق.'
                : 'Add the product to your requests list and we will contact you within minutes.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'الاسم' : 'Name'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`w-full px-4 py-3 border rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)]   transition-all ${
                touched.name && errors.name ? '' : 'border-[var(--color-border)] focus:border-border'
              }`}
              required
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {touched.name && errors.name && <p className={`text-sm text-red-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.name}</p>}
          </div>

          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'رقم الجوال' : 'Mobile Number'} <span className="text-red-500">*</span>
            </label>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <select
                value={formData.countryCode}
                onChange={e => handleChange('countryCode', e.target.value)}
                className="px-3 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)]   focus:border-border transition-all"
              >
                <option value="+962">+962</option>
                <option value="+971">+971</option>
                <option value="+966">+966</option>
                <option value="+965">+965</option>
                <option value="+974">+974</option>
                <option value="+973">+973</option>
                <option value="+968">+968</option>
              </select>
              <div className="flex-1">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  className={`w-full px-4 py-3 border rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)]   transition-all ${
                    touched.phone && errors.phone
                      ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                      : 'border-[var(--color-border)] focus:border-border'
                  }`}
                  required
                  dir="ltr"
                />
                {touched.phone && errors.phone && <p className={`text-sm text-red-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'البريد' : 'Email'} <span className="text-[var(--color-text-muted)] text-xs">({isRTL ? 'اختياري' : 'Optional'})</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`w-full px-4 py-3 border rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)]   transition-all ${
                touched.email && errors.email
                  ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                  : 'border-[var(--color-border)] focus:border-border'
              }`}
              dir="ltr"
            />
            {touched.email && errors.email && <p className={`text-sm text-red-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.email}</p>}
          </div>

          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'رسالة' : 'Message'} <span className="text-[var(--color-text-muted)] text-xs">({isRTL ? 'اختياري' : 'Optional'})</span>
            </label>
            <textarea
              value={formData.message}
              onChange={e => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              className={`w-full px-4 py-3 border rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text)]   transition-all h-24 resize-none ${
                touched.message && errors.message
                  ? 'border-[var(--color-destructive)] focus:border-[var(--color-destructive)]'
                  : 'border-[var(--color-border)] focus:border-border'
              }`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {touched.message && errors.message && <p className={`text-sm text-red-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{errors.message}</p>}
          </div>

          {/* Status Message */}
          {submitStatus && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 ${
                submitStatus === 'success'
                  ? 'bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20'
                  : 'bg-[var(--color-destructive)]/5 border border-[var(--color-destructive)]/20'
              }`}
            >
              {submitStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-[var(--color-destructive)] mt-0.5 flex-shrink-0" />
              )}
              <p
                className={`text-sm ${submitStatus === 'success' ? 'text-[var(--color-accent)]' : 'text-[var(--color-destructive)]'} ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {submitMessage}
              </p>
            </div>
          )}

          <AnimatedButton
            type="submit"
            disabled={isSubmitting}
            text={isRTL ? 'اطلب المنتج الآن' : 'Order Product Now'}
            variant="primary"
            textSize="base"
            className="w-full"
            icon={ShoppingCart}
          />
        </form>
      </div>
    </div>
  );
};

export default ProductOrderForm;
