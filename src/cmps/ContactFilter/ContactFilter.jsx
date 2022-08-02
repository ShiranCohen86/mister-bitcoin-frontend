
export const ContactFilter = (props) => {
  const handleChange = ({ target }) => {
    props.onChangeFilter(target.value);
  };

  return (
    <form className="contact-filter" onSubmit={(ev) => ev.preventDefault()}>
      <label htmlFor="term">Search contact</label>
      <input
        type="text"
        id="term"
        name="term"
        onChange={handleChange}
        placeholder="Search..."
      />
    </form>
  );
};
