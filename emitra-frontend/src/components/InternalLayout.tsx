import { ReactNode } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, ShieldCheck, Calculator, FileText } from 'lucide-react';
import { useEmitra } from '../context/EmitraContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload', label: '1. Upload Data', icon: Upload },
  { to: '/validate', label: '2. AI Validation', icon: ShieldCheck },
  { to: '/calculate', label: '3. Scope 1 & 2', icon: Calculator },
  { to: '/report', label: '4. Submit Report', icon: FileText },
];

const steps = [
  { path: '/upload', label: '1. Upload Data', desc: 'Invoices, PLN, Logs' },
  { path: '/validate', label: '2. AI Validation', desc: 'OCR & Verification' },
  { path: '/calculate', label: '3. Scope 1 & 2', desc: 'Carbon Calculation' },
  { path: '/report', label: '4. Submit Report', desc: 'EU Submission XML' }
];

const tourDetails: Record<number, { title: string; desc: string; target: string }> = {
  1: {
    title: 'Step 1: Data Ingestion',
    desc: 'Welcome to the Emitra Workspace! Let\'s begin by uploading operational data. Click the flashing "1. Upload Data" link in the sidebar.',
    target: 'sidebar'
  },
  2: {
    title: 'Step 2: Upload Documents',
    desc: 'Click on the "Document Upload Zone" box to select or drag in an energy bill or factory log document to run the AI parser.',
    target: 'upload'
  },
  3: {
    title: 'Step 3: Verification Queue',
    desc: 'The document data has been parsed by our OCR engine. Now, click the flashing "2. AI Validation" link to audit the parameters.',
    target: 'sidebar'
  },
  4: {
    title: 'Step 4: HITL Verification',
    desc: 'Check the extracted values against the simulated invoice. Click "Confirm & Verify Field" on pending entries to approve.',
    target: 'validate'
  },
  5: {
    title: 'Step 5: Run Calculations',
    desc: 'All energy and production values are locked and verified. Click the flashing "3. Scope 1 & 2" link to calculate carbon footprint values.',
    target: 'sidebar'
  },
  6: {
    title: 'Step 6: Review Cost Savings',
    desc: 'Review emissions Scope 1, Scope 2, intensity metrics, and financial audit cost savings. Then, click the flashing "4. Submit Report" link.',
    target: 'sidebar'
  },
  7: {
    title: 'Step 7: SOAP XML Submission',
    desc: 'Click the blue "Submit to EU Portal" button to simulate direct cryptographic submission to the European SOAP Registry.',
    target: 'report'
  },
  8: {
    title: 'Compliance Completed! 🎉',
    desc: 'Congratulations! You have completed the entire EU-CBAM compliance reporting workflow in under 3 minutes. Click "Finish Tour" to restart.',
    target: 'finish'
  }
};

