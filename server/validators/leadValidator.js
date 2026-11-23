const allowedFields = [
  'name',
  'email',
  'phone',
  'company',
  'source',
  'status',
];

const validStatuses = ['New', 'Contacted', 'Qualified', 'Lost'];

const validateLead = (req, res, next) => {
  // Check request body
  if (
    !req.body ||
    typeof req.body !== 'object' ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request body',
    });
  }

  const { name, email, phone, company, source, status } = req.body;

  // Check required fields
  const requiredFields = {
    name,
    email,
    phone,
    company,
    source,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([, value]) => typeof value !== 'string' || !value.trim())
    .map(([field]) => field);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields',
      errors: missingFields.map((field) => ({
        field,
        message: `${field} is required`,
      })),
    });
  }

  // Reject unexpected fields
  const unknownFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (unknownFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Unexpected fields: ${unknownFields.join(', ')}`,
    });
  }

  // Validate status
  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid lead status',
    });
  }

  next();
};

module.exports = { validateLead };