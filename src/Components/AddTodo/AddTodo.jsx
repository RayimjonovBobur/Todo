import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addToDo } from "../../Reducers/toDoSlider";
import styles from "./AddTodo.module.css";

const Form = styled.form`
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Input = styled.input`
  outline: none;
  border: none;
  padding: 12px 5px;
  border-radius: 5px 0 0 5px;
`;

const Button = styled.button`
  outline: none;
  border: none;
  padding: 11px 5px;
  border-radius: 0 5px 5px 0;
  background-color: blue;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #00acc1;
  }
`;

const AddTodo = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    content: "",
    contentError: null,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: null,
    });
  };

  const { content, contentError } = state;

  const formik = useFormik({
    initialValues: {
      firstName: "",
    },
    onSubmit: (values) => {
      if (values === "") {
        setState({ values, contentError: "You must write something!" });
        return;
      }
      dispatch(addToDo({ newContent: values.firstName }));
      setState({ values, firstName: "" });
    },
  });
  return (
    <>
      {/* <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
      </form> */}
      <Form onSubmit={formik.handleSubmit}>
        <Title>What's your plan for today</Title>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          className={styles.input}
          placeholder="Add your plan"
        />
        <Button type="submit" className="button">
          Add
        </Button>
        {contentError ? <div className="error">{contentError}</div> : null}
      </Form>
    </> 
  );
};

export default AddTodo;
