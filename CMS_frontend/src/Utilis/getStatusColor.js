  export const getStatusColor = status => {
    switch (status) {
      case 'Abstract Submitted':
        return 'bg-blue-100 text-blue-800'
      case 'Paper Submitted':
        return 'bg-orange-100 text-orange-800'
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800'
      case 'Accepted':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'Minor Revision':
        return 'bg-orange-100 text-orange-800'
      case 'Major Revision':
        return 'bg-purple-100 text-purple-800'
      case 'Revision Submitted':
        return 'bg-cyan-100 text-cyan-800'
      case 'Camera Ready Copy Submitted':
        return 'bg-emerald-100 text-emerald-800'
      case 'Withdraw':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }