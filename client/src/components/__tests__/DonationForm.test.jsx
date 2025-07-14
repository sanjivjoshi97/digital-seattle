import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DonationForm from '../DonationForm.jsx';

// Mock the MUI DatePicker component to avoid dealing with its internal logic.
// This lets us test the form without requiring full date picker functionality.
jest.mock('@mui/x-date-pickers', () => {
  // A more realistic mock that handles labels and values correctly
  const MockDatePicker = (props) => {
    // We need to extract the label from where it's actually passed.
    // In this case, it's inside slotProps.textField.label
    const label = props.label || (props.slotProps?.textField?.label);
    
    // This function simulates the onChange handler of the real component
    const handleChange = (event) => {
        // The real DatePicker's onChange returns a Dayjs object, not just the event.
        // We'll simulate this by just passing the value, which is enough for our form test.
        props.onChange(event.target.value);
    };

    return (
      // We need a <label> and an <input> with matching id/htmlFor for getByLabelText to work
      <>
        <label htmlFor="date-picker">{label}</label>
        <input
          id="date-picker"
          type="date"
          value={props.value ? props.value.format('YYYY-MM-DD') : ''}
          onChange={handleChange}
        />
      </>
    );
  };

  return {
    DatePicker: MockDatePicker,
    LocalizationProvider: ({ children }) => <>{children}</>,
    AdapterDayjs: jest.fn(),
  };
});

describe('DonationForm', () => {
    /**
     * Test 1: Basic rendering
     * Ensures that all fields and the submit button appear in the form.
     */
    it('renders all form fields and a submit button', () => {
        render(<DonationForm onSubmit={() => {}} />);

        expect(screen.getByLabelText(/donor's name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/donation type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/quantity or amount/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/donation date/i, { selector: 'input' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add donation/i })).toBeInTheDocument();
    });

    /**
     * Test 2: Submitting the form
     * Simulates user input and checks that the `onSubmit` handler is called with correct data.
     */
    it('allows a user to fill out and submit the form', async () => {
        const user = userEvent.setup();
        const handleSubmit = jest.fn(); // Mock submit handler

        render(<DonationForm onSubmit={handleSubmit} />);

        await user.type(screen.getByLabelText(/donor's name/i), 'New Donor');
        await user.type(screen.getByLabelText(/quantity or amount/i), '123.45');
        await user.click(screen.getByRole('button', { name: /add donation/i }));

        expect(handleSubmit).toHaveBeenCalledTimes(1);

        // Only checking for key fields — not date, since the mocked picker returns a string
        expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
            donor_name: 'New Donor',
            donation_type: 'Money',  // Default selection
            quantity: '123.45'
        }));
    });

    /**
     * Test 3: Validation feedback
     * Simulates submitting the form without filling required fields.
     * Assumes form uses client-side validation and renders error messages.
     */
    it('shows validation errors for empty required fields on submit', async () => {
        const user = userEvent.setup();
        render(<DonationForm onSubmit={() => {}} />);

        await user.click(screen.getByRole('button', { name: /add donation/i }));

        // These would appear if you have validation logic built into the component
        expect(await screen.findByText("Donor's name is required.")).toBeInTheDocument();
        expect(await screen.findByText("Quantity or amount must be a positive number.")).toBeInTheDocument();
    });
});
