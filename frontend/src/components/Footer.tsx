export function Footer() {
  return (
    <footer className="border-t border-blue-900/40 mt-12 py-6 px-8 backdrop-blur-md bg-blue-950/20">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400/60">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌍</span>
          <span>
            EONET Watch built on{' '}
            
              <a href="https://eonet.gsfc.nasa.gov"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              NASA EONET API
            </a>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Data may be delayed. Not for emergency use.</span>
          <span>© {new Date().getFullYear()} EONET Watch</span>
        </div>
      </div>
    </footer>
  )
}
