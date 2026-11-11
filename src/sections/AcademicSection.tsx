import { motion } from 'framer-motion'

const education = [
  {
    institution: 'Wrexham University',
    title: 'Bachelor of Science - BS, Computer Software Engineering',
    period: 'Sep 2025 - Sep 2026',
  },
  {
    institution: 'IJSE-Institute of Software Engineering',
    title: 'Higher National Diploma, Computer Software Engineering',
    period: 'Aug 2022 - Apr 2025',
  },
  {
    institution: "St. Aloysius' College",
    title: 'GCE Ordinary Level',
    period: 'Jan 2011 - Jun 2022',
  },
]

export function AcademicSection() {
  return (
    <section id="education" className="scroll-mt-20 px-4 pt-24 sm:px-6 md:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">Academic Journey</p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Growth through continuous learning
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              A blend of academic depth and hands-on engineering experiences, shaped by institutions
              that champion innovation and practical excellence.
            </p>
          </motion.div>

          <ol className="space-y-4 md:col-span-6 md:col-start-7">
            {education.map((entry, index) => (
              <motion.li
                key={entry.institution}
                className="card flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="tag">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-xl leading-tight text-foreground">
                    {entry.institution}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{entry.title}</p>
                  <p className="text-muted-foreground/70 mt-3 font-mono text-xs uppercase tracking-[0.2em]">
                    {entry.period}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
