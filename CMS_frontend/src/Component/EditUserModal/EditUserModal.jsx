const EditUserModal = ({ 
  isOpen, 
  onClose, 
  form, 
  errors, 
  onChange, 
  onSubmit, 
  selectedRole 
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg max-w-md w-full p-6 shadow-lg'>
        <h2 className='text-xl font-semibold mb-4'>Edit {selectedRole}</h2>
        <form onSubmit={onSubmit} className='space-y-4'>

          {/* Title */}
          <div>
            <label className='block mb-1 font-medium'>Title</label>
            <input
              name='title'
              value={form.title}
              onChange={onChange}
              type='text'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>

          {/* Position */}
          <div>
            <label className='block mb-1 font-medium'>Current Position</label>
            <input
              name='position'
              value={form.position}
              onChange={onChange}
              type='text'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>

          {/* Affiliation */}
          <div>
            <label className='block mb-1 font-medium'>Affiliation</label>
            <input
              name='affiliation'
              value={form.affiliation}
              onChange={onChange}
              type='text'
              className={`w-full px-3 py-2 border ${
                errors.affiliation ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.affiliation && (
              <p className='text-red-600 text-sm mt-1'>{errors.affiliation}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className='block mb-1 font-medium'>Contact</label>
            <input
              name='contact'
              value={form.contact}
              onChange={onChange}
              type='text'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>

          {/* ORCID */}
          <div>
            <label className='block mb-1 font-medium'>ORCID / LinkedIn</label>
            <input
              name='orcid'
              value={form.orcid}
              onChange={onChange}
              type='url'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
          </div>

          {/* Buttons */}
          <div className='flex justify-end space-x-4 pt-4 border-t border-gray-200'>
            <button type='button' onClick={onClose} className='px-4 py-2 border rounded'>Cancel</button>
            <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
