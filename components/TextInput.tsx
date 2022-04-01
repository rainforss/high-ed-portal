import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FormikProps, useField } from "formik";
import * as React from "react";

interface ITextInputProps extends ChakraProps {
  type: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
}

const TextInput: React.FunctionComponent<ITextInputProps> = ({
  type,
  label,
  name,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);

  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...field}
        name={name}
        type={type}
        bg="#fafafa"
        boxShadow="inset 0px 1px 3px 0px rgb(0 0 0 / 8%)"
      />
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextInput;
