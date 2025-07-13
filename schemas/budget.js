const { z } = require('zod');

const budgetSchema = z.object({
  name: z.string().min(1, 'Name is mandatory'),
  startingDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    }
  ).optional(),
  endDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    }
  ),
  initialAmount: z.number()
});

module.exports = budgetSchema;
