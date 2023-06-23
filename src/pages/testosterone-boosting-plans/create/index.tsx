import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTestosteroneBoostingPlan } from 'apiSdk/testosterone-boosting-plans';
import { Error } from 'components/error';
import { testosteroneBoostingPlanValidationSchema } from 'validationSchema/testosterone-boosting-plans';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ClientInterface } from 'interfaces/client';
import { getClients } from 'apiSdk/clients';
import { TestosteroneBoostingPlanInterface } from 'interfaces/testosterone-boosting-plan';

function TestosteroneBoostingPlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TestosteroneBoostingPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTestosteroneBoostingPlan(values);
      resetForm();
      router.push('/testosterone-boosting-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TestosteroneBoostingPlanInterface>({
    initialValues: {
      plan_details: '',
      progress: '',
      client_id: (router.query.client_id as string) ?? null,
    },
    validationSchema: testosteroneBoostingPlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Testosterone Boosting Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="plan_details" mb="4" isInvalid={!!formik.errors?.plan_details}>
            <FormLabel>Plan Details</FormLabel>
            <Input type="text" name="plan_details" value={formik.values?.plan_details} onChange={formik.handleChange} />
            {formik.errors.plan_details && <FormErrorMessage>{formik.errors?.plan_details}</FormErrorMessage>}
          </FormControl>
          <FormControl id="progress" mb="4" isInvalid={!!formik.errors?.progress}>
            <FormLabel>Progress</FormLabel>
            <Input type="text" name="progress" value={formik.values?.progress} onChange={formik.handleChange} />
            {formik.errors.progress && <FormErrorMessage>{formik.errors?.progress}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ClientInterface>
            formik={formik}
            name={'client_id'}
            label={'Select Client'}
            placeholder={'Select Client'}
            fetcher={getClients}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'testosterone_boosting_plan',
  operation: AccessOperationEnum.CREATE,
})(TestosteroneBoostingPlanCreatePage);
