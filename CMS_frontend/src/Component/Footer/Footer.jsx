import { NavLink } from 'react-router-dom'

const Footer = () => {
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Call for Papers', to: '/call-for-papers' },
    { label: 'Submissions', to: '/submissions' },
    { label: 'Registration', to: '/registration-details' }
  ]

  const conferenceLinks = [
    { label: 'Keynote Speakers', to: '/keynote-speakers' },
    { label: 'Publications', to: '/publications' },
    { label: 'Committee', to: '/committee' },
    { label: 'Archives', to: '/archives' },
    { label: 'Contact', to: '/contact' }
  ]

  return (
    <footer className="relative mt-16">
      {/* Top border in theme */}
      <div className="h-1 w-full bg-[rgb(61,43,137)]" />

      <div className="bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                     style={{ backgroundColor: 'rgb(61,43,137)' }}>
                  <span className="text-white font-bold text-sm">EGE</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'rgb(61,43,137)' }}>ELITE GLOBAL</h2>
                  <p className="text-sm font-semibold" style={{ color: '#FFD66B' }}>EXCELLENCE</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Elite Global Excellence (EGE) advances research and collaboration worldwide. 
                Join us to share ideas, publish quality work, and build lasting connections.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ color: 'rgb(61,43,137)' }}>
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className="px-2 py-1 rounded transition"
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? '#EDEAFF' : 'transparent',
                        color: isActive ? 'rgb(61,43,137)' : '#4B4B4B'
                      })}
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conference Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ color: 'rgb(61,43,137)' }}>
                Conference
              </h3>
              <ul className="mt-4 space-y-2">
                {conferenceLinks.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className="px-2 py-1 rounded transition"
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? '#EDEAFF' : 'transparent',
                        color: isActive ? 'rgb(61,43,137)' : '#4B4B4B'
                      })}
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ color: 'rgb(61,43,137)' }}>
                Stay Updated
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Get the latest announcements and deadlines straight to your inbox.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                }}
                className="mt-4"
              >
                <div className="flex items-stretch">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{
                      borderColor: 'rgb(61,43,137)',
                      focusRingColor: 'rgb(61,43,137)'
                    }}
                  />
                  <button
                    type="submit"
                    className="rounded-r-md px-4 py-2 text-sm font-semibold text-white transition"
                    style={{
                      backgroundColor: 'rgb(61,43,137)'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t" style={{ borderColor: '#E0E0E0' }}>
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Elite Global Excellence. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <NavLink to="/privacy" className="hover:underline" style={{ color: 'rgb(61,43,137)' }}>Privacy</NavLink>
              <NavLink to="/terms" className="hover:underline" style={{ color: 'rgb(61,43,137)' }}>Terms</NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
