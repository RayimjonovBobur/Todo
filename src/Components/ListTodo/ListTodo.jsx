import React, { useState } from "react";
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteToDo, editTodo } from "../../Reducers/toDoSlider";

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
  background-color: #157347;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #00acc1;
  }
`;

const ListTodo = () => {
  const { todoList } = useSelector((state) => state.toDo);
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [state, setState] = useState({
    id: "",
    content: "",
    contentError: null,
  });

  const onEditToggle = (id, content) => {
    setEditing(true);
    setState({
      ...state,
      id,
      content,
    });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: null,
    });
  };

  const { content, contentError, id } = state;

  const edit = () => {
    if (content === "") {
      setState({ ...state, contentError: "You must write something!" });
      return;
    }
    dispatch(editTodo({ content, id }));
    setEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="form">
          <h2>Update your plan for today</h2>
          <Input
            type="text"
            value={content}
            name="content"
            onChange={handleChange}
            placeholder="Edit your plan"
          />
          <Button type="button" className="button" onClick={edit}>
            Edit
          </Button>
          {contentError ? <div className="error">{contentError}</div> : null}
        </div>
      ) : (
        <ul className="todos">
          {todoList.map(({ id, content }) => {
            return (
              <li className="grid" key={id}>
                <span className="content">{content}</span>
                <span className="todo-action">
                  <AiOutlineCloseCircle
                    className="close"
                    onClick={() => dispatch(deleteToDo({ id }))}
                  />
                  <AiFillEdit
                    className="edit"
                    onClick={() => onEditToggle(id, content)}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListTodo;
