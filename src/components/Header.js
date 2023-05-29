import React from "react"
import { PropTypes } from "prop-types"
import { Button } from "./Button"
import { Tasks } from "./Tasks"
import { useLocation } from "react-router-dom"
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className="header">
      <h1>{title}</h1>
      (
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
      )
    </header>
  )
}

Header.defaultProps = {
  title: "Task Tracker",
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}
