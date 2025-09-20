// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white text-center px-6">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-extrabold text-blue-600"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800"
      >
        Oops! Page not found
      </motion.p>

      <p className="mt-2 text-gray-600">
        The page you’re looking for might have been moved or doesn’t exist.
      </p>

      {/* <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all"
        >
          Back to Home
        </Link>
      </motion.div> */}

      {/* Fun interactive animation */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-10"
      >
        <img
          src="/assets/EGE_logo.png" // replace with your logo
          alt="Conference"
          className="w-96 h-32 mx-auto"
        />
      </motion.div>
    </div>
  )
}

export default NotFound
