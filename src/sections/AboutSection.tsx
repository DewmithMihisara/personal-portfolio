import { motion } from 'framer-motion'
import { Code2, Cpu, Layers, Rocket } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Backend Engineering',
    description:
      'Designing resilient services with Java, Spring Boot, and event-driven patterns that scale gracefully.',
  },
  {
    icon: Layers,
    title: 'Solution Architecture',
    description:
      'Translating complex domain logic into modular, cloud-ready architectures that remain easy to evolve.',
  },
  {
    icon: Cpu,
    title: 'Cloud & Automation',
    description:
      'Automating CI/CD workflows and infrastructure to deliver features faster without sacrificing reliability.',
  },
  {
    icon: Rocket,
    title: 'Team Collaboration',
    description:
      'Mentoring teams, facilitating agile rituals, and aligning technical delivery with business outcomes.',
  },
]

const stats = [
  { label: 'Years coding', value: '3' },
  { label: 'Production projects', value: '10+' },
  { label: 'Cloud platforms', value: 'AWS, GCP' },
  { label: 'Favorite stack', value: 'Java · Spring Boot · React' },
]

export function AboutSection() {
  return (
    <section className="flex h-full flex-col justify-center overflow-y-auto bg-background px-6 pb-24 pt-28 md:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">About Me</p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl">
              Building reliable experiences, one sprint at a time
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6 md:col-span-7 md:col-start-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg leading-relaxed text-foreground">
              I’m Dewmith Mihisara, a software engineer who bridges robust backend engineering with
              collaborative product delivery. My focus lies in crafting performant APIs, optimizing
              service reliability, and deploying solutions that scale confidently in the cloud.
            </p>

            <ul className="grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <li key={stat.label} className="card !p-4">
                  <span className="eyebrow">{stat.label}</span>
                  <span className="mt-2 block text-xl font-semibold text-foreground">{stat.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <span className="tag">{String(index + 1).padStart(2, '0')}</span>
              <div className="mt-3 flex items-center gap-2">
                <item.icon className="size-4 text-muted-foreground" />
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
