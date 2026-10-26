import { createFileRoute, Link } from '@tanstack/react-router'
import SiteFooter from '../features/parser/components/parser-site-footer'
import { Code2, ShieldCheck, Zap, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f5] flex flex-col justify-between">
      <main className="flex-1 max-w-[1400px] mx-auto px-4 md:px-8 py-12 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d252c] hover:text-[#df4e28] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Parser
        </Link>

        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xs border border-gray-200/80 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#df4e28]">About the Project</span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0d252c] mt-2 mb-6 tracking-tight">
              Universal Parser
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Universal Parser is built to provide developers with a fast, private, and effortless tool to transform data formats on the fly—without sending sensitive data to remote servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-100">
            <div className="p-6 rounded-2xl bg-[#eeebe4]/50 border border-gray-200/60">
              <Zap className="w-8 h-8 text-[#df4e28] mb-3" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Instant Conversion</h3>
              <p className="text-sm text-gray-600">Zero-latency client-side parsing for immediate results across key developer formats.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#eeebe4]/50 border border-gray-200/60">
              <ShieldCheck className="w-8 h-8 text-[#df4e28] mb-3" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">100% Private</h3>
              <p className="text-sm text-gray-600">All data processing happens locally inside your browser. No telemetry or server uploads.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#eeebe4]/50 border border-gray-200/60">
              <Code2 className="w-8 h-8 text-[#df4e28] mb-3" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">Extensible Engine</h3>
              <p className="text-sm text-gray-600">Modular format handlers for JSON, Base64, URIs, GraphQL, and JWT raw strings.</p>
            </div>
          </div>
        </section>
      </main>

      <div className="w-full px-4 md:px-8 pb-8">
        <SiteFooter />
      </div>
    </div>
  )
}
