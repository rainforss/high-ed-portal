import {
  ChakraProps,
  FormControl,
  FormLabel,
  Switch,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface IToggleInputProps extends ChakraProps {
  id: string;
  name: string;
  label: string;
  disabled?: boolean;
}

const ToggleInput: React.FunctionComponent<IToggleInputProps> = ({
  id,
  name,
  label,
  disabled,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      <FormLabel htmlFor={id} mb="0" display="inline">
        {label}
      </FormLabel>

      <Switch
        id={id}
        name={name}
        value={field.value}
        isChecked={field.value}
        disabled={disabled}
        onChange={(e) => {
          _helpers.setValue(e.target.value === "true" ? false : true);
        }}
      />
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default ToggleInput;
