import { useState } from 'react'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import FeatureHero from '../../components/FeatureHero'
import Button from '../../components/Button'
import useLocalStorage from '../../hooks/useLocalStorage'
import { IFET_SCHOLARSHIP_POLICY } from '../../data/scholarships'
import ScholarshipWizard from './ScholarshipWizard'
import ScholarshipResults from './ScholarshipResults'
import Reveal from '../../components/motion/Reveal'

export default function ScholarshipsPage() {
  const [storedProfile, setStoredProfile] = useLocalStorage('fiveways-scholarship-profile', {})
  const [completedProfile, setCompletedProfile] = useState(null)
  function complete(profile) { setStoredProfile(profile); setCompletedProfile(profile) }

  return (
    <section className="bg-slate-50">
      <FeatureHero variant="scholarships" title="Check Scholarships" question="What financial support may be available?" description="A visual match engine turns profile details, scheme rules and document readiness into explainable next steps—without pretending to make an official eligibility decision." meta="Explainable matching" />
      <div className="relative z-10 -mt-10 rounded-t-[42px] bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <Reveal><div className="mb-6 flex flex-col gap-4 rounded-[26px] border border-violet-100 bg-violet-50 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-violet-600 text-white"><ShieldCheck className="h-5 w-5" /></span><div><strong className="text-sm text-violet-950">Verified college guidance</strong><p className="mt-1 max-w-3xl text-xs leading-5 text-violet-900/60">Scheme names and college support guidance are grounded in IFET's published Scholarship Policy. Matching remains a non-authoritative prototype.</p></div></div><a href={IFET_SCHOLARSHIP_POLICY} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-extrabold text-violet-700">Open IFET policy <ExternalLink className="h-4 w-4" /></a></div></Reveal>
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Important:</strong> FIVEWAYS does not determine final eligibility. Results use cautious guidance such as “you may be eligible” and should be verified with official scheme rules and the college support office.</div>
          {!completedProfile ? <ScholarshipWizard initialProfile={storedProfile} onComplete={complete} /> : <><div className="mb-4"><Button variant="secondary" onClick={() => setCompletedProfile(null)}>Edit profile</Button></div><ScholarshipResults profile={completedProfile} /></>}
        </div>
      </div>
    </section>
  )
}
