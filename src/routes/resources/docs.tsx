import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import SiteFooter from '../../features/parser/components/parser-site-footer'
import {
  Search,
  BookOpen,
  Code2,
  ShieldCheck,
  Zap,
  Check,
  Copy,
  ArrowLeft,
  ChevronRight,
  Terminal,
  FileJson,
  Binary,
  Globe,
  Braces,
  Key,
  Info,
  AlertTriangle,
  Sparkles
} from 'lucide-react'

export const Route = createFileRoute('/resources/docs')({
  component: DocsPage,
})

interface DocSection {
  id: string
  title: string
  category: string
  icon: React.ElementType
  content: React.ReactNode
}

export function DocsPage() {
  const [activeSection, setActiveSection] = useState('installation')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const sections: DocSection[] = [
    {
      id: 'installation',
      title: 'Installation & Setup',
      category: 'Prologue',
      icon: Terminal,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">Installation &amp; Setup</h2>
            <p className="text-gray-600 leading-relaxed">
              Universal Parser is designed to run entirely client-side in any modern web browser or serve as a standalone SPA utility.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-900 text-sm">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Zero Backend Required:</span> Universal Parser performs 100% of data parsing locally in your browser memory without invoking external APIs.
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-lg">Quick Start via Package Manager</h3>
            <p className="text-sm text-gray-600">Clone the repository and run the local development server:</p>
            <div className="relative bg-[#0d252c] text-gray-100 rounded-2xl p-4 font-mono text-sm overflow-x-auto border border-gray-800">
              <button
                onClick={() => handleCopy('git clone https://github.com/danni4421/universal-parser.git\ncd universal-parser\nbun install\nbun dev', 'install-code')}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                title="Copy code"
              >
                {copiedId === 'install-code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="text-emerald-400"># Clone &amp; Install Dependencies</pre>
              <code>git clone https://github.com/danni4421/universal-parser.git</code>{'\n'}
              <code>cd universal-parser</code>{'\n'}
              <code>bun install</code>{'\n\n'}
              <pre className="text-emerald-400"># Launch Local Server</pre>
              <code>bun dev</code>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Architecture & Privacy',
      category: 'Prologue',
      icon: ShieldCheck,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">Architecture &amp; Security Model</h2>
            <p className="text-gray-600 leading-relaxed">
              Understanding how Universal Parser isolates sensitive tokens, JSON payloads, and keys inside browser-memory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
              <Zap className="w-6 h-6 text-[#df4e28] mb-2" />
              <h4 className="font-bold text-gray-900 text-base mb-1">Local Processing Pool</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Format parsers operate inside synchronous execution blocks to deliver zero-latency transformations.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-[#df4e28] mb-2" />
              <h4 className="font-bold text-gray-900 text-base mb-1">Isolated State</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Zustand store manages recent transformation history locally without persisting to remote analytics servers.</p>
            </div>
          </div>

          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 flex gap-3 text-rose-900 text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Security Note:</span> Always ensure your local environment is protected when inspecting live production JWTs or API keys.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'json-parser',
      title: 'JSON Parser',
      category: 'Supported Formats',
      icon: FileJson,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">JSON Format Handler</h2>
            <p className="text-gray-600 leading-relaxed">
              Parse raw JSON text strings into formatted structure trees, decode escaped JSON payloads, or stringify objects.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-lg">Format Methods</h3>
            <div className="relative bg-[#0d252c] text-gray-100 rounded-2xl p-4 font-mono text-sm overflow-x-auto border border-gray-800">
              <button
                onClick={() => handleCopy('import { stringToJson, jsonToString } from "@/features/parser/lib/json"\n\nconst obj = stringToJson(\'{"user": "Artisan"}\')\nconst formatted = jsonToString(obj)', 'json-code')}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
              >
                {copiedId === 'json-code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="text-emerald-400">// Import JSON helper modules</pre>
              <code>import &#123; stringToJson, jsonToString &#125; from &apos;@/features/parser/lib/json&apos;</code>{'\n\n'}
              <pre className="text-emerald-400">// Parse raw string into object</pre>
              <code>const obj = stringToJson(&apos;&#123;&quot;user&quot;: &quot;Artisan&quot;&#125;&apos;)</code>{'\n'}
              <code>const formatted = jsonToString(obj)</code>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'base64-parser',
      title: 'Base64 Encoder / Decoder',
      category: 'Supported Formats',
      icon: Binary,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">Base64 Converter</h2>
            <p className="text-gray-600 leading-relaxed">
              Safely encode UTF-8 text strings into Base64 formats and decode encoded tokens back into human-readable data.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-lg">Example Code</h3>
            <div className="relative bg-[#0d252c] text-gray-100 rounded-2xl p-4 font-mono text-sm overflow-x-auto border border-gray-800">
              <button
                onClick={() => handleCopy('import { toBase64 } from "@/features/parser/lib/base64/to-base-64"\nimport { fromBase64 } from "@/features/parser/lib/base64/from-base-64"\n\nconst encoded = toBase64("Hello World")\nconst decoded = fromBase64(encoded)', 'base64-code')}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
              >
                {copiedId === 'base64-code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="text-emerald-400">// Encode string to Base64</pre>
              <code>const encoded = toBase64(&quot;Hello World&quot;) // &quot;SGVsbG8gV29ybGQ=&quot;</code>{'\n\n'}
              <pre className="text-emerald-400">// Decode Base64 string back</pre>
              <code>const decoded = fromBase64(encoded) // &quot;Hello World&quot;</code>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'uri-parser',
      title: 'URI & Query Params',
      category: 'Supported Formats',
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">URI &amp; URL Query String Parser</h2>
            <p className="text-gray-600 leading-relaxed">
              Parse URL parameters into key-value JSON objects and encode percent-encoded query parameters.
            </p>
          </div>

          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 flex gap-3 text-sky-900 text-sm">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Tip:</span> Universal Parser handles array parameters like <code>?tags=a&amp;tags=b</code> seamlessly.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'graphql-parser',
      title: 'GraphQL Query AST',
      category: 'Supported Formats',
      icon: Braces,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">GraphQL AST Parser</h2>
            <p className="text-gray-600 leading-relaxed">
              Convert raw GraphQL query definitions into Abstract Syntax Tree (AST) structures using official GraphQL lexers.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'jwt-parser',
      title: 'JWT & Raw Strings',
      category: 'Supported Formats',
      icon: Key,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">JWT &amp; Raw Strings</h2>
            <p className="text-gray-600 leading-relaxed">
              Decode JSON Web Token headers, payload claims, and signature metadata without sending keys over network connections.
            </p>
          </div>
        </div>
      )
    }
  ]

  const categories = Array.from(new Set(sections.map(s => s.category)))

  const filteredSections = sections.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeDoc = sections.find(s => s.id === activeSection) || sections[0]

  return (
    <div className="min-h-screen bg-[#f9f8f5] flex flex-col justify-between">
      {/* Top Banner Header */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-gray-900 hover:text-[#df4e28] transition-colors">
              <Code2 className="w-5 h-5 text-[#df4e28]" />
              <span>Universal Parser</span>
            </Link>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#df4e28]/10 text-[#df4e28] border border-[#df4e28]/20">
              v1.2.0 Docs
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to App</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto px-4 md:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Navigation (Laravel Style) */}
          <aside className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs sticky top-24">
            {/* Search Input */}
            <div className="relative mb-5">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs (e.g. JSON)..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df4e28]/20 focus:border-[#df4e28]"
              />
            </div>

            {/* Category Groups */}
            <div className="space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {categories.map((cat) => {
                const catSections = filteredSections.filter(s => s.category === cat)
                if (catSections.length === 0) return null

                return (
                  <div key={cat}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">
                      {cat}
                    </h3>
                    <ul className="space-y-1">
                      {catSections.map((sec) => {
                        const Icon = sec.icon
                        const isActive = sec.id === activeSection

                        return (
                          <li key={sec.id}>
                            <button
                              onClick={() => setActiveSection(sec.id)}
                              className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-[#df4e28] text-white shadow-xs'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                <span>{sec.title}</span>
                              </div>
                              <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white opacity-80' : 'text-gray-300'}`} />
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </aside>

          {/* Main Article Content Panel */}
          <article className="lg:col-span-6 bg-white rounded-2xl p-6 md:p-10 border border-gray-200/80 shadow-2xs min-h-[600px]">
            {activeDoc.content}
          </article>

          {/* Right On-This-Page Summary */}
          <aside className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs sticky top-24">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#df4e28]" />
              <span>On This Page</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600 border-l border-gray-200 pl-3">
              <li>
                <a href="#overview" className="hover:text-[#df4e28] transition-colors block py-0.5">Overview</a>
              </li>
              <li>
                <a href="#code-examples" className="hover:text-[#df4e28] transition-colors block py-0.5">Code Examples</a>
              </li>
              <li>
                <a href="#security" className="hover:text-[#df4e28] transition-colors block py-0.5">Security Guidelines</a>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <span className="text-[11px] font-semibold text-gray-400 block mb-2">Need help?</span>
              <a
                href="https://github.com/danni4421/universal-parser"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#df4e28] hover:underline"
              >
                Edit this page on GitHub →
              </a>
            </div>
          </aside>

        </div>
      </main>

      <div className="w-full px-4 md:px-8 pb-8">
        <SiteFooter />
      </div>
    </div>
  )
}
