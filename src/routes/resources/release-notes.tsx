import { createFileRoute, Link } from '@tanstack/react-router'
import SiteFooter from '../../features/parser/components/parser-site-footer'
import { Sparkles, Tag, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/resources/release-notes')({
  component: ReleaseNotesPage,
})

function ReleaseNotesPage() {
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#df4e28]">Changelog</span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0d252c] mt-2 mb-6 tracking-tight">
              Release Notes
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Stay up to date with new features, performance improvements, and added format conversions in Universal Parser.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl pt-6 border-t border-gray-100">
            <div className="p-6 rounded-2xl bg-[#eeebe4]/50 border border-gray-200/60">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#df4e28]/10 text-[#df4e28]">
                  <Tag className="w-3.5 h-3.5" /> v1.2.0 (Latest)
                </span>
                <span className="text-xs text-gray-500 font-medium">September 2026</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Modern Footer &amp; Expanded Route Pages</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Redesigned footer layout, added dedicated format and developer resource pages, and upgraded TanStack Router page routing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#eeebe4]/50 border border-gray-200/60">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-700">
                  <Sparkles className="w-3.5 h-3.5" /> v1.0.0
                </span>
                <span className="text-xs text-gray-500 font-medium">August 2026</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Initial Launch</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Core support for JSON, Base64, URI, GraphQL, and raw string conversions with Zustand history tracking.
              </p>
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
