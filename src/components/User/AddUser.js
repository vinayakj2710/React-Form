import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from '../UI/ErrorModal';
import classes from "./AddUser.module.css";

function AddUser(props) {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();

  const addUserName = (event) => {
    setUserName(event.target.value);
  };

  const addAge = (event) => {
    setAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if(userName.trim().length === 0 || age.trim().length === 0){
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid username and age (non-empty values)'
      })
      return;
    }
    if(+age <= 0){
      setError({
        title: 'Invalid age',
        message: 'Please enter valid age (age > 0)'
      })
      return;
    }
    props.onAddUser(userName, age);

    setUserName("");
    setAge("");
  };

  const CloseError = () => {
    setError(null);
  }

  return (
    <>
    {error && 
      <ErrorModal 
        title={error.title} 
        message={error.message}
        onConfirm={CloseError}
        />
    }
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={userName}
          onChange={addUserName}
        />

        <label htmlFor="age">Age (Years)</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={addAge}
        />

        <Button type="submit">Add user</Button>
      </form>
    </Card>
    </>
  );
}

export default AddUser;
