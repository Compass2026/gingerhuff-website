import { useEffect, useState, FormEvent } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles, Clock } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Edwardsville, IL',
    serviceType: 'Home Interiors',
    investment: 'Not sure yet',
    details: '',
    website: ''
  });

  const [error, setError] = useState('');
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => { setStartedAt(Date.now()); }, []);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const locations = [
    'Edwardsville, IL',
    'Glen Carbon, IL',
    'Clayton, MO',
    'Ladue, MO',
    'Town and Country, MO',
    'Other / National (Virtual E-Design)'
  ];

  const serviceTypes = [
    'Home Interiors',
    'Kitchen & Bath',
    'Commercial Design',
    'E-Design & Virtual Consultation',
    'Window Treatments',
    'Other Custom Design Sourcing'
  ];

  const budgetRanges = [
    'Not sure yet',
    'Under $10,000 (Consulting / Accessories)',
    '$10,000 - $25,000 (Single Room Remodel)',
    '$25,000 - $50,000 (Multi-Room Update)',
    '$50,000 - $100,000 (Custom Kitchen or Bath)',
    'Over $100,000 (Full Home / New Build Consultation)'
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...formData, startedAt}), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'Your inquiry could not be sent. Please try again or contact us directly.');
      setSubmitted(true);
    } catch (error) { setError(error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'We could not confirm delivery. Please try again or email ghi@gingerhuffinteriors.com.'); }
    finally { setLoading(false); }
  };

  return (
    <section id="contact-section" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen flex items-center justify-center">
      {/* Background ambient radial circles */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Sourcing Contact Details Panel (Left - Col 5) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div>
              <span className="text-brand-500 uppercase tracking-[0.25em] text-xs font-semibold font-mono">
                Initiate Project
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 font-light tracking-tight mt-2 mb-6">
                Start Your <br />
                <span className="italic font-normal text-brand-500">Design Chapter</span>
              </h2>
              <div className="w-24 h-[1px] bg-brand-500/50"></div>
            </div>

            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              Tell us about your space, your ideas, and what you would like to change. You can also reach Ginger directly by phone or email.
            </p>

            {/* Direct Info list card */}
            <div className="glass p-6 sm:p-8 rounded-[28px] border border-stone-100 space-y-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-500/10 border border-brand-500/20 text-brand-500 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-brand-500 mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:ghi@gingerhuffinteriors.com"
                    className="text-stone-800 hover:text-brand-500 text-sm sm:text-base font-light transition-colors"
                  >
                    ghi@gingerhuffinteriors.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-500/10 border border-brand-500/20 text-brand-500 rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-brand-500 mb-1">
                    Phone
                  </h4>
                  <a
                    href="tel:6187919113"
                    className="text-stone-800 hover:text-brand-500 text-sm sm:text-base font-light transition-colors"
                  >
                    (618) 791-9113
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-500/10 border border-brand-500/20 text-brand-500 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-brand-500 mb-1">
                    Service Area
                  </h4>
                  <p className="text-stone-700 text-sm sm:text-base font-light">
                    Edwardsville & Clayton, St. Louis Metro Area
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-500/10 border border-brand-500/20 text-brand-500 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-brand-500 mb-1">
                    Availability
                  </h4>
                  <p className="text-stone-700 text-sm sm:text-base font-light">
                    Monday through Saturday: 9:00 AM to 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Micro badge of credibility */}
            <div className="flex items-center gap-2 text-xs text-stone-400 pl-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Let’s begin with a complimentary consultation.</span>
            </div>
          </div>

          {/* Consultation questionnaire (Right - Col 7) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-[32px] p-6 sm:p-10 md:p-12 border border-white/12 shadow-2xl relative">
              
              {!submitted ? (
                <>
                <noscript><p>Please email ghi@gingerhuffinteriors.com or call 618-791-9113 to inquire. The form requires JavaScript.</p></noscript>
                <form id="contact-intake-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Two-Column Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="input-name" className="text-xs uppercase tracking-wider text-stone-600 font-mono">
                        Your Name *
                      </label>
                      <input
                        id="input-name"
                        autoComplete="name"
                        maxLength={120}
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Katherine McDonald"
                        className="w-full glass-input text-stone-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all font-light"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="input-email" className="text-xs uppercase tracking-wider text-stone-600 font-mono">
                        Email Address *
                      </label>
                      <input
                        id="input-email"
                        autoComplete="email"
                        maxLength={254}
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. mcdonald@example.com"
                        className="w-full glass-input text-stone-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="input-phone" className="text-xs uppercase tracking-wider text-stone-600 font-mono">
                      Telephone Number
                    </label>
                    <input
                      id="input-phone"
                      autoComplete="tel"
                      maxLength={60}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. (314) 555-0199"
                      className="w-full glass-input text-stone-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all font-light"
                    />
                  </div>

                  {/* Location Selection Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="input-location" className="text-xs uppercase tracking-wider text-stone-600 font-mono">
                      Project Location *
                    </label>
                    <select
                      id="input-location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full glass-input text-stone-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-500/60 transition-all font-light bg-white"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc} className="bg-white text-stone-900">
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service type Selection */}
                  <div className="space-y-2">
                    <label htmlFor="input-service" className="text-xs uppercase tracking-wider text-stone-600 font-mono">
                      Service Interested In *
                    </label>
                    <select
                      id="input-service"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full glass-input text-stone-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-500/60 transition-all font-light bg-white"
                    >
                      {serviceTypes.map((serv) => (
                        <option key={serv} value={serv} className="bg-white text-stone-900">
                          {serv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Plan Budget selection */}
                  <div className="space-y-2">
                    <label htmlFor="input-investment" className="text-xs uppercase tracking-wider text-stone-600 font-mono">
                      Estimated Project Budget *
                    </label>
                    <select
                      id="input-investment"
                      value={formData.investment}
                      onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                      className="w-full glass-input text-stone-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-500/60 transition-all font-light bg-white"
                    >
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-white text-stone-900">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <label htmlFor="input-details" className="text-xs uppercase tracking-wider text-stone-600 font-mono">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      id="input-details"
                      minLength={10}
                      maxLength={5000}
                      required
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Share a short summary. e.g., We are looking to remodel our Ladue kitchen using custom white-oak cabinetry, marble waterfall islands, and new integrated lighting..."
                      className="w-full glass-input text-stone-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all font-light resize-none"
                    />
                  </div>

                  <div className="form-honeypot" aria-hidden="true"><label htmlFor="input-website">Leave this field empty</label><input id="input-website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={e=>setFormData({...formData,website:e.target.value})}/></div>
                  <p className="text-sm text-stone-600">We use your information to respond to this inquiry. <a href="/privacy/" className="underline text-brand-700">Privacy notice</a></p>
                  {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 text-red-800 p-4 text-sm">{error}</p>}
                  {/* Submission triggers */}
                  <button
                    id="submit-intake-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-stone-900 font-semibold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-55 disabled:pointer-events-none flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-brand-500/20"
                  >
                    {loading ? (
                      <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin inline-block"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Send Inquiry
                      </>
                    )}
                  </button>

                </form></>
              ) : (
                /* Gorgeous success confirmation glass box */
                <div id="contact-success-box" role="status" aria-live="polite" className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-brand-500/10 border border-brand-500/30 rounded-full flex items-center justify-center mx-auto text-brand-500 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-brand-500 font-bold">
                      Inquiry Sent
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide">
                      Thank You, <br />
                      <span className="italic text-brand-500">{formData.name}</span>
                    </h3>
                    <p className="text-stone-700 max-w-md mx-auto text-xs sm:text-sm font-light leading-relaxed">
                      Your inquiry has been sent to Ginger Huff Interiors. Our team will follow up using the contact details you provided. If you need to reach us sooner, call (618) 791-9113.
                    </p>
                  </div>

                  <div className="h-[1px] bg-white max-w-xs mx-auto"></div>

                  <div className="space-y-1 text-center">
                    <p className="text-[11px] text-stone-400 font-mono uppercase tracking-wider">
                      Assigned Location Focus
                    </p>
                    <p className="text-xs text-brand-500 font-semibold">{formData.location}</p>
                  </div>

                  <button
                    id="contact-reset-btn"
                    onClick={() => {
                      setSubmitted(false); setError(''); setStartedAt(Date.now());
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        location: 'Edwardsville, IL',
                        serviceType: 'Home Interiors',
                        investment: 'Not sure yet',
                        details: '',
                        website: ''
                      });
                    }}
                    className="glass border-white/20 text-stone-700 hover:text-stone-900 px-5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
                  >
                    Submit another Inquiry
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
