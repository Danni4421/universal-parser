export default function SiteFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#f9f8f5] border-t border-gray-200 px-8 py-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-bold text-gray-900">Universal Parser</span>
        <span>© 2024. Built for clarity.</span>
      </div>
      <nav className="flex items-center gap-6 text-sm text-gray-400">
        <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
        <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
        <a href="#" className="hover:text-gray-700 transition-colors">API</a>
        <a href="#" className="hover:text-gray-700 transition-colors">Support</a>
      </nav>
    </footer>
  )
}
