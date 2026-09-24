import { useState } from 'react'
import { motion } from 'framer-motion'
import { Info, Navigation2 } from 'lucide-react'
import FeatureHero from '../../components/FeatureHero'
import EmptyState from '../../components/EmptyState'
import Button from '../../components/Button'
import { Card, CardContent } from '../../components/ui/card'
import { buses } from '../../data/buses'
import { getAvailableStops, getBusesForStop, recommendBus } from './busLogic'
import BusSearch from './BusSearch'
import BusRecommendation from './BusRecommendation'
import BusCard from './BusCard'
import RouteTimeline from './RouteTimeline'
import Reveal from '../../components/motion/Reveal'

export default function BusPage() {
  const [stop, setStop] = useState('')
  const stops = getAvailableStops(buses)
  const matches = stop ? getBusesForStop(buses, stop) : []
  const { recommended, nextAvailable, reason, ordered } = recommendBus(matches)

  return (
    <section className="bg-slate-50">
      <FeatureHero variant="bus" title="Find My Bus" question="Which bus should I take right now?" description="The page behaves like a route signal before it behaves like a form: movement, live-state cues and one recommended next bus." meta="Simulated Live Demo" />

      <div className="relative z-10 -mt-10 rounded-t-[42px] bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <Reveal>
            <Card className="border-blue-100/80">
              <CardContent className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <BusSearch stops={stops} value={stop} onChange={setStop} />
                <Button variant="secondary" onClick={() => setStop('Cuddalore')}><Navigation2 className="h-4 w-4" /> Try Cuddalore demo</Button>
              </CardContent>
            </Card>
          </Reveal>

          <div className="mt-6 grid gap-5">
            {!stop ? <EmptyState title="Choose your stop" description="Select a stop to compare upcoming demo buses. Cuddalore is prepared as the flagship competition scenario." action={<Button onClick={() => setStop('Cuddalore')}>Use Cuddalore</Button>} /> : matches.length === 0 ? <EmptyState title="No demo route found" description="This prototype does not have a simulated bus for that stop yet." /> : <>
              {recommended ? <BusRecommendation bus={recommended} reason={reason} nextAvailable={nextAvailable} /> : <EmptyState title="No upcoming demo bus" description="All matching simulated buses have already crossed this stop." />}
              <Reveal><div className="grid gap-3">{ordered.map((bus) => <BusCard key={bus.id} bus={bus} recommended={recommended?.id === bus.id} />)}</div></Reveal>
              <RouteTimeline bus={recommended} selectedStop={stop} />
            </>}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-6 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900"><Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><p><strong>Prototype disclosure:</strong> Bus numbers, route positions and ETAs are simulated demonstration data, not official live IFET GPS or ETA information.</p></motion.div>
        </div>
      </div>
    </section>
  )
}
