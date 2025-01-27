import { useRef, useState } from "react";
import { checkEmail, checkPassword } from "./validators";

export function RefForm({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsAfterFirstSubmit(true);

    const emailResults = checkEmail(emailRef.current.value);
    const passwordResults = checkPassword(passwordRef.current.value);

    setEmailErrors(emailResults);
    setPasswordErrors(passwordResults);

    if (emailResults.length === 0 && passwordResults.length === 0) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className={`form-group ${emailErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          onChange={
            isAfterFirstSubmit
              ? (e) => setEmailErrors(checkEmail(e.target.value))
              : undefined
          }
          className="input"
          type="email"
          id="email"
          ref={emailRef}
        />
        {emailErrors.length > 0 && (
          <div className="msg" data-testid="email-errors">
            {emailErrors.join(", ")}
          </div>
        )}
      </div>
      <div className={`form-group ${passwordErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          ref={passwordRef}
          onChange={
            isAfterFirstSubmit
              ? (e) => setPasswordErrors(checkPassword(e.target.value))
              : undefined
          }
        />
        {passwordErrors.length > 0 && (
          <div className="msg" data-testid="password-errors">
            {passwordErrors.join(", ")}
          </div>
        )}
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}
