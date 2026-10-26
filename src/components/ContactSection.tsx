import React, { useState } from 'react';
import { brandConfig } from '../data/content';
import { MapPin, ArrowUpRight, CheckCircle2, AlertCircle, X, Send } from 'lucide-react';

interface ContactSectionProps {
  prefilledSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledSubject }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: prefilledSubject || 'Residential Interior Architecture',
    propertyType: '3BHK Residence',
    approxBudget: '₹25 Lakhs – ₹50 Lakhs',
    timeline: 'Within 3 Months',
    projectLocation: 'Satellite, Ahmedabad',
    message: '',
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please provide your name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your contact phone number.';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.consent) {
      errs.consent = 'Please confirm consent to be contacted regarding your space.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('ariva_enquiries') || '[]');
        stored.push({ ...formData, submittedAt: new Date().toISOString() });
        localStorage.setItem('ariva_enquiries', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 800);
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        background: '#0D110F',
        color: '#F9F7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Monumental Header */}
        <div style={{ marginBottom: '4rem', maxWidth: '880px' }}>
          <div className="arch-label">07 / Studio Dialogue · Satellite, Ahmedabad</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              lineHeight: 1.05,
              color: '#F9F7F2',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Your Space Deserves <br />
            <span style={{ fontStyle: 'italic', color: '#E4D4C0', fontWeight: 300, textTransform: 'none' }}>
              A Thoughtful Beginning.
            </span>
          </h2>
          <p style={{ color: '#A3A99E', fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 300 }}>
            Whether you are embarking on a newly acquired residence, an extensive renovation, or a bespoke culinary studio in Satellite, Ahmedabad — we invite you to begin the conversation.
          </p>
        </div>

        {/* 2-Column Architectural Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 5rem)',
          }}
        >
          {/* Left Column: Studio Address & Direct Channels (Cols 1 to 5) */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
            className="contact-info-col"
          >
            {/* Address & Studio Overview */}
            <div style={{ borderTop: '1px solid rgba(197, 168, 128, 0.25)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#C5A880', marginBottom: '0.5rem' }}>
                <MapPin size={16} />
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Studio Location
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: '#F9F7F2', margin: '0.25rem 0 0.5rem 0', textTransform: 'uppercase' }}>
                Satellite · Ahmedabad
              </h3>
              <p style={{ color: '#D6CFBF', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                Satellite, Ahmedabad, Gujarat 380015, India. In-person studio presentations and physical material sample inspections are arranged by appointment.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* WhatsApp Trigger */}
              <button
                type="button"
                onClick={() => setShowConfigModal('whatsapp')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: '#151A17',
                  border: '1px solid rgba(197, 168, 128, 0.25)',
                  color: '#F9F7F2',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}
                className="channel-btn"
              >
                <div>
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', display: 'block' }}>
                    Instant Messaging
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>WhatsApp Studio Consultation</span>
                </div>
                <ArrowUpRight size={18} color="#C5A880" />
              </button>

              {/* Telephone Trigger */}
              <button
                type="button"
                onClick={() => setShowConfigModal('phone')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: '#151A17',
                  border: '1px solid rgba(197, 168, 128, 0.25)',
                  color: '#F9F7F2',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}
                className="channel-btn"
              >
                <div>
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', display: 'block' }}>
                    Direct Telephone
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>Speak With Our Studio Team</span>
                </div>
                <ArrowUpRight size={18} color="#C5A880" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Consultation Form (Cols 6 to 12) */}
          <div
            style={{
              gridColumn: 'span 7',
              background: '#141816',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
            }}
            className="contact-form-col"
          >
            {submissionSuccess ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '56px', height: '56px', border: '1px solid #C5A880', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <CheckCircle2 size={28} color="#C5A880" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#F9F7F2', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Enquiry Received
                </h3>
                <p style={{ color: '#D6CFBF', maxWidth: '460px', margin: '0 auto 2rem auto', fontSize: '0.98rem', lineHeight: 1.65 }}>
                  Thank you, <strong style={{ color: '#C5A880' }}>{formData.fullName}</strong>. Your project inquiry has been preserved. Our studio team will review the parameters for your {formData.propertyType} in {formData.projectLocation} and contact you promptly.
                </p>
                <button onClick={() => setSubmissionSuccess(false)} className="arch-btn-outline" style={{ fontSize: '0.75rem' }}>
                  Submit Another Project Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid rgba(197, 168, 128, 0.2)', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C5A880' }}>
                    Consultation Brief
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#F9F7F2', textTransform: 'uppercase', margin: '0.25rem 0 0 0' }}>
                    Tell Us About Your Space
                  </h3>
                </div>

                {/* Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.45rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Patel"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1rem',
                        background: '#0F1311',
                        border: errors.fullName ? '1px solid #ff6b6b' : '1px solid rgba(197, 168, 128, 0.3)',
                        color: '#F9F7F2',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                      }}
                    />
                    {errors.fullName && <span style={{ color: '#ff6b6b', fontSize: '0.72rem', marginTop: '0.25rem', display: 'block' }}>{errors.fullName}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.45rem' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1rem',
                        background: '#0F1311',
                        border: errors.phone ? '1px solid #ff6b6b' : '1px solid rgba(197, 168, 128, 0.3)',
                        color: '#F9F7F2',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                      }}
                    />
                    {errors.phone && <span style={{ color: '#ff6b6b', fontSize: '0.72rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
                  </div>
                </div>

                {/* Email & Location */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.45rem' }}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1rem',
                        background: '#0F1311',
                        border: errors.email ? '1px solid #ff6b6b' : '1px solid rgba(197, 168, 128, 0.3)',
                        color: '#F9F7F2',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                      }}
                    />
                    {errors.email && <span style={{ color: '#ff6b6b', fontSize: '0.72rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.45rem' }}>
                      Location in Ahmedabad
                    </label>
                    <select
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1rem',
                        background: '#0F1311',
                        border: '1px solid rgba(197, 168, 128, 0.3)',
                        color: '#F9F7F2',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                      }}
                    >
                      <option value="Satellite, Ahmedabad">Satellite, Ahmedabad</option>
                      <option value="Bodakdev, Ahmedabad">Bodakdev, Ahmedabad</option>
                      <option value="Thaltej, Ahmedabad">Thaltej, Ahmedabad</option>
                      <option value="Prahlad Nagar, Ahmedabad">Prahlad Nagar, Ahmedabad</option>
                      <option value="Ambli / Bopal, Ahmedabad">Ambli / Bopal, Ahmedabad</option>
                      <option value="Shela, Ahmedabad">Shela, Ahmedabad</option>
                      <option value="Other Area in Gujarat">Other Area in Gujarat</option>
                    </select>
                  </div>
                </div>

                {/* Scope & Property Type */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.45rem' }}>
                      Scope of Work
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1rem',
                        background: '#0F1311',
                        border: '1px solid rgba(197, 168, 128, 0.3)',
                        color: '#F9F7F2',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                      }}
                    >
                      <option value="Residential Interior Architecture">Residential Interior Architecture</option>
                      <option value="Bespoke Modular Kitchen">Bespoke Modular Kitchen</option>
                      <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                      <option value="Living & Dining Spaces">Living & Dining Spaces</option>
                      <option value="Complete Turnkey Interior Fitout">Complete Turnkey Interior Fitout</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.45rem' }}>
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1rem',
                        background: '#0F1311',
                        border: '1px solid rgba(197, 168, 128, 0.3)',
                        color: '#F9F7F2',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                      }}
                    >
                      <option value="3BHK Residence">3BHK Residence</option>
                      <option value="4BHK Luxury Apartment">4BHK Luxury Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Independent Villa / Bungalow">Independent Villa / Bungalow</option>
                      <option value="2BHK Residence">2BHK Residence</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.45rem' }}>
                    Notes on Spatial Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your spatial aspirations, timeline, or preferred materials..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem',
                      background: '#0F1311',
                      border: '1px solid rgba(197, 168, 128, 0.3)',
                      color: '#F9F7F2',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Consent */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.82rem', color: '#D6CFBF' }}>
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      style={{ accentColor: '#C5A880', width: '16px', height: '16px' }}
                    />
                    <span>I agree to be contacted by Ariva Living regarding this interior project inquiry.</span>
                  </label>
                  {errors.consent && <span style={{ color: '#ff6b6b', fontSize: '0.72rem', marginTop: '0.25rem', display: 'block' }}>{errors.consent}</span>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting} className="arch-btn" style={{ width: '100%', padding: '1.1rem' }}>
                  {isSubmitting ? (
                    <span>Transmitting Project Brief...</span>
                  ) : (
                    <>
                      <span>Submit Spatial Brief</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Config Modal for Unverified Channel */}
      {showConfigModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            background: 'rgba(12, 16, 14, 0.92)',
            backdropFilter: 'blur(20px)',
          }}
          onClick={() => setShowConfigModal(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '480px',
              background: '#151A17',
              border: '1px solid rgba(197, 168, 128, 0.4)',
              padding: '2.25rem',
              color: '#F9F7F2',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowConfigModal(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#A3A99E' }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C5A880', marginBottom: '0.75rem' }}>
              <AlertCircle size={18} />
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                Channel Verification
              </span>
            </div>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Direct Line Pending Verification
            </h4>

            <p style={{ fontSize: '0.9rem', color: '#D6CFBF', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Official telephone and WhatsApp lines are configured once verified credentials are entered into <code>src/data/content.ts</code>.
            </p>

            <p style={{ fontSize: '0.85rem', color: '#8A9185', lineHeight: 1.5, marginBottom: '1.75rem' }}>
              Please utilize the consultation brief form on this page to transmit your project requirements directly to our Ahmedabad studio team.
            </p>

            <button onClick={() => setShowConfigModal(null)} className="arch-btn" style={{ width: '100%' }}>
              Return to Consultation Form
            </button>
          </div>
        </div>
      )}

      <style>{`
        .channel-btn:hover {
          border-color: #C5A880 !important;
          background: #1C221E !important;
          transform: translateY(-2px);
        }
        @media (max-width: 960px) {
          .contact-info-col, .contact-form-col {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
};
