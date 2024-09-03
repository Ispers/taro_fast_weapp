import { useEffect, useState } from 'react';
import { Button, Form } from 'antd';

const FormSubmitButton = ({ form, children, loaidng }) => {
  const [submittable, setSubmittable] = useState(false);
  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form.validateFields({
      validateOnly: true,
    })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} loading={loaidng}>
      {children}
    </Button>
  );
};

export default FormSubmitButton;