import { Link } from '@tanstack/react-router'
import { Github, Twitter, Globe, FileText } from 'lucide-react'
import { cn } from 'cn'

export default function SiteFooter() {
  return (
    <footer className={cn('w-full relative bg-[#eeebe4] text-[#0d252c] rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 lg:p-16 transition-all shadow-sm my-8 max-w-[1400px] mx-auto')}>
      <div className='w-24 h-2 bg-neutral-400 rounded-lg absolute top-5 left-1/2 -translate-x-1/2' />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
        {/* Left Column: Brand & Socials */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-900 font-bold text-base sm:text-lg md:text-xl mb-4 max-w-md leading-snug">
              Universal Parser
            </h3>
            <p className="text-sm text-gray-600 max-w-md mb-8 leading-relaxed font-medium">
              Fast, secure, client-side data parsing and format conversion for JSON, Base64, URIs, GraphQL, and raw strings.
            </p>
          </div>

          {/* Social / Developer Links */}
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://github.com/danni4421/universal-parser"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:border-gray-600 transition-colors bg-transparent"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:border-gray-600 transition-colors bg-transparent"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <Link
              to="/resources/docs"
              aria-label="Documentation"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:border-gray-600 transition-colors bg-transparent"
            >
              <FileText className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              aria-label="About"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:border-gray-600 transition-colors bg-transparent"
            >
              <Globe className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Columns: Navigation Links */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
          {/* Column 1: Developer Resources */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm md:text-base mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li><Link to="/resources/docs" className="hover:text-gray-900 transition-colors">Documentation</Link></li>
              <li><Link to="/resources/release-notes" className="text-[#df4e28] hover:text-[#b83c1b] transition-colors font-medium">Release Notes</Link></li>
            </ul>
          </div>

          {/* Column 2: Project & Legal */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm md:text-base mb-4">Project</h4>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li><Link to="/about" className="hover:text-gray-900 transition-colors">About Universal Parser</Link></li>
              <li><a href="https://github.com/danni4421/universal-parser" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">GitHub Repo</a></li>
              <li><Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Brand Logo */}
      <div className="pt-4 border-t border-gray-300/40 flex items-center justify-between overflow-hidden select-none">
        <div className="w-full flex items-baseline justify-between">
          <Link to="/" className="text-[#df4e28] font-black text-[12vw] sm:text-[13vw] lg:text-[140px] xl:text-[170px] leading-none tracking-tight hover:opacity-95 transition-opacity">
            Parser.
          </Link>
          <span className="inline-flex items-center justify-center border-2 sm:border-3 lg:border-4 border-[#df4e28] rounded-full w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16 text-[10px] sm:text-base lg:text-2xl font-bold text-[#df4e28] shrink-0 mb-2 sm:mb-6 lg:mb-10">
            R
          </span>
        </div>
      </div>
    </footer>
  )
}
