import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import { contactRoute, navRoutes } from '../constants/routes'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Link to="/" className="font-mono text-base font-semibold tracking-tight hover:text-foreground">
            Dewmith<span className="text-indigo-accent">.dev</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Software engineer building reliable backends and thoughtful products.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[...navRoutes, contactRoute].map((route) => (
            <Link key={route.path} to={route.path} className="text-muted-foreground">
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {[
            { href: 'https://github.com/dewmithmihisara', label: 'GitHub', Icon: Github },
            { href: 'https://www.linkedin.com/in/dewmith-mihisara', label: 'LinkedIn', Icon: Linkedin },
            { href: 'mailto:mihisaralokuhewage@gmail.com', label: 'Email', Icon: Mail },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-indigo-line"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl px-4 pb-8 font-mono text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Dewmith Mihisara
      </div>
    </footer>
  )
}
