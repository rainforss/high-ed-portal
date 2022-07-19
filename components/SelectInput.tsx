import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";
import {
  AcademicPeriod,
  Program,
  ProgramLevel,
} from "../types/dynamicsEntities";

interface ISelectInputProps extends ChakraProps {
  options: Array<AcademicPeriod | Program | ProgramLevel>;
  id: string;
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
}

const SelectInput: React.FunctionComponent<ISelectInputProps> = ({
  options,
  id,
  name,
  label,
  disabled,
  required,
  ...chakraProps
}) => {
  const [field, meta, _helpers] = useField(name);
  return (
    <FormControl
      isInvalid={!!(meta.error && meta.touched)}
      isRequired={required}
      {...chakraProps}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        id={id}
        name={name}
        disabled={disabled}
        onChange={field.onChange}
        value={field.value}
        placeholder=""
        borderColor="#767676"
      >
        <option value="">-- Please Select an Option --</option>
        {options.map((o) => {
          if (o.hasOwnProperty("mshied_academicperiodid")) {
            return (
              <option
                key={(o as AcademicPeriod).mshied_academicperiodid}
                value={(o as AcademicPeriod).mshied_academicperiodid}
              >
                {(o as AcademicPeriod).mshied_name}
              </option>
            );
          }
          if (o.hasOwnProperty("mshied_programlevelid")) {
            return (
              <option
                key={(o as ProgramLevel).mshied_programlevelid}
                value={(o as ProgramLevel).mshied_programlevelid}
              >
                {(o as ProgramLevel).mshied_name}
              </option>
            );
          }
          return (
            <option
              key={(o as Program).mshied_programid}
              value={(o as Program).mshied_programid}
            >
              {(o as Program).mshied_name}
            </option>
          );
        })}
      </Select>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectInput;