export function InternalLayout({ children }: { children: ReactNode }) {
  const { tourStep, setTourStep } = useEmitra();
  const location = useLocation();
  const currentPath = location.pathname;
  const activeStepIndex = steps.findIndex(s => s.path === currentPath);
  const showStepper = currentPath !== '/dashboard';

  return (
    <div className="min-h-screen flex bg-[#080b14]">
      {/* ─────── Side Navigation Bar ─────── */}
      <aside className="w-64 bg-gradient-to-b from-[#0a0f1a]/95 to-[#080b14]/95 backdrop-blur-xl border-r border-[#10b981]/15 p-4 flex flex-col relative shrink-0">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(10, 135, 84, 0.05) 0%, transparent 60%)'
          }}
        />

        {/* Click-able brand logo linking back to Landing page */}
        <Link to="/" className="flex items-center gap-2.5 px-3 py-4 mb-8 relative z-10 hover:opacity-85 transition-opacity cursor-pointer text-decoration-none">
          <img src="/favicon.svg" alt="Emitra" className="w-9 h-9 rounded-xl shadow-lg shadow-emeraldc/20" />
          <div>
            <span className="font-heading font-bold text-base text-white tracking-tight">Emitra</span>
            <p className="text-[10px] uppercase tracking-widest text-[#10b981] font-bold mt-0.5">CBAM Compliance</p>
          </div>
        </Link>

        {/* Sidebar NavLinks with premium active state styling */}
        <nav className="flex-1 space-y-1.5 relative z-10">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isTourTarget =
              (tourStep === 1 && to === '/upload') ||
              (tourStep === 3 && to === '/validate') ||
              (tourStep === 5 && to === '/calculate') ||
              (tourStep === 6 && to === '/report');

            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/dashboard'}
                style={{ textDecoration: 'none' }}
                onClick={() => {
                  if (tourStep === 1 && to === '/upload') setTourStep(2);
                  if (tourStep === 3 && to === '/validate') setTourStep(4);
                  if (tourStep === 5 && to === '/calculate') setTourStep(6);
                  if (tourStep === 6 && to === '/report') setTourStep(7);
                }}
              >
                {({ isActive }) => (
                  <div className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#10b981]/15 to-transparent text-white border-[#10b981]/30 shadow-[inset_1px_1px_0_rgba(255,255,255,0.05),0_8px_20px_-8px_rgba(10,135,84,0.25)]'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] border-transparent'
                  } ${isTourTarget ? 'tour-pulse' : ''}`}>
                    <Icon className={`w-4 h-4 ${isActive || isTourTarget ? 'text-[#10b981]' : 'text-zinc-600'}`} />
                    <span>{label}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Clean generic status footer credits */}
        <div className="pt-5 border-t border-white/[0.04] relative z-10 px-3">
          <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Compliance Status</div>
          <p className="text-[9px] text-[#0d9d63] font-semibold mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9d63] animate-pulse" />
            Active · Secure
          </p>
        </div>
      </aside>

      {/* ─────── Main Content Workspace ─────── */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="dashboard">
          <div className="d-grain" />
          <div className="d-pattern" />
          <div className="d-content max-w-6xl mx-auto w-full py-8 px-8">
            
            {/* ─────── Interactive Stepper Progress Tracker ─────── */}
            {showStepper && (
              <div className="mb-8 p-5 bg-gradient-to-r from-[#0d1527] to-[#080d1a] border border-[#10b981]/25 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.06)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 rounded-full filter blur-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0ea5e9]/5 rounded-full filter blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between relative z-10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="text-[9px] uppercase tracking-widest text-[#10b981] font-bold">Automatic Workflow sync</span>
                  </div>
                  <span className="text-[9px] text-zinc-500 font-medium">Step progress updates dynamically</span>
                </div>
                
                <div className="grid grid-cols-4 gap-3 relative z-10">
                  {steps.map((step, idx) => {
                    const isActive = step.path === currentPath;
                    const isCompleted = activeStepIndex > idx;
                    
                    return (
                      <Link 
                        key={step.path} 
                        to={step.path} 
                        style={{ textDecoration: 'none' }}
                        className={`flex flex-col p-3.5 rounded-xl border transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-[#10b981]/15 to-[#0b633b]/5 border-[#10b981]/45 text-white shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-[1.01]' 
                            : isCompleted
                            ? 'bg-transparent border-[#10b981]/20 text-[#10b981] hover:border-[#10b981]/35'
                            : 'bg-transparent border-white/[0.04] text-zinc-500 hover:border-white/[0.1]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isActive
                              ? 'bg-[#10b981] text-[#080b14] shadow-[0_0_10px_#10b981]'
                              : isCompleted
                              ? 'bg-[#10b981]/20 text-[#10b981]'
                              : 'bg-zinc-800 text-zinc-600'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </span>
                          <span className="text-xs font-bold tracking-tight">{step.label}</span>
                        </div>
                        <span className="text-[9px] text-zinc-500 mt-1 pl-7 leading-none truncate">{step.desc}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {children}
          </div>
        </div>
      </main>

      {/* ─────── Walkthrough Tour Popup Guide ─────── */}
      {(tourStep >= 1 && tourStep <= 8 || tourStep === 0) && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 10000,
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(13, 21, 39, 0.98), rgba(8, 13, 26, 0.98))',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(10, 135, 84, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          maxWidth: '320px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          {tourStep === 0 ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} className="animate-pulse" />
                <span style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#10b981' }}>Guided Tour</span>
              </div>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>
                Start Guided Simulation!
              </h4>
              <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#a1a1aa', lineHeight: '1.5' }}>
                Welcome to the Emitra workspace. Click the button below to start the step-by-step CBAM compliance reporting walkthrough.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <button 
                  onClick={() => setTourStep(1)}
                  style={{
                    flex: 1,
                    background: '#10b981',
                    color: '#080b14',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  Start Guided Walkthrough
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} className="animate-pulse" />
                  <span style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#10b981' }}>Guided Walkthrough</span>
                </div>
                <span style={{ fontSize: '9px', color: '#71717a', fontWeight: 'bold', marginLeft: 'auto' }}>Step {tourStep} of 8</span>
              </div>
              
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>
                {tourDetails[tourStep]?.title}
              </h4>
              <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#a1a1aa', lineHeight: '1.5' }}>
                {tourDetails[tourStep]?.desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {tourStep === 8 ? (
                  <button 
                    onClick={() => {
                      setTourStep(0);
                      window.location.href = '/';
                    }}
                    style={{
                      flex: 1,
                      background: '#10b981',
                      color: '#080b14',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Finish Tour & Restart
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => setTourStep(0)}
                      style={{
                        background: 'transparent',
                        color: '#71717a',
                        border: 'none',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Skip Tour
                    </button>
                    <button 
                      onClick={() => {
                        setTourStep(tourStep + 1);
                      }}
                      style={{
                        marginLeft: 'auto',
                        background: 'rgba(255,255,255,0.06)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Next →
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
